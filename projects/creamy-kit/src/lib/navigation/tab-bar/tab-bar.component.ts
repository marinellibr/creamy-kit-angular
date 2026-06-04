import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabBarItemComponent } from './tab-bar-item.component';

/**
 * Componente de TabBar do Creamy Kit.
 *
 * Uma barra de navegação com abas fixada na parte inferior.
 * Altura 74px, 100% de largura, com border-radius 24px no topo.
 * Fundo azul (action-primary-contrast).
 *
 * ```html
 * <creamy-kit-tab-bar [(ngModel)]="abaSelecionada">
 *   <creamy-kit-tab-bar-item icon="home_base" label="Home" value="home" />
 *   <creamy-kit-tab-bar-item icon="search_variant" label="Search" value="search" />
 *   <creamy-kit-tab-bar-item icon="settings_base" value="settings" />
 * </creamy-kit-tab-bar>
 * ```
 *
 * Implementa `ControlValueAccessor` (valor é `string`, o value do item).
 */
@Component({
  selector: 'creamy-kit-tab-bar',
  standalone: true,
  imports: [TabBarItemComponent],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabBarComponent),
      multi: true,
    },
  ],
})
export class TabBarComponent implements ControlValueAccessor {
  /** Tab items filhos. */
  readonly items = contentChildren(TabBarItemComponent);

  /** Valor selecionado (value do TabBarItem). */
  protected value = signal<string | null>(null);

  protected onChange: (value: string | null) => void = () => {};
  protected onTouched: () => void = () => {};

  /** Seleciona um item. */
  select(item: TabBarItemComponent): void {
    this.value.set(item.value());
    this.onChange(this.value());
    this.onTouched();
  }

  /* ControlValueAccessor implementation */

  writeValue(value: string | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: adicionar suporte a disabled se necessário
  }
}
