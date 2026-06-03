import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Item emitido ao clicar em uma parte do breadcrumb.
 */
export interface BreadcrumbItemClick {
  /** Índice do item clicado. */
  index: number;
  /** Rótulo do item clicado. */
  label: string;
  /** Caminho acumulado até o item (segmentos unidos por "/"). */
  path: string;
}

/**
 * Componente de Breadcrumb do Creamy Kit.
 *
 * Sequência de textos clicáveis (Poppins 14px, Action/neutral/base) separados
 * por um chevron à direita. Recebe um `path` e o divide por "/".
 *
 * ```html
 * <creamy-kit-breadcrumb
 *   path="Início/Produtos/Tênis"
 *   (itemClick)="ir($event)"
 * />
 * ```
 */
@Component({
  selector: 'creamy-kit-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Caminho completo. Os segmentos são separados por "/".
   */
  readonly path = input<string>('');

  /**
   * Emitido ao clicar em um segmento.
   */
  readonly itemClick = output<BreadcrumbItemClick>();

  /** Segmentos do caminho (ignora vazios de "/" no início/fim). */
  protected readonly items = computed(() =>
    this.path()
      .split('/')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
  );

  protected onItemClick(index: number): void {
    const items = this.items();
    this.itemClick.emit({
      index,
      label: items[index],
      path: items.slice(0, index + 1).join('/'),
    });
  }
}
