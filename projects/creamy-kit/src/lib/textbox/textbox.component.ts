import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  HostBinding,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../core/theme.service';

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
 * <kit-textbox
 *   title="Comentário"
 *   placeholder="Escreva aqui…"
 *   helper="Seja breve"
 *   [maxLength]="120"
 *   [(ngModel)]="comentario"
 * />
 * ```
 */
@Component({
  selector: 'kit-textbox',
  standalone: true,
  imports: [],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true,
    },
  ],
})
export class TextboxComponent implements ControlValueAccessor {
  constructor(private readonly themeService: ThemeService) {}

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

  private readonly disabledByForm = signal(false);

  protected readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm()
  );

  /** Mostra o rodapé (helper e/ou contador). */
  protected readonly hasFooter = computed(
    () => !!this.helper() || this.maxLength() != null
  );

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  @HostBinding('attr.data-variant')
  get hostVariant(): TextboxVariant {
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
    const value = (event.target as HTMLTextAreaElement).value;
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
