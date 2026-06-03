import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Componente de Text Link do Creamy Kit.
 *
 * Link de texto sublinhado, com o rótulo projetado via `<ng-content>`.
 *
 * ```html
 * <kit-text-link href="/termos">Termos de uso</kit-text-link>
 * ```
 */
@Component({
  selector: 'kit-text-link',
  standalone: true,
  imports: [],
  template: `
    <a
      class="text-link"
      [href]="href()"
      [target]="target()"
      [attr.rel]="target() === '_blank' ? 'noopener noreferrer' : null"
    >
      <ng-content />
    </a>
  `,
  styleUrl: './text-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLinkComponent {
  constructor(private readonly themeService: ThemeService) {}

  /** Destino do link. */
  readonly href = input<string>('');

  /** Alvo do link. @default '_self' */
  readonly target = input<'_self' | '_blank'>('_self');
}
