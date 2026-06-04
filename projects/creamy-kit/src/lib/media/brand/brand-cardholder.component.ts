import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Base URL do repositório `creamy-kit-resources` (brands/). */
const BRAND_BASE_URL =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands';

/**
 * Logo de marca no formato cardholder (selo para cartões) do Creamy Kit.
 *
 * Carrega `{brand}_cardholder.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-cardholder brandName="creamy" />
 * ```
 */
@Component({
  selector: 'creamy-brand-cardholder',
  standalone: true,
  template: `
    <div class="brand-cardholder">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-cardholder__image"
        loading="lazy"
      />
    </div>
  `,
  styleUrl: './brand-cardholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandCardholderComponent {
  /** Nome da marca (arquivo em `brands/`, sem extensão). */
  readonly brandName = input.required<string>();

  /** URL final do SVG, derivada de `brandName`. */
  readonly brandUrl = computed(() => {
    const name = this.brandName().toLowerCase().replace(/\s+/g, '_');
    return `${BRAND_BASE_URL}/${name}_cardholder.svg`;
  });
}
