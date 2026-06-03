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
 * Header com título grande: linha de topo (voltar + ações) e, abaixo, um
 * "small title" (overline) seguido do título grande.
 *
 * ```html
 * <creamy-kit-header-large-title subtitle="Olá," title="Luiz" back>
 *   <button actions>…</button>
 * </creamy-kit-header-large-title>
 * ```
 */
@Component({
  selector: 'creamy-kit-header-large-title',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header-large-title.component.html',
  styleUrl: './header-large-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLargeTitleComponent extends HeaderBase {
  /** Exibe o botão de voltar à esquerda. */
  readonly back = input(false, { transform: booleanAttribute });

  /** Título grande. */
  readonly title = input<string>('');

  /** "Small title" (overline) exibido acima do título grande. */
  readonly subtitle = input<string>('');

  /** Emitido ao clicar em voltar. */
  readonly backClick = output<void>();
}
