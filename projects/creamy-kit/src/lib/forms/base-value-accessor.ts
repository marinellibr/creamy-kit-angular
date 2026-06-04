import { Directive, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Classe abstrata que centraliza o boilerplate de `ControlValueAccessor`.
 *
 * Fornece `disabledByForm`, `onChange`, `onTouched` e as três implementações
 * padrão (`registerOnChange`, `registerOnTouched`, `setDisabledState`). Cada
 * subclasse precisa apenas implementar `writeValue`.
 */
@Directive()
export abstract class BaseValueAccessor<T> implements ControlValueAccessor {
  protected readonly disabledByForm = signal(false);
  protected onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};

  abstract writeValue(value: T): void;

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}
