import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { AvatarImageComponent } from '../../data-display/avatar/avatar-image.component';
import { IconComponent } from '../../media/icon/icon.component';
import { SearchComponent } from '../../forms/search/search.component';
import { HeaderBase } from './header-base.directive';

/**
 * Header de busca: barra de busca (`kit-search`) com microfone, precedida por
 * um botão de voltar ou um avatar.
 *
 * ```html
 * <kit-header-search placeholder="Buscar" avatarSrc="foto.jpg" />
 * ```
 */
@Component({
  selector: 'kit-header-search',
  standalone: true,
  imports: [AvatarImageComponent, IconComponent, SearchComponent],
  templateUrl: './header-search.component.html',
  styleUrl: './header-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSearchComponent extends HeaderBase {
  /** Exibe o botão de voltar à esquerda. */
  readonly back = input(false, { transform: booleanAttribute });

  /** Placeholder da busca. */
  readonly placeholder = input<string>('');

  /** URL do avatar (exibido quando não há botão de voltar). */
  readonly avatarSrc = input<string>('');

  /** Emitido ao clicar em voltar. */
  readonly backClick = output<void>();

  /** Emitido ao clicar no avatar. */
  readonly avatarClick = output<void>();

  /** Emitido ao clicar no microfone. */
  readonly micClick = output<void>();
}
