import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';
import { BaseValueAccessor } from '../base-value-accessor';

/**
 * Componente de Calendar do Creamy Kit.
 *
 * Exibe um mês com navegação, seleção de dia e um rodapé informativo opcional.
 * Implementa `ControlValueAccessor` (valor = `Date`).
 *
 * Rodapé (`footerValue`):
 * - vazio (`''`) → rodapé oculto;
 * - `'auto'` → mostra a data selecionada formatada;
 * - qualquer outro texto → mostra o texto recebido.
 *
 * ```html
 * <creamy-kit-calendar
 *   footerLabel="Data selecionada"
 *   footerValue="auto"
 *   [(ngModel)]="data"
 * />
 * ```
 */
@Component({
  selector: 'creamy-kit-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-bare]': "bare() ? '' : null",
    '[attr.data-disabled]': "isDisabled() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
})
export class CalendarComponent extends BaseValueAccessor<Date | null> {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  /** Título (negrito) do rodapé. Vazio = sem título. */
  readonly footerLabel = input<string>('');

  /**
   * Valor do rodapé:
   * - `''` → rodapé oculto;
   * - `'auto'` → data selecionada formatada;
   * - outro texto → texto recebido.
   */
  readonly footerValue = input<string>('');

  /**
   * Modo "liso": remove a borda e o raio próprios do calendário, para embuti-lo
   * em outro contêiner (ex.: DatePicker).
   * @default false
   */
  readonly bare = input(false, { transform: booleanAttribute });

  /** Desabilita o calendário (sem navegação nem seleção). @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Locale BCP 47 usado para formatar nomes de meses e datas.
   * @default 'pt-BR'
   */
  readonly locale = input<string>('pt-BR');

  /** Emitido ao selecionar um dia. */
  readonly dateChange = output<Date>();

  /** Cabeçalhos dos dias da semana (Dom → Sáb). */
  protected readonly weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  /** Data selecionada. */
  protected readonly selected = signal<Date | null>(null);

  /** Primeiro dia do mês exibido. */
  protected readonly view = signal<Date>(startOfMonth(new Date()));

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  /** Rótulo do mês exibido, ex.: "Fevereiro de 2026". */
  protected readonly monthLabel = computed(() => {
    const d = this.view();
    const m = monthName(d, this.locale());
    return `${m.charAt(0).toUpperCase()}${m.slice(1)} de ${d.getFullYear()}`;
  });

  /** Células do grid: nulos de preenchimento + números dos dias. */
  protected readonly cells = computed<(number | null)[]>(() => {
    const d = this.view();
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) {
      arr.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      arr.push(day);
    }
    return arr;
  });

  /** Rodapé deve ser exibido? */
  protected readonly footerVisible = computed(
    () => !!this.footerLabel() || !!this.footerValue()
  );

  /** Texto do valor do rodapé. */
  protected readonly footerDisplay = computed(() => {
    const v = this.footerValue();
    if (v === 'auto') {
      const s = this.selected();
      return s ? formatFull(s, this.locale()) : '';
    }
    return v;
  });

  protected isSelected(day: number): boolean {
    const s = this.selected();
    if (!s) {
      return false;
    }
    const v = this.view();
    return (
      s.getFullYear() === v.getFullYear() &&
      s.getMonth() === v.getMonth() &&
      s.getDate() === day
    );
  }

  protected prevMonth(): void {
    if (this.isDisabled()) return;
    const d = this.view();
    this.view.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  protected nextMonth(): void {
    if (this.isDisabled()) return;
    const d = this.view();
    this.view.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  protected selectDay(day: number): void {
    if (this.isDisabled()) return;
    const v = this.view();
    const date = new Date(v.getFullYear(), v.getMonth(), day);
    this.selected.set(date);
    this.onChange(date);
    this.onTouched();
    this.dateChange.emit(date);
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: Date | string | null): void {
    if (!value) {
      this.selected.set(null);
      return;
    }
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) {
      return;
    }
    this.selected.set(d);
    this.view.set(startOfMonth(d));
  }
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function monthName(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
}

function formatFull(date: Date, locale: string): string {
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} de ${monthName(date, locale)} de ${date.getFullYear()}`;
}
