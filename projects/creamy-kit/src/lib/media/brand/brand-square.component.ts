import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Base URL do repositório `creamy-kit-resources` (brands/). */
const BRAND_BASE_URL =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands';

/** Tamanho do brand: `small` | `medium` (padrão) | `large`. */
type BrandSize = 'small' | 'medium' | 'large';

/**
 * Logo de marca no formato quadrado (1:1) do Creamy Kit.
 *
 * Carrega `{brand}_square_{size}.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-square brandName="creamy" size="large" />
 * ```
 */
@Component({
  selector: 'creamy-brand-square',
  standalone: true,
  template: `
    <div class="brand-square" [class]="'brand-square--' + size()">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-square__image"
        loading="lazy"
      />
    </div>
  `,
  styleUrl: './brand-square.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandSquareComponent {
  /** Nome da marca (arquivo em `brands/`, sem extensão). */
  readonly brandName = input.required<string>();

  /** Tamanho do logo. @default 'medium' */
  readonly size = input<BrandSize>('medium');

  /** URL final do SVG, derivada de `brandName` + `size`. */
  readonly brandUrl = computed(() => {
    const name = this.brandName().toLowerCase().replace(/\s+/g, '_');
    return `${BRAND_BASE_URL}/${name}_square_${this.size()}.svg`;
  });
}
