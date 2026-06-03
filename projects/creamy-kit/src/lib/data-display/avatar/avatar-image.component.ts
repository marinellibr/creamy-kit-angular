import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { AvatarShellComponent } from './avatar-shell.component';
import { AvatarContrast, AvatarSize } from './avatar.types';

/**
 * Avatar com imagem.
 *
 * ```html
 * <creamy-kit-avatar-image src="foto.jpg" alt="Luiz" size="large" />
 * ```
 */
@Component({
  selector: 'creamy-kit-avatar-image',
  standalone: true,
  imports: [AvatarShellComponent],
  template: `
    <creamy-kit-avatar-shell
      transparent
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      <img [src]="src()" [alt]="alt()" />
    </creamy-kit-avatar-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarImageComponent {
  /** URL da imagem. */
  readonly src = input<string>('');

  /** Texto alternativo. */
  readonly alt = input<string>('');

  /** Tamanho do avatar. @default 'medium' */
  readonly size = input<AvatarSize>('medium');

  /** Contraste de cor (usado no anel de progresso). @default 'dark' */
  readonly contrast = input<AvatarContrast>('dark');

  /** Anel de progresso (0–100). @default 0 */
  readonly percentage = input<number>(0);
}
