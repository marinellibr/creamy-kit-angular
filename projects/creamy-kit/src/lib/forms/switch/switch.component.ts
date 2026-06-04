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
import { BaseValueAccessor } from '../base-value-accessor';

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
export class SwitchComponent extends BaseValueAccessor<boolean> {
  /** Cor do fundo quando ativo (CSS var ou valor direto). */
  readonly color = input<string>('var(--primary-base, #128cfe)');

  /** Desabilita o switch. @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Estado do toggle. */
  protected readonly value = signal(false);

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  /** Toggle o estado. */
  toggle(): void {
    if (this.isDisabled()) return;
    this.value.set(!this.value());
    this.onChange(this.value());
    this.onTouched();
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: boolean): void {
    this.value.set(value ?? false);
  }
}
