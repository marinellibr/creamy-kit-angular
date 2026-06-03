import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { AvatarShellComponent } from './avatar-shell.component';
import { AvatarContrast, AvatarSize } from './avatar.types';

/**
 * Avatar com iniciais (texto).
 *
 * ```html
 * <kit-avatar-text text="LM" size="large" contrast="variant" />
 * ```
 */
@Component({
  selector: 'kit-avatar-text',
  standalone: true,
  imports: [AvatarShellComponent],
  template: `
    <kit-avatar-shell
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      {{ text() }}
    </kit-avatar-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarTextComponent {
  /** Iniciais exibidas (ex.: "LM"). */
  readonly text = input<string>('');

  /** Tamanho do avatar. @default 'medium' */
  readonly size = input<AvatarSize>('medium');

  /** Contraste de cor. @default 'dark' */
  readonly contrast = input<AvatarContrast>('dark');

  /** Anel de progresso (0–100). @default 0 */
  readonly percentage = input<number>(0);
}
