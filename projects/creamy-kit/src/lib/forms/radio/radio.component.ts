import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../../media/icon/icon.component';

/**
 * Opção de RadioButton.
 */
export interface RadioOption {
  label: string;
  value: string;
}

/**
 * Componente de Radio Button (grupo) do Creamy Kit.
 *
 * Recebe um array de `{ label, value }` e renderiza uma linha por opção:
 * ícone de radio (`radio_button_base` + `radio_button_variant` sobreposto)
 * seguido de label, com 12px de gap.
 *
 * Valor é uma `string` (seleção única). Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-radio [options]="opcoes" [(ngModel)]="selecionado" />
 * <creamy-kit-radio [options]="opcoes" [(ngModel)]="sel" color="var(--primary-base)" />
 * ```
 *
 * Inputs:
 * - `options` — array de `{ label, value }`. Default: `[]`.
 * - `color` — cor CSS (var ou valor direto). Default: `undefined` (usa base cinza + variant azul).
 *   Quando setado, usa a mesma cor para base e variant.
 */
@Component({
  selector: 'creamy-kit-radio',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  /** Opções exibidas. */
  readonly options = input<RadioOption[]>([]);

  /** Cor do ícone radio (base + variant). Se não setado, usa cinza base + azul variant. */
  readonly color = input<string | undefined>(undefined);

  /** Desabilita o grupo inteiro. @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Valor selecionado (string). */
  protected value: string | null = null;

  /** Disabled vindo do formulário reativo (`setDisabledState`). */
  private readonly disabledByForm = signal(false);

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  protected onChange: (value: string | null) => void = () => {};
  protected onTouched: () => void = () => {};

  /** Verifica se uma opção está selecionada. */
  isSelected(opt: RadioOption): boolean {
    return this.value === opt.value;
  }

  /** Seleciona uma opção. */
  select(opt: RadioOption): void {
    if (this.isDisabled()) return;
    this.value = opt.value;
    this.onChange(this.value);
    this.onTouched();
  }

  /* ControlValueAccessor implementation */

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
