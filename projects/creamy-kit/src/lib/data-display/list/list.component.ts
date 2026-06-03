import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Componente de List do Creamy Kit.
 *
 * Contêiner vertical que empilha os itens projetados via `<ng-content>`,
 * separando-os com uma linha sutil.
 *
 * ```html
 * <kit-list>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </kit-list>
 * ```
 */
@Component({
  selector: 'kit-list',
  standalone: true,
  imports: [],
  template: `<div class="list"><ng-content /></div>`,
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  constructor(private readonly themeService: ThemeService) {}
}
