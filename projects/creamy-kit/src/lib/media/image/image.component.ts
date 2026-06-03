import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  signal,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Tamanhos do Image.
 *
 * - `xxsmall`: 90×90, raio 24px
 * - `xsmall`: 140×140, raio 40px
 * - `small`: 321×256, raio 40px
 * - `medium`: 340×256, raio 40px (padrão)
 * - `large`: 355×256, raio 40px
 */
export type ImageSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large';

/**
 * Componente de Image do Creamy Kit.
 *
 * Renderiza a imagem (`path`) no tamanho do `size` com o raio correto. Em caso
 * de erro de carregamento, exibe Background/base no lugar.
 *
 * ```html
 * <creamy-kit-image size="medium" path="foto.jpg" alt="Descrição" />
 * ```
 */
@Component({
  selector: 'creamy-kit-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Tamanho da imagem.
   * @default 'medium'
   */
  readonly size = input<ImageSize>('medium');

  /** URL (path) da imagem. */
  readonly path = input<string>('');

  /** Texto alternativo (opcional). */
  readonly alt = input<string>('');

  /** Falhou ao carregar? */
  protected readonly errored = signal(false);

  @HostBinding('attr.data-size')
  get hostSize(): ImageSize {
    return this.size();
  }

  @HostBinding('attr.data-error')
  get hostError(): '' | null {
    return this.errored() ? '' : null;
  }

  protected onError(): void {
    this.errored.set(true);
  }
}
