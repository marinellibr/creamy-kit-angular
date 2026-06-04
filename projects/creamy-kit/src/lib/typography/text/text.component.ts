import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type TextType = 'title' | 'subtitle' | 'section' | 'body' | 'label';
export type TextColor = 'default' | 'on-brand' | 'variant';
export type TitleSize = 'small' | 'default' | 'large';
export type SectionSize = 'small' | 'default';
export type BodySize = 'small' | 'default' | 'large';
export type LabelSize = 'xxsmall' | 'xsmall' | 'small' | 'default' | 'large';

/**
 * Componente de Tipografia do Creamy Kit.
 *
 * Renderiza textos com estilos pré-definidos:
 * - **title**: 16px (small) / 24px (default) / 40px (large)
 * - **subtitle**: 36px fixo
 * - **section**: 16px (small) / 20px (default), weight 600
 * - **body**: 14px (small) / 16px (default) / 18px (large), com bold opcional (weight 500)
 * - **label**: 10px (xxsmall) / 11px (xsmall) / 14px (small) / 16px (default) / 20px (large),
 *   com bold, underline opcionals
 *
 * Cores:
 * - **default** (Title, Subtitle, Body): Text/heading
 * - **on-brand** (Title, Subtitle, Body, Label): Action/primary/contrast
 * - **variant** (Title, Subtitle, Body, Label): Action/primary/base
 * - Section: sem opção de cor variant
 *
 * ```html
 * <creamy-kit-text type="title" size="large" color="on-brand">Bem-vindo</creamy-kit-text>
 * <creamy-kit-text type="body" size="default" [bold]="true">Descrição em negrito</creamy-kit-text>
 * <creamy-kit-text type="label" size="small" [underline]="true">Label com underline</creamy-kit-text>
 * ```
 */
@Component({
  selector: 'creamy-kit-text',
  standalone: true,
  template: `<span [class]="hostClass()"><ng-content /></span>`,
  styleUrl: './text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
  },
})
export class TextComponent {
  /** Tipo de tipografia. */
  readonly type = input.required<TextType>();

  /** Cor: 'default' (Text/heading), 'on-brand' (Action/primary/contrast), 'variant' (Action/primary/base). */
  readonly color = input<TextColor>('default');

  /** Tamanho (depende do type). */
  readonly size = input<TitleSize | SectionSize | BodySize | LabelSize>('default');

  /** Se true, weight 500 (para body e label). */
  readonly bold = input(false);

  /** Se true, underline (para label). */
  readonly underline = input(false);

  /** Classes CSS do host. */
  readonly hostClass = computed(() => {
    const type = this.type();
    const color = this.color();
    const size = this.size();
    const bold = this.bold();
    const underline = this.underline();

    let classes = `text text--${type}`;

    if (type === 'section') {
      classes += ` text--size-${size}`;
    } else {
      if (color && color !== 'default') {
        classes += ` text--color-${color}`;
      }
      classes += ` text--size-${size}`;
    }

    if ((type === 'body' || type === 'label') && bold) {
      classes += ' text--bold';
    }

    if (type === 'label' && underline) {
      classes += ' text--underline';
    }

    return classes;
  });
}
