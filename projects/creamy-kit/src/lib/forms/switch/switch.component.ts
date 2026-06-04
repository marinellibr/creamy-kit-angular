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

/**
 * Componente de Switch (Toggle) do Creamy Kit.
 *
 * Um toggle de dois estados (on/off) com cor customizável.
 * O ícone é um círculo branco que desliza dentro de um fundo colorido.
 *
 * ```html
 * <creamy-kit-switch [(ngModel)]="ativo" />
 * <creamy-kit-switch [(ngModel)]="feature" color="var(--primary-base)" />
 * ```
 *
 * Inputs:
 * - `color` — cor CSS (var ou valor direto) para o fundo quando ativo.
 *   Default: `var(--primary-base)` (azul).
 *
 * Implementa `ControlValueAccessor` (valor é `boolean`).
 */
@Component({
  selector: 'creamy-kit-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor {
  /** Cor do fundo quando ativo (CSS var ou valor direto). */
  readonly color = input<string>('var(--primary-base, #128cfe)');

  /** Desabilita o switch. @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Estado do toggle. */
  protected readonly value = signal(false);

  /** Disabled vindo do formulário reativo (`setDisabledState`). */
  private readonly disabledByForm = signal(false);

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  protected onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  /** Toggle o estado. */
  toggle(): void {
    if (this.isDisabled()) return;
    this.value.set(!this.value());
    this.onChange(this.value());
    this.onTouched();
  }

  /* ControlValueAccessor implementation */

  writeValue(value: boolean): void {
    this.value.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
