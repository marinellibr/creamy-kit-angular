import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { IconComponent } from '../../media/icon/icon.component';

/**
 * Item de TabBar.
 *
 * Ícone (24px) com label opcional abaixo (12px, cor action-neutral-base).
 * Use sempre dentro de `<creamy-kit-tab-bar>`.
 *
 * ```html
 * <creamy-kit-tab-bar [(ngModel)]="aba">
 *   <creamy-kit-tab-bar-item icon="home_base" label="Início" value="home" />
 *   <creamy-kit-tab-bar-item icon="user_base" label="Perfil" value="perfil" />
 * </creamy-kit-tab-bar>
 * ```
 */
@Component({
  selector: 'creamy-kit-tab-bar-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './tab-bar-item.component.html',
  styleUrl: './tab-bar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarItemComponent {
  /** Nome do ícone (arquivo SVG no creamy-kit-resources/icons/). */
  readonly icon = input.required<string>();

  /** Label opcional exibido abaixo do ícone. */
  readonly label = input<string | undefined>(undefined);

  /** Valor identificador do item (para seleção). */
  readonly value = input.required<string>();

  /** Se este item está selecionado (gerenciado pelo TabBarComponent pai). */
  readonly selected = model(false);
}
