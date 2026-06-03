import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type LoadingSize = 'small' | 'medium' | 'large';
type LoadingVariant = 'default' | 'subtle';

/**
 * Componente de Loading (Loader) do Creamy Kit.
 *
 * Exibe um spinner animado com opções de tamanho e variante.
 *
 * ```html
 * <creamy-kit-loading />
 * <creamy-kit-loading size="large" variant="subtle" />
 * ```
 *
 * Inputs:
 * - `size` — tamanho do spinner ('small' | 'medium' | 'large'). Default: 'medium'
 * - `variant` — estilo do spinner ('default' | 'subtle'). Default: 'default'
 */
@Component({
  selector: 'creamy-kit-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  readonly size = input<LoadingSize>('medium');
  readonly variant = input<LoadingVariant>('default');
}
