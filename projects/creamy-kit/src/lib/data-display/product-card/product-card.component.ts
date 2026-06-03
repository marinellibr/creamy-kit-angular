import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { ButtonComponent } from '../../actions/button/button.component';
import { ImageComponent } from '../../media/image/image.component';
import { TagComponent, TagColor } from '../tag/tag.component';

/**
 * Componente de Product Card do Creamy Kit.
 *
 * Cartão de produto que reutiliza `kit-image`, `kit-tag` e `kit-button`:
 * imagem no topo (com tag opcional), título, preço e botão de ação.
 *
 * ```html
 * <creamy-kit-product-card
 *   imagePath="tenis.jpg"
 *   title="Tênis Creamy"
 *   price="R$ 299,90"
 *   tagText="Novo"
 *   buttonText="Comprar"
 *   (action)="comprar()" />
 * ```
 */
@Component({
  selector: 'creamy-kit-product-card',
  standalone: true,
  imports: [ButtonComponent, ImageComponent, TagComponent],
  template: `
    <div class="product-card">
      <div class="product-card__media">
        <creamy-kit-image size="small" [path]="imagePath()" [alt]="title()" />
        @if (tagText()) {
          <creamy-kit-tag class="product-card__tag" [color]="tagColor()">{{ tagText() }}</creamy-kit-tag>
        }
      </div>

      <div class="product-card__body">
        <span class="product-card__title">{{ title() }}</span>
        <span class="product-card__price">{{ price() }}</span>
      </div>

      @if (buttonText()) {
        <creamy-kit-button (click)="action.emit()">{{ buttonText() }}</creamy-kit-button>
      }
    </div>
  `,
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  constructor(private readonly themeService: ThemeService) {}

  /** URL da imagem do produto. */
  readonly imagePath = input<string>('');

  /** Título do produto. */
  readonly title = input<string>('');

  /** Preço exibido. */
  readonly price = input<string>('');

  /** Texto da tag (canto da imagem). Quando vazio, a tag não é exibida. */
  readonly tagText = input<string>('');

  /** Cor da tag. @default 'primary' */
  readonly tagColor = input<TagColor>('primary');

  /** Texto do botão. Quando vazio, o botão não é exibido. */
  readonly buttonText = input<string>('');

  /** Emitido ao clicar no botão. */
  readonly action = output<void>();
}
