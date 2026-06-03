import {
  booleanAttribute,
  computed,
  Directive,
  input,
} from '@angular/core';

/**
 * Tamanho do ícone do Banner.
 *
 * - `small`: 16 px · `medium`: 24 px (padrão) · `large`: 32 px.
 */
export type BannerSize = 'small' | 'medium' | 'large';

/**
 * Inputs compartilhados pelas variações de Banner (content, tag e card).
 * Uso interno — não é exportada na API pública.
 */
@Directive()
export abstract class BannerBase {
  /** Tamanho do ícone. @default 'medium' */
  readonly size = input<BannerSize>('medium');

  /** Título exibido em destaque. */
  readonly title = input<string>('');

  /** Descrição exibida abaixo do título (10px). */
  readonly description = input<string>('');

  /** Nome do ícone (em `creamy-kit-resources/icons`, sem extensão). */
  readonly iconName = input<string>('');

  /** Token de cor do ícone, ex.: `--feedbacks-success-variant-2`. */
  readonly iconColor = input<string>('--feedbacks-information');

  /** Estado desabilitado. @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
}
