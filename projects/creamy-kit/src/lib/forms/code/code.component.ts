import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';
import { BaseValueAccessor } from '../base-value-accessor';

/**
 * Quantidade de campos do Code.
 */
export type CodeLength = 4 | 6;

/**
 * Componente de Code (código de verificação / OTP) do Creamy Kit.
 *
 * 4 ou 6 campos de 32×48px, um caractere cada, com avanço automático de foco.
 * Mesmo título do Input Text e o mesmo comportamento de erro — sem helper e
 * sem estado desabilitado. Implementa `ControlValueAccessor` (valor = string
 * concatenada).
 *
 * ```html
 * <creamy-kit-code title="Código" [length]="6" [(ngModel)]="codigo" />
 * ```
 */
@Component({
  selector: 'creamy-kit-code',
  standalone: true,
  imports: [],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-error]': "error() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeComponent),
      multi: true,
    },
  ],
})
export class CodeComponent extends BaseValueAccessor<string> {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  /**
   * Quantidade de campos.
   * @default 6
   */
  readonly length = input<CodeLength>(6);

  /**
   * Título opcional, exibido 4px acima (igual ao Input Text).
   */
  readonly title = input<string>('');

  /**
   * Estado de erro — borda dos campos na cor de erro.
   * @default false
   */
  readonly error = input(false, { transform: booleanAttribute });

  /** Desabilita todos os campos. @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Caracteres de cada campo. */
  protected readonly chars = signal<string[]>([]);

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  /** Índices para renderizar os campos. */
  protected readonly indexes = computed(() =>
    Array.from({ length: this.length() }, (_, i) => i)
  );

  /** Referências aos inputs nativos para controle de foco. */
  private readonly boxes = viewChildren<ElementRef<HTMLInputElement>>('box');

  protected charAt(index: number): string {
    return this.chars()[index] ?? '';
  }

  protected onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let val = input.value;
    if (val.length > 1) {
      val = val.slice(-1);
    }
    input.value = val;

    const chars = [...this.chars()];
    while (chars.length < this.length()) {
      chars.push('');
    }
    chars[index] = val;
    this.chars.set(chars);
    this.emit();

    if (val && index < this.length() - 1) {
      this.focusBox(index + 1);
    }
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.focusBox(index - 1);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.focusBox(index - 1);
    } else if (event.key === 'ArrowRight' && index < this.length() - 1) {
      this.focusBox(index + 1);
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') ?? '').trim();
    if (!text) {
      return;
    }
    const len = this.length();
    const chars = Array.from({ length: len }, (_, i) => text[i] ?? '');
    this.chars.set(chars);
    this.emit();
    const firstEmpty = chars.findIndex((c) => !c);
    this.focusBox(firstEmpty === -1 ? len - 1 : firstEmpty);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  private focusBox(index: number): void {
    const el = this.boxes()[index]?.nativeElement;
    if (el) {
      el.focus();
      el.select();
    }
  }

  private emit(): void {
    this.onChange(this.chars().join(''));
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: string): void {
    const text = value ?? '';
    const chars = Array.from(
      { length: this.length() },
      (_, i) => text[i] ?? ''
    );
    this.chars.set(chars);
  }
}
