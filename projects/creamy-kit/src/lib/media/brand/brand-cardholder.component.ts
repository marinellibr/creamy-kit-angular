import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const BRAND_BASE_URL =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/brands';

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
  readonly brandName = input.required<string>();

  readonly brandUrl = computed(() => {
    const name = this.brandName().toLowerCase().replace(/\s+/g, '_');
    return `${BRAND_BASE_URL}/${name}_cardholder.svg`;
  });
}
