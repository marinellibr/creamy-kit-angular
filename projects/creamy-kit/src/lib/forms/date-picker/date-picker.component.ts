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
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ButtonComponent } from '../../actions/button/button.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ThemeService } from '../../core/theme.service';

/**
 * Componente de DatePicker do Creamy Kit.
 *
 * Diálogo de seleção de data que **consome o `kit-calendar`**, com cabeçalho
 * (título + descrição + fechar), texto informativo (rodapé do calendário) e
 * ações Confirmar/Cancelar (via `kit-button`).
 *
 * Implementa `ControlValueAccessor` (valor = `Date`). A data fica "pendente"
 * enquanto o usuário navega e é confirmada em `(confirm)`.
 *
 * ```html
 * <creamy-kit-date-picker
 *   title="Selecione a data"
 *   description="Description"
 *   infoText="Texto informativo sobre a escolha da data"
 *   [(ngModel)]="data"
 *   (confirm)="salvar($event)"
 *   (cancel)="fechar()"
 *   (closed)="fechar()" />
 * ```
 */
@Component({
  selector: 'creamy-kit-date-picker',
  standalone: true,
  imports: [FormsModule, CalendarComponent, ButtonComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-disabled]': "isDisabled() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  constructor(private readonly themeService: ThemeService) {}

  /** Título do cabeçalho. */
  readonly title = input<string>('Selecione a data');

  /** Descrição (subtítulo) do cabeçalho. */
  readonly description = input<string>('');

  /** Texto informativo exibido no rodapé do calendário. */
  readonly infoText = input<string>('');

  /** Rótulo do botão de confirmação. */
  readonly confirmLabel = input<string>('Confirmar');

  /** Rótulo do botão de cancelamento. */
  readonly cancelLabel = input<string>('Cancelar');

  /** Desabilita o seletor (calendário e ações). @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Data selecionada (pendente até confirmar). */
  protected readonly selected = signal<Date | null>(null);

  /** Disabled vindo do formulário reativo (`setDisabledState`). */
  private readonly disabledByForm = signal(false);

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  /** Emitido ao confirmar, com a data escolhida. */
  readonly confirm = output<Date | null>();

  /** Emitido ao cancelar. */
  readonly cancel = output<void>();

  /** Emitido ao fechar pelo X. */
  readonly closed = output<void>();

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  protected onCalendarChange(date: Date | null): void {
    this.selected.set(date);
  }

  protected onConfirm(): void {
    if (this.isDisabled()) return;
    const value = this.selected();
    this.onChange(value);
    this.onTouched();
    this.confirm.emit(value);
  }

  protected onCancel(): void {
    this.cancel.emit();
  }

  protected onClose(): void {
    this.closed.emit();
  }

  // ControlValueAccessor -----------------------------------------------------

  writeValue(value: Date | string | null): void {
    if (!value) {
      this.selected.set(null);
      return;
    }
    const d = value instanceof Date ? value : new Date(value);
    this.selected.set(isNaN(d.getTime()) ? null : d);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
