import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabBarItemComponent } from './tab-bar-item.component';
import { BaseValueAccessor } from '../../forms/base-value-accessor';

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
  host: {
    '[attr.data-disabled]': "isDisabled() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabBarComponent),
      multi: true,
    },
  ],
})
export class TabBarComponent extends BaseValueAccessor<string | null> {
  /** Tab items filhos. */
  readonly items = contentChildren(TabBarItemComponent);

  /** Desabilita a barra inteira. @default false */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Valor selecionado (value do TabBarItem). */
  protected value = signal<string | null>(null);

  /** Estado final de disabled (input OU formulário). */
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm(),
  );

  constructor() {
    super();
    effect(() => {
      const current = this.value();
      this.items().forEach(item => item.selected.set(item.value() === current));
    }, { allowSignalWrites: true });
  }

  /** Seleciona um item. */
  select(item: TabBarItemComponent): void {
    if (this.isDisabled()) return;
    this.value.set(item.value());
    this.onChange(this.value());
    this.onTouched();
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: string | null): void {
    this.value.set(value);
  }
}
