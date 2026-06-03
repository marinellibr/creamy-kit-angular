import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../core/theme.service';

/**
 * Tamanhos disponíveis para o componente Avatar.
 */
export type AvatarSize =
  /** 24 × 24 px */
  | 'small'

  /** 32 × 32 px (padrão) */
  | 'medium'

  /** 48 × 48 px */
  | 'large';

/**
 * Variações de conteúdo do Avatar.
 */
export type AvatarVariant =
  /** Exibe um ícone (conteúdo via ng-content). Padrão. */
  | 'icon'

  /** Exibe iniciais em texto (conteúdo via ng-content). */
  | 'text'

  /** Exibe uma imagem (passe <img> via ng-content). */
  | 'image';

/**
 * Contraste de cor do Avatar.
 */
export type AvatarContrast =
  /**
   * Fundo Action/neutral/base (#484848), texto/ícone Action/primary/contrast.
   * Padrão.
   */
  | 'dark'

  /**
   * Fundo Action/primary/contrast (#f9f9fa), texto/ícone Action/neutral/base.
   */
  | 'light'

  /**
   * Fundo Action/primary/base (#128cfe), texto/ícone Action/primary/contrast.
   */
  | 'variant'

  /**
   * `variant` invertido: fundo Action/primary/contrast (#f9f9fa),
   * texto/ícone Action/primary/base (#128cfe).
   */
  | 'on-brand';

/**
 * Componente de Avatar do Creamy Kit.
 *
 * Sempre circular (border-radius 50%). O conteúdo é projetado via
 * `<ng-content>` — ícone SVG, iniciais de texto ou `<img>`.
 *
 * ## Ícone (padrão)
 * ```html
 * <kit-avatar>
 *   <svg>...</svg>
 * </kit-avatar>
 * ```
 *
 * ## Texto
 * ```html
 * <kit-avatar variant="text" size="large">LM</kit-avatar>
 * ```
 *
 * ## Imagem
 * ```html
 * <kit-avatar variant="image">
 *   <img src="avatar.jpg" alt="Luiz" />
 * </kit-avatar>
 * ```
 */
@Component({
  selector: 'kit-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Tamanho do avatar.
   * @default 'medium'
   */
  readonly size = input<AvatarSize>('medium');

  /**
   * Tipo de conteúdo exibido.
   * @default 'icon'
   */
  readonly variant = input<AvatarVariant>('icon');

  /**
   * Contraste de cor.
   * @default 'dark'
   */
  readonly contrast = input<AvatarContrast>('dark');

  /**
   * Progresso (0–100) exibido como anel ao redor do avatar.
   *
   * @default 0
   *
   * Quando acima de 0, desenha uma borda de progresso (1px em `small`,
   * 2px em `medium`, 4px em `large`): a parte que representa a porcentagem
   * usa a cor do texto/ícone e o restante usa a cor de fundo.
   */
  readonly percentage = input<number>(0);

  /**
   * Porcentagem normalizada (0–100).
   */
  protected readonly progress = computed(() =>
    Math.max(0, Math.min(100, this.percentage()))
  );

  /**
   * Valor pronto para uso no conic-gradient (ex.: "42%").
   */
  protected readonly progressCss = computed(() => `${this.progress()}%`);

  @HostBinding('attr.data-size')
  get hostSize(): AvatarSize {
    return this.size();
  }

  @HostBinding('attr.data-variant')
  get hostVariant(): AvatarVariant {
    return this.variant();
  }

  @HostBinding('attr.data-contrast')
  get hostContrast(): AvatarContrast {
    return this.contrast();
  }

  @HostBinding('attr.data-ring')
  get hostRing(): '' | null {
    return this.progress() > 0 ? '' : null;
  }
}
