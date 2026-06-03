import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';
import { DropdownOption } from '../dropdown/dropdown.component';

/**
 * Variações de estilo do MultiDropdown.
 *
 * Por enquanto apenas `default`.
 */
export type MultiDropdownVariant = 'default';

/**
 * Componente de Dropdown de múltipla escolha do Creamy Kit.
 *
 * Igual ao Dropdown, porém cada opção tem um quadrado à esquerda
 * (Action/neutral/base, virando Action/primary/base quando selecionado) e
 * permite selecionar vários valores. O valor é um array de strings.
 * Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-multidropdown
 *   title="Tags"
 *   placeholder="Selecione"
 *   [options]="opcoes"
 *   [(ngModel)]="tags"
 * />
 * ```
 */
@Component({
  selector: 'creamy-kit-multidropdown',
  standalone: true,
  imports: [],
  templateUrl: './multidropdown.component.html',
  styleUrl: './multidropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiDropdownComponent),
      multi: true,
    },
  ],
})
export class MultiDropdownComponent implements ControlValueAccessor {
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor(private readonly themeService: ThemeService) {}

  /**
   * Variação de estilo.
   * @default 'default'
   */
  readonly variant = input<MultiDropdownVariant>('default');

  /**
   * Opções disponíveis.
   */
  readonly options = input<DropdownOption[]>([]);

  /**
   * Placeholder exibido quando nada está selecionado.
   */
  readonly placeholder = input<string>('');

  /**
   * Título opcional, exibido 4px acima.
   */
  readonly title = input<string>('');

  /**
   * Texto de ajuda opcional, exibido 4px abaixo.
   */
  readonly helper = input<string>('');

  /**
   * Estado desabilitado.
   * @default false
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Estado de erro.
   * @default false
   */
  readonly error = input(false, { transform: booleanAttribute });

  /** Valores selecionados. */
  protected readonly value = signal<string[]>([]);

  /** Menu aberto? */
  protected readonly open = signal(false);

  private readonly disabledByForm = signal(false);

  protected readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm()
  );

  /** Rótulos das opções selecionadas, juntos (vazio se nenhuma). */
  protected readonly selectedLabels = computed(() => {
    const selected = this.value();
    return this.options()
      .filter((o) => selected.includes(o.value))
      .map((o) => o.label)
      .join(', ');
  });

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  @HostBinding('attr.data-variant')
  get hostVariant(): MultiDropdownVariant {
    return this.variant();
  }

  @HostBinding('attr.data-open')
  get hostOpen(): '' | null {
    return this.open() ? '' : null;
  }

  @HostBinding('attr.data-error')
  get hostError(): '' | null {
    return this.error() ? '' : null;
  }

  @HostBinding('attr.data-disabled')
  get hostDisabled(): '' | null {
    return this.isDisabled() ? '' : null;
  }

  protected isSelected(option: DropdownOption): boolean {
    return this.value().includes(option.value);
  }

  protected toggleMenu(): void {
    if (this.isDisabled()) {
      return;
    }
    this.open.update((v) => !v);
  }

  /** Alterna a opção sem fechar o menu (múltipla escolha). */
  protected toggleOption(option: DropdownOption): void {
    const current = this.value();
    const next = current.includes(option.value)
      ? current.filter((v) => v !== option.value)
      : [...current, option.value];
    this.value.set(next);
    this.onChange(next);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target)) {
      this.open.set(false);
      this.onTouched();
    }
  }

  // ControlValueAccessor -----------------------------------------------------

  writeValue(value: string[]): void {
    this.value.set(Array.isArray(value) ? value : []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
