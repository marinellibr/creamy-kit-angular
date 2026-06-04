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
import { DividerComponent } from '../../layout/divider/divider.component';
import { ThemeService } from '../../core/theme.service';
import { BaseValueAccessor } from '../base-value-accessor';

/**
 * Opção do Checkbox.
 */
export interface CheckboxOption {
  label: string;
  value: string;
}

/**
 * Componente de Checkbox (grupo) do Creamy Kit.
 *
 * Recebe um array de `{ label, value }` e renderiza uma linha por opção:
 * quadrado à esquerda (Action/neutral/base → Action/primary/base quando
 * marcado, 8px até o label) e um divider (small / border-medium) abaixo.
 * O valor é um `string[]` com os values marcados. Implementa
 * `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-checkbox [options]="opcoes" [(ngModel)]="marcados" />
 * ```
 */
@Component({
  selector: 'creamy-kit-checkbox',
  standalone: true,
  imports: [DividerComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends BaseValueAccessor<string[]> {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  /** Opções exibidas. */
  readonly options = input<CheckboxOption[]>([]);

  /**
   * Exibe o divider abaixo de cada opção.
   * @default true
   */
  readonly divider = input(true, { transform: booleanAttribute });

  /** Desabilita o grupo inteiro. @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Values marcados. */
  protected readonly value = signal<string[]>([]);

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  protected isSelected(option: CheckboxOption): boolean {
    return this.value().includes(option.value);
  }

  protected toggle(option: CheckboxOption): void {
    if (this.isDisabled()) return;
    const current = this.value();
    const next = current.includes(option.value)
      ? current.filter((v) => v !== option.value)
      : [...current, option.value];
    this.value.set(next);
    this.onChange(next);
    this.onTouched();
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: string[]): void {
    this.value.set(Array.isArray(value) ? value : []);
  }
}
