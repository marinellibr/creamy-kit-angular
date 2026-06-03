import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Espessura do Divider.
 */
export type DividerWeight = '2px' | '3px' | '4px';

/**
 * Cor do Divider.
 */
export type DividerColor =
  | 'border-soft'
  | 'border-medium'
  | 'border-strong'
  | 'primary'
  | 'error';

/**
 * Componente de Divider do Creamy Kit.
 *
 * Linha horizontal de separação. Recebe espessura e cor como parâmetros.
 *
 * ```html
 * <creamy-kit-divider />
 * <creamy-kit-divider weight="3px" color="primary" />
 * ```
 */
@Component({
  selector: 'creamy-kit-divider',
  standalone: true,
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Espessura da linha.
   * @default '2px'
   */
  readonly weight = input<DividerWeight>('2px');

  /**
   * Cor da linha.
   *
   * - `border-soft` → `--border-soft`
   * - `border-medium` → `--border-medium` (padrão)
   * - `border-strong` → `--border-strong`
   * - `primary` → `--primary-base`
   * - `error` → `--feedbacks-error`
   *
   * @default 'border-medium'
   */
  readonly color = input<DividerColor>('border-medium');

  @HostBinding('attr.data-weight')
  get hostWeight(): DividerWeight {
    return this.weight();
  }

  @HostBinding('attr.data-color')
  get hostColor(): DividerColor {
    return this.color();
  }
}
