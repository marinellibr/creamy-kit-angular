import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';

/**
 * Componente de Brand do Creamy Kit.
 *
 * Exibe um logo do `creamy-kit-resources/brands` com a altura informada.
 *
 * ```html
 * <creamy-kit-brand name="creamy" [height]="32" />
 * ```
 */
@Component({
  selector: 'creamy-kit-brand',
  standalone: true,
  imports: [],
  template: `
    <img class="brand" [src]="src()" [alt]="alt() || name()" [style.height.px]="height()" />
  `,
  styleUrl: './brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
  /** Nome do arquivo do logo (em `brands/`, sem extensão). */
  readonly name = input.required<string>();

  /** Altura do logo em pixels. @default 24 */
  readonly height = input<number>(24);

  /** Texto alternativo. Default = `name`. */
  readonly alt = input<string>('');

  /** Extensão do arquivo. @default 'svg' */
  readonly ext = input<string>('svg');

  private readonly resources = inject(CREAMY_KIT_RESOURCES);

  protected readonly src = computed(
    () => `${this.resources.brandsBaseUrl}/${this.name()}.${this.ext()}`,
  );
}
