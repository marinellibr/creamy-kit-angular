import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconComponent } from '../../media/icon/icon.component';
import { HeaderBase } from './header-base.directive';

/**
 * Header com título em linha única, com botão de voltar opcional e ações à
 * direita (projetadas via `[actions]`).
 *
 * ```html
 * <creamy-kit-header-title title="Pedidos" back>
 *   <button actions>…</button>
 * </creamy-kit-header-title>
 * ```
 */
@Component({
  selector: 'creamy-kit-header-title',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header-title.component.html',
  styleUrl: './header-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTitleComponent extends HeaderBase {
  /** Exibe o botão de voltar à esquerda. */
  readonly back = input(false, { transform: booleanAttribute });

  /** Título exibido. */
  readonly title = input<string>('');

  /** Emitido ao clicar em voltar. */
  readonly backClick = output<void>();
}
