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

  private readonly resources = inject(CREAMY_KIT_RESOURCES);

  /** URL final do SVG, derivada de `brandName` + `size`. */
  readonly brandUrl = computed(() =>
    buildBrandUrl(this.resources.brandsBaseUrl, this.brandName(), 'square', this.size()),
  );
}
