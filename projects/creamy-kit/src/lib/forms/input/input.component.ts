import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';
import { BaseValueAccessor } from '../base-value-accessor';
import { FieldErrorIconComponent } from '../field-error-icon/field-error-icon.component';

let nextId = 0;

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
 * <creamy-kit-input
 *   title="E-mail"
 *   placeholder="seu@email.com"
 *   helper="Usaremos para login"
 *   [(ngModel)]="email"
 * >
 *   <svg icon>...</svg>
 * </creamy-kit-input>
 * ```
 */
@Component({
  selector: 'creamy-kit-input',
  standalone: true,
  imports: [FieldErrorIconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-error]': "error() ? '' : null",
    '[attr.data-disabled]': "isDisabled() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends BaseValueAccessor<string> {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  /** ID único para associar o label ao input via `for`/`id`. */
  protected readonly uid = `kit-input-${nextId++}`;

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

  /** Estado final de disabled (input OU formulário). */
  protected readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm()
  );

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: string): void {
    this.value.set(value ?? '');
  }
}
