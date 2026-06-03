import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const BRAND_BASE_URL =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands';

type BrandSize = 'small' | 'medium' | 'large';

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
  readonly brandName = input.required<string>();
  readonly size = input<BrandSize>('medium');

  readonly brandUrl = computed(() => {
    const name = this.brandName().toLowerCase().replace(/\s+/g, '_');
    return `${BRAND_BASE_URL}/${name}_square_${this.size()}.svg`;
  });
}
