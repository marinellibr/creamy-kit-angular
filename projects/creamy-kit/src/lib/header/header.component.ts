import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { IconComponent } from '../icon/icon.component';
import { SearchComponent } from '../search/search.component';
import { ThemeService } from '../core/theme.service';

/**
 * Conteúdo (centro) do Header.
 */
export type HeaderType =
  /** Barra de busca (consome `kit-search`). */
  | 'search'

  /** Título em linha única, ao lado do leading. */
  | 'title'

  /** "Small title" (overline) + "Large title" empilhados abaixo da linha de topo. */
  | 'large-title'

  /** Avatar + nome + subtexto (consome `kit-avatar`). */
  | 'profile';

/**
 * Tema do Header.
 */
export type HeaderTheme =
  /** Fundo da marca (azul), conteúdo branco. */
  | 'brand'

  /** Fundo claro, conteúdo escuro. */
  | 'light';

/**
 * Componente de Header do Creamy Kit.
 *
 * Barra superior com tema (`brand`/`light`), um conteúdo central por `type`
 * e ações à direita (projetadas via `[actions]`):
 * - `search`: busca (`kit-search`); leading = voltar (`[back]`) ou avatar;
 * - `title`: "Title" em linha única;
 * - `large-title`: `subtitle` (small title) + `title` (large title) abaixo;
 * - `profile`: avatar + `title` (nome) + `subtitle` (sub-texto).
 *
 * ```html
 * <kit-header type="large-title" theme="brand" back
 *   subtitle="Small title" title="Large title">
 *   <button actions>…</button>
 * </kit-header>
 * ```
 */
@Component({
  selector: 'kit-header',
  standalone: true,
  imports: [AvatarComponent, IconComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Conteúdo central.
   * @default 'search'
   */
  readonly type = input<HeaderType>('search');

  /**
   * Tema.
   * @default 'brand'
   */
  readonly theme = input<HeaderTheme>('brand');

  /** Exibe o botão de voltar (chevron) à esquerda. */
  readonly back = input(false, { transform: booleanAttribute });

  /** Placeholder da busca (type="search"). */
  readonly placeholder = input<string>('');

  /** URL do avatar (type="profile" ou "search"). */
  readonly avatarSrc = input<string>('');

  /**
   * Texto principal:
   * - `title` → o título;
   * - `large-title` → o título grande;
   * - `profile` → o nome.
   */
  readonly title = input<string>('');

  /**
   * Texto secundário:
   * - `large-title` → o "small title" (overline, acima);
   * - `profile` → o sub-texto (abaixo).
   */
  readonly subtitle = input<string>('');

  /** Emitido ao clicar em voltar. */
  readonly backClick = output<void>();

  /** Emitido ao clicar no avatar. */
  readonly avatarClick = output<void>();

  /** Emitido ao clicar no microfone (type="search"). */
  readonly micClick = output<void>();

  @HostBinding('attr.data-type')
  get hostType(): HeaderType {
    return this.type();
  }

  @HostBinding('attr.data-theme')
  get hostTheme(): HeaderTheme {
    return this.theme();
  }
}
