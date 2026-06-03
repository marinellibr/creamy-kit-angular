import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Componente de Card do Creamy Kit.
 *
 * Contêiner de largura total com cantos arredondados e borda. O conteúdo é
 * projetado via `<ng-content>`.
 *
 * ```html
 * <creamy-kit-card>
 *   <!-- conteúdo -->
 * </creamy-kit-card>
 * ```
 */
@Component({
  selector: 'creamy-kit-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  constructor(private readonly themeService: ThemeService) {}
}
