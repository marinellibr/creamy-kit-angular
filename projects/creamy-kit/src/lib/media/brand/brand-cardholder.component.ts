import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { buildBrandUrl } from './brand.util';

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

  private readonly resources = inject(CREAMY_KIT_RESOURCES);

  /** URL final do SVG, derivada de `brandName`. */
  readonly brandUrl = computed(() =>
    buildBrandUrl(this.resources.brandsBaseUrl, this.brandName(), 'cardholder'),
  );
}
