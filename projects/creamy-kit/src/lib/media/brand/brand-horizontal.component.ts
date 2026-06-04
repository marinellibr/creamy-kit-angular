import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { BrandSize, buildBrandUrl } from './brand.util';

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

  private readonly resources = inject(CREAMY_KIT_RESOURCES);

  /** URL final do SVG, derivada de `brandName` + `size`. */
  readonly brandUrl = computed(() =>
    buildBrandUrl(this.resources.brandsBaseUrl, this.brandName(), 'horizontal', this.size()),
  );
}
