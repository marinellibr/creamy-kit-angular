import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';
import { BaseValueAccessor } from '../base-value-accessor';
import { FieldErrorIconComponent } from '../field-error-icon/field-error-icon.component';

let nextId = 0;

/**
 * Variações de estilo do Textbox.
 *
 * Por enquanto apenas `default` (mesmo estilo do Input).
 */
export type TextboxVariant = 'default' | 'on-brand';

/**
 * Componente de Textbox (textarea) do Creamy Kit.
 *
 * Mesmo estilo do Input, porém multi-linha (min-height 80px) e com um
 * contador de caracteres opcional à direita, na mesma linha do helper.
 * Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-textbox
 *   title="Comentário"
 *   placeholder="Escreva aqui…"
 *   helper="Seja breve"
 *   [maxLength]="120"
 *   [(ngModel)]="comentario"
 * />
 * ```
 */
@Component({
  selector: 'creamy-kit-textbox',
  standalone: true,
  imports: [FieldErrorIconComponent],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-error]': "error() ? '' : null",
    '[attr.data-disabled]': "isDisabled() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true,
    },
  ],
})
export class TextboxComponent extends BaseValueAccessor<string> {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  protected readonly uid = `kit-textbox-${nextId++}`;

  /**
   * Variação de estilo.
   * @default 'default'
   */
  readonly variant = input<TextboxVariant>('default');

  /**
   * Placeholder exibido quando vazio.
   */
  readonly placeholder = input<string>('');

  /**
   * Título opcional, exibido 4px acima.
   */
  readonly title = input<string>('');

  /**
   * Texto de ajuda opcional, exibido 4px abaixo (à esquerda).
   */
  readonly helper = input<string>('');

  /**
   * Número máximo de caracteres. Quando definido, limita o textarea e
   * exibe um contador `atual/máx` à direita do helper.
   */
  readonly maxLength = input(null, { transform: numberAttribute });

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

  protected readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm()
  );

  /** Mostra o rodapé (helper e/ou contador). */
  protected readonly hasFooter = computed(
    () => !!this.helper() || this.maxLength() != null
  );

  protected onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
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
