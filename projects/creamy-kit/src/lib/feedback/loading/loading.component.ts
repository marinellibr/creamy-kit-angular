import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { IconComponent } from '../../media/icon/icon.component';

export type LoadingSize = 'xsmall' | 'small' | 'medium' | 'large';
export type LoadingVariant = 'primary' | 'neutral' | 'on-brand';

/**
 * Tamanho (px) do ícone central por size (18% da caixa, maior respiro de ~5-6px).
 */
const ICON_PX: Record<LoadingSize, number> = {
  xsmall: 3,
  small: 4,
  medium: 6,
  large: 12,
};

/**
 * Componente de Loading (Loader) do Creamy Kit.
 *
 * Um ícone central rodeado por um radial de 8 traços. A opacidade percorre os
 * traços como uma cauda de cometa — cada traço escurece quando a “cabeça” passa
 * e clareia logo atrás, dando a volta continuamente.
 *
 * ```html
 * <creamy-kit-loading />
 * <creamy-kit-loading icon="lock_base" size="large" variant="neutral" />
 * <creamy-kit-loading variant="on-brand" [showIcon]="false" />
 * ```
 *
 * Inputs:
 * - `icon` — nome do ícone central (arquivo SVG no `creamy-kit-resources/icons/`,
 *   sem extensão). Default: `'circle_variant'`.
 * - `size` — `'xsmall'` (16) | `'small'` (24) | `'medium'` (32) | `'large'` (64).
 *   Default: `'medium'`.
 * - `variant` — cor: `'primary'` (azul) | `'neutral'` (escuro) | `'on-brand'`
 *   (branco, para fundos coloridos). Default: `'primary'`.
 * - `showIcon` — exibe o ícone central. Default: `true`.
 * - `ariaLabel` — rótulo acessível. Default: `'Carregando'`.
 */
@Component({
  selector: 'creamy-kit-loading',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'status',
    'aria-live': 'polite',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'hostClass()',
  },
})
export class LoadingComponent {
  readonly icon = input<string>('circle_variant');
  readonly size = input<LoadingSize>('medium');
  readonly variant = input<LoadingVariant>('primary');
  readonly showIcon = input<boolean>(true);
  readonly ariaLabel = input<string>('Carregando');

  /** Tamanho (px) do ícone central conforme o `size`. */
  readonly iconPx = computed(() => ICON_PX[this.size()]);

  /** Classes do host (`kit-loading` + modificadores de size/variant). */
  readonly hostClass = computed(
    () =>
      `kit-loading kit-loading--${this.size()} kit-loading--${this.variant()}`,
  );
}
