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

/**
 * Variações de estilo do Password.
 *
 * Por enquanto apenas `default` (mesmo estilo do Input).
 */
export type PasswordVariant = 'default' | 'on-brand';

/**
 * Componente de Input Password do Creamy Kit.
 *
 * Mesmos textos externos do Input Text (título e helper). Os dígitos
 * mascarados aparecem como círculos de 12px na cor Text/heading-2. Há um
 * ícone à direita para exibir/esconder a senha. Implementa
 * `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-password
 *   title="Senha"
 *   placeholder="Mínimo 8 caracteres"
 *   helper="Use letras e números"
 *   [(ngModel)]="senha"
 * />
 * ```
 */
@Component({
  selector: 'creamy-kit-password',
  standalone: true,
  imports: [],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-revealed]': "revealed() ? '' : null",
    '[attr.data-error]': "error() ? '' : null",
    '[attr.data-disabled]': "isDisabled() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent extends BaseValueAccessor<string> {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  /**
   * Variação de estilo.
   * @default 'default'
   */
  readonly variant = input<PasswordVariant>('default');

  /**
   * Placeholder exibido quando vazio.
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

  /** Valor atual. */
  protected readonly value = signal('');

  /** Senha visível (texto) ou mascarada (círculos)? */
  protected readonly revealed = signal(false);

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

  protected toggleReveal(): void {
    this.revealed.update((v) => !v);
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: string): void {
    this.value.set(value ?? '');
  }
}
