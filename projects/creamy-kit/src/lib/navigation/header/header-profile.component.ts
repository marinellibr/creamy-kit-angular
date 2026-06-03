import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { AvatarImageComponent } from '../../data-display/avatar/avatar-image.component';
import { HeaderBase } from './header-base.directive';

/**
 * Header de perfil: avatar + nome e sub-texto, com ações à direita
 * (projetadas via `[actions]`).
 *
 * ```html
 * <kit-header-profile title="Luiz Marinelli" subtitle="Premium" avatarSrc="foto.jpg">
 *   <button actions>…</button>
 * </kit-header-profile>
 * ```
 */
@Component({
  selector: 'kit-header-profile',
  standalone: true,
  imports: [AvatarImageComponent],
  templateUrl: './header-profile.component.html',
  styleUrl: './header-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderProfileComponent extends HeaderBase {
  /** Nome exibido. */
  readonly title = input<string>('');

  /** Sub-texto exibido abaixo do nome. */
  readonly subtitle = input<string>('');

  /** URL do avatar. */
  readonly avatarSrc = input<string>('');

  /** Emitido ao clicar no avatar. */
  readonly avatarClick = output<void>();
}
