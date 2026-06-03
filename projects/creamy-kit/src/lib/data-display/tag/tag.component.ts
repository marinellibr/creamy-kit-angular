import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Cor (semântica) da Tag.
 */
export type TagColor = 'neutral' | 'primary' | 'success' | 'error' | 'alert';

/**
 * Componente de Tag do Creamy Kit.
 *
 * Pequena etiqueta (pill) com o conteúdo projetado via `<ng-content>`.
 *
 * ```html
 * <creamy-kit-tag color="success">Pago</creamy-kit-tag>
 * ```
 */
@Component({
  selector: 'creamy-kit-tag',
  standalone: true,
  imports: [],
  template: `<span class="tag"><ng-content /></span>`,
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  constructor(private readonly themeService: ThemeService) {}

  /** Cor semântica. @default 'neutral' */
  readonly color = input<TagColor>('neutral');

  @HostBinding('attr.data-color') get hostColor() {
    return this.color();
  }
}
