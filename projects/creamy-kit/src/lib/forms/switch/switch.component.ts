import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
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

  /** Estado do toggle. */
  protected value: boolean = false;

  protected onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  /** Toggle o estado. */
  toggle(): void {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  /* ControlValueAccessor implementation */

  writeValue(value: boolean): void {
    this.value = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: adicionar suporte a disabled se necessário
  }
}
