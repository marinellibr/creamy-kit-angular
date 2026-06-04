import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { IconComponent } from '../../media/icon/icon.component';

export type TooltipVariant = 'default' | 'contrast';

/**
 * Componente Tooltip do Creamy Kit.
 *
 * Um pequeno rótulo informativo com altura 44px, border-radius 50% (circular),
 * texto centralizado e suporte a ícone opcional.
 *
 * ```html
 * <creamy-kit-tooltip text="Copiar para área de transferência" />
 * <creamy-kit-tooltip text="Configurações" icon="settings_base" variant="contrast" />
 * ```
 *
 * Inputs:
 * - `text` — texto do tooltip. Obrigatório.
 * - `icon` — nome do ícone (SVG sem extensão, opcional).
 * - `variant` — `'default'` (fundo neutro) | `'contrast'` (fundo mais escuro).
 *   Default: `'default'`.
 */
@Component({
  selector: 'creamy-kit-tooltip',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
  },
})
export class TooltipComponent {
  readonly text = input<string>('');
  readonly icon = input<string | undefined>();
  readonly variant = input<TooltipVariant>('default');

  /** Classes do host (`kit-tooltip` + modificador de variante). */
  readonly hostClass = computed(
    () => `kit-tooltip kit-tooltip--${this.variant()}`,
  );
}
