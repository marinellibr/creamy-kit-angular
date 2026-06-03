import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Aparências disponíveis para o componente Button.
 */
export type ButtonAppearance =
  /**
   * Botão preenchido utilizando a cor principal.
   */
  | 'solid'

  /**
   * Botão com fundo transparente e borda visível.
   */
  | 'outline';

/**
 * Contrastes disponíveis para o componente Button.
 */
export type ButtonContrast =
  /**
   * Contraste padrão do tema.
   */
  | 'default'

  /**
   * Variante para uso sobre superfícies da marca (brand surfaces).
   */
  | 'on-brand';

/**
 * Componente de botão do Creamy Kit.
 *
 * ## Exemplo básico
 *
 * ```html
 * <kit-button>
 *   Salvar
 * </kit-button>
 * ```
 *
 * ## Outline
 *
 * ```html
 * <kit-button appearance="outline">
 *   Cancelar
 * </kit-button>
 * ```
 *
 * ## On Brand
 *
 * ```html
 * <kit-button contrast="on-brand">
 *   Comprar
 * </kit-button>
 * ```
 *
 * ## Outline + On Brand
 *
 * ```html
 * <kit-button
 *   appearance="outline"
 *   contrast="on-brand">
 *   Continuar
 * </kit-button>
 * ```
 */
@Component({
  selector: 'kit-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Define a aparência visual do botão.
   *
   * @default 'solid'
   *
   * Opções:
   * - `solid`: botão preenchido.
   * - `outline`: botão com borda e fundo transparente.
   */
  readonly appearance = input<ButtonAppearance>('solid');

  /**
   * Define o contraste visual do botão.
   *
   * @default 'default'
   *
   * Opções:
   * - `default`: utiliza as cores padrão do tema.
   * - `on-brand`: otimizado para uso sobre superfícies da marca.
   */
  readonly contrast = input<ButtonContrast>('default');

  @HostBinding('attr.data-appearance')
  get hostAppearance(): ButtonAppearance {
    return this.appearance();
  }

  @HostBinding('attr.data-contrast')
  get hostContrast(): ButtonContrast {
    return this.contrast();
  }
}
