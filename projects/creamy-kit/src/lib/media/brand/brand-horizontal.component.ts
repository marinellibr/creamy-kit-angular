import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const BRAND_BASE_URL =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands';

type BrandSize = 'small' | 'medium' | 'large';

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
  readonly brandName = input.required<string>();
  readonly size = input<BrandSize>('medium');

  readonly brandUrl = computed(() => {
    const name = this.brandName().toLowerCase().replace(/\s+/g, '_');
    return `${BRAND_BASE_URL}/${name}_horizontal_${this.size()}.svg`;
  });
}
