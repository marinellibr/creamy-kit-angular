import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { IconComponent } from '../../media/icon/icon.component';
import { AvatarShellComponent } from './avatar-shell.component';
import { AvatarContrast, AvatarSize } from './avatar.types';

/** Tamanho do ícone (px) para cada tamanho de avatar. */
const ICON_PX: Record<AvatarSize, number> = {
  small: 14,
  medium: 18,
  large: 28,
};

/**
 * Avatar com ícone.
 *
 * ```html
 * <creamy-kit-avatar-icon name="user_base" contrast="dark" size="medium" />
 * ```
 */
@Component({
  selector: 'creamy-kit-avatar-icon',
  standalone: true,
  imports: [AvatarShellComponent, IconComponent],
  template: `
    <creamy-kit-avatar-shell
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      <creamy-kit-icon [name]="name()" [size]="iconPx()" color="currentColor" />
    </creamy-kit-avatar-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarIconComponent {
  /** Nome do ícone (arquivo em `creamy-kit-resources/icons`, sem extensão). */
  readonly name = input.required<string>();

  /** Tamanho do avatar. @default 'medium' */
  readonly size = input<AvatarSize>('medium');

  /** Contraste de cor. @default 'dark' */
  readonly contrast = input<AvatarContrast>('dark');

  /** Anel de progresso (0–100). @default 0 */
  readonly percentage = input<number>(0);

  protected readonly iconPx = computed(() => ICON_PX[this.size()]);
}
