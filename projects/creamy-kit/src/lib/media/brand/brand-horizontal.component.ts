import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Base URL do repositório `creamy-kit-resources` (brands/). */
const BRAND_BASE_URL =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands';

/** Tamanho do brand: `small` | `medium` (padrão) | `large`. */
type BrandSize = 'small' | 'medium' | 'large';

/**
 * Logo de marca no formato horizontal (logo + wordmark) do Creamy Kit.
 *
 * Carrega `{brand}_horizontal_{size}.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-horizontal brandName="creamy" size="medium" />
 * ```
 */
@Component({
  selector: 'creamy-brand-horizontal',
  standalone: true,
  template: `
    <div class="brand-horizontal" [class]="'brand-horizontal--' + size()">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-horizontal__image"
        loading="lazy"
      />
    </div>
  `,
  styleUrl: './brand-horizontal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandHorizontalComponent {
  /** Nome da marca (arquivo em `brands/`, sem extensão). */
  readonly brandName = input.required<string>();

  /** Tamanho do logo. @default 'medium' */
  readonly size = input<BrandSize>('medium');

  /** URL final do SVG, derivada de `brandName` + `size`. */
  readonly brandUrl = computed(() => {
    const name = this.brandName().toLowerCase().replace(/\s+/g, '_');
    return `${BRAND_BASE_URL}/${name}_horizontal_${this.size()}.svg`;
  });
}
