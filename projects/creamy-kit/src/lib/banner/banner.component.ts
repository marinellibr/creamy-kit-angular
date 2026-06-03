import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../core/theme.service';
import { IconComponent } from '../icon/icon.component';

/**
 * Tipos de exibição do componente Banner.
 */
export type BannerType =
  /** Faixa de conteúdo de largura total. Padrão. */
  | 'content'

  /** Variação compacta em formato de tag. */
  | 'tag'

  /** Variação em formato de cartão. */
  | 'card';

/**
 * Tamanhos do ícone do Banner.
 */
export type BannerSize =
  /** Ícone 16 × 16 px */
  | 'small'

  /** Ícone 24 × 24 px (padrão) */
  | 'medium'

  /** Ícone 32 × 32 px */
  | 'large';

/**
 * Componente de Banner do Creamy Kit.
 *
 * O tipo `content` (padrão) é uma faixa de largura total com ícone, título e
 * corpo. O ícone é projetado via `<ng-content select="[icon]">` e sua cor é
 * definida pela variável de cor passada em `iconColor`.
 *
 * ## Content (padrão)
 * ```html
 * <kit-banner title="Tudo certo!" iconColor="--feedbacks-success-variant-2">
 *   <svg icon>...</svg>
 *   Sua operação foi concluída com sucesso.
 * </kit-banner>
 * ```
 */
@Component({
  selector: 'kit-banner',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Tipo de exibição.
   * @default 'content'
   */
  readonly type = input<BannerType>('content');

  /**
   * Tamanho do ícone.
   * @default 'medium'
   */
  readonly size = input<BannerSize>('medium');

  /**
   * Título exibido em destaque.
   */
  readonly title = input<string>('');

  /**
   * Descrição exibida abaixo do título (10px).
   */
  readonly description = input<string>('');

  /**
   * Variável de cor (token) aplicada ao ícone, ex.:
   * `--feedbacks-success-variant-2`.
   *
   * @default '--feedbacks-information'
   */
  readonly iconColor = input<string>('--feedbacks-information');

  /**
   * Nome do ícone (no `creamy-kit-resources/icons/`, sem extensão).
   * Quando preenchido, o Banner renderiza um `<kit-icon>` no lugar do
   * `<ng-content select="[icon]">`.
   *
   * Ex.: `'information_variant'`, `'check_base'`, `'error_circle_variant'`.
   */
  readonly iconName = input<string>('');

  /**
   * (type="card") Nome do ícone à direita (`creamy-kit-resources/icons/`,
   * sem extensão). Quando preenchido, o Banner renderiza um `<kit-icon>` 20px
   * no slot `trailing`.
   */
  readonly trailingIconName = input<string>('');

  /**
   * (type="tag") Valor exibido à direita, no topo — pode ser uma pill ou
   * texto. Altura 16px, cor Feedback/alert-contrast.
   */
  readonly tagValue = input<string>('');

  /**
   * (type="tag") Label exibida à direita, abaixo do `tagValue`.
   * Cor Text/body-2, 10px.
   */
  readonly tagLabel = input<string>('');

  /**
   * Estado desabilitado. Quando `true`, o fundo fica Background/variant-2 e
   * ícone/textos usam Action/disabled/variant.
   *
   * @default false
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Valor pronto para CSS a partir do token de cor (ex.:
   * `var(--feedbacks-success-variant-2)`). Quando desabilitado, usa a cor
   * Action/disabled/variant.
   */
  protected readonly iconColorCss = computed(() =>
    this.disabled() ? 'var(--disabled-variant)' : `var(${this.iconColor()})`
  );

  /** Tamanho do ícone em pixels, derivado do `size`. */
  protected readonly iconSizePx = computed<number>(() => {
    switch (this.size()) {
      case 'small': return 16;
      case 'large': return 32;
      default: return 24;
    }
  });

  @HostBinding('attr.data-type')
  get hostType(): BannerType {
    return this.type();
  }

  @HostBinding('attr.data-size')
  get hostSize(): BannerSize {
    return this.size();
  }

  @HostBinding('attr.data-disabled')
  get hostDisabled(): '' | null {
    return this.disabled() ? '' : null;
  }
}
