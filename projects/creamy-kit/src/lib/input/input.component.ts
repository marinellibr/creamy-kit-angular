import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  HostBinding,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../core/theme.service';

/**
 * Variações de estilo do Input.
 *
 * Por enquanto apenas `default`; uma segunda variação será adicionada depois.
 */
export type InputVariant = 'default';

/**
 * Componente de Input do Creamy Kit.
 *
 * Implementa `ControlValueAccessor`, funcionando com `[(ngModel)]` e
 * formulários reativos.
 *
 * ```html
 * <kit-input
 *   title="E-mail"
 *   placeholder="seu@email.com"
 *   helper="Usaremos para login"
 *   [(ngModel)]="email"
 * >
 *   <svg icon>...</svg>
 * </kit-input>
 * ```
 */
@Component({
  selector: 'kit-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Variação de estilo.
   * @default 'default'
   */
  readonly variant = input<InputVariant>('default');

  /**
   * Tipo do input nativo (text, password, email, …).
   * @default 'text'
   */
  readonly type = input<string>('text');

  /**
   * Placeholder exibido quando vazio (enviado pelo consumidor).
   */
  readonly placeholder = input<string>('');

  /**
   * Título opcional, exibido 4px acima do input.
   */
  readonly title = input<string>('');

  /**
   * Texto de ajuda opcional, exibido 4px abaixo do input.
   * Em estado de erro, aparece na cor de erro com um ícone.
   */
  readonly helper = input<string>('');

  /**
   * Estado desabilitado. Pode vir por input ou via formulários
   * (`setDisabledState`).
   * @default false
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Estado de erro. Quando `true`, a borda e o helper ficam na cor de erro.
   * @default false
   */
  readonly error = input(false, { transform: booleanAttribute });

  /** Valor atual do campo. */
  protected readonly value = signal('');

  /** Disabled vindo de formulários reativos. */
  private readonly disabledByForm = signal(false);

  /** Estado final de disabled (input OU formulário). */
  protected readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm()
  );

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  @HostBinding('attr.data-variant')
  get hostVariant(): InputVariant {
    return this.variant();
  }

  @HostBinding('attr.data-error')
  get hostError(): '' | null {
    return this.error() ? '' : null;
  }

  @HostBinding('attr.data-disabled')
  get hostDisabled(): '' | null {
    return this.isDisabled() ? '' : null;
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor -----------------------------------------------------

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
