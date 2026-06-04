import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../../media/icon/icon.component';

/**
 * Item de TabBar.
 *
 * Ícone (24px) com label opcional abaixo (12px, cor action-neutral-base).
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
}
