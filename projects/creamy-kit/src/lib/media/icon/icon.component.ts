import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Base URL do repositório `creamy-kit-resources` (icons/).
 * Mantida no componente para evitar dependência cruzada com o consumidor.
 */
const ICON_BASE_URL =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons';

/**
 * Componente de Ícone do Creamy Kit.
 *
 * Renderiza um SVG do `creamy-kit-resources` como `mask-image`, pintado com
 * a cor passada via `color` (qualquer valor CSS, inclusive `var(--token)` ou
 * `currentColor`). O tamanho é em pixels.
 *
 * ```html
 * <kit-icon name="arrow_right" />
 * <kit-icon name="lock_base" [size]="32" color="var(--primary-base)" />
 * <kit-icon name="search_variant" [size]="16" color="#ed339c" />
 * ```
 *
 * Inputs:
 * - `name` — nome do arquivo SVG no `icons/`, sem extensão.
 * - `size` — largura/altura em px. Default `24`.
 * - `color` — qualquer valor CSS (token var, hex, rgb, `currentColor`).
 *   Default `currentColor` (herda do contexto).
 * - `ariaLabel` — opcional. Quando omitido, o `name` é usado.
 */
@Component({
  selector: 'kit-icon',
  standalone: true,
  template: `
    <span
      class="kit-icon__mask"
      [attr.role]="'img'"
      [attr.aria-label]="ariaLabel() ?? name()"
      [style.background-color]="color()"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.mask-image]="maskImageUrl()"
      [style.-webkit-mask-image]="maskImageUrl()"
    ></span>
  `,
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /** Nome do arquivo SVG no `creamy-kit-resources/icons/`, sem `.svg`. */
  readonly name = input.required<string>();

  /** Tamanho do ícone (largura = altura), em pixels. */
  readonly size = input<number>(24);

  /** Cor do ícone. Aceita qualquer valor CSS. */
  readonly color = input<string>('currentColor');

  /** Rótulo acessível opcional. Default = `name`. */
  readonly ariaLabel = input<string | undefined>(undefined);

  /** URL `mask-image: url(...)` montada a partir do `name`. */
  readonly maskImageUrl = computed(
    () => `url("${ICON_BASE_URL}/${this.name()}.svg")`,
  );
}
