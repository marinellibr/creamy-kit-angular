import { Directive, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Tema do Header.
 *
 * - `brand` (padrão): fundo da marca (azul), conteúdo branco.
 * - `light`: fundo claro, conteúdo escuro.
 */
export type HeaderTheme = 'brand' | 'light';

/**
 * Base abstrata compartilhada pelas variações de Header (tema + binding de
 * host). Não use diretamente — estenda nas variações. O tipo `HeaderTheme`
 * é público.
 */
@Directive({
  host: {
    '[attr.data-theme]': 'theme()',
  },
})
export abstract class HeaderBase {
  protected readonly themeService = inject(ThemeService);

  /** Tema. @default 'brand' */
  readonly theme = input<HeaderTheme>('brand');
}
