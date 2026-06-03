import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { AvatarContrast, AvatarSize } from './avatar.types';

/**
 * Casca (shell) circular compartilhada pelos avatares.
 *
 * Uso **interno** do Creamy Kit: não é exportada na API pública. Concentra o
 * círculo, os tamanhos, os contrastes e o anel de progresso. Os avatares
 * públicos (`kit-avatar-icon`, `kit-avatar-text`, `kit-avatar-image`) a
 * reutilizam por composição, projetando apenas o conteúdo.
 */
@Component({
  selector: 'creamy-kit-avatar-shell',
  standalone: true,
  template: `
    <div class="avatar" [style.--kit-avatar-progress]="progressCss()">
      <span class="avatar__content"><ng-content /></span>
    </div>
  `,
  styleUrl: './avatar-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarShellComponent {
  constructor(private readonly themeService: ThemeService) {}

  /** Tamanho do avatar. @default 'medium' */
  readonly size = input<AvatarSize>('medium');

  /** Contraste de cor. @default 'dark' */
  readonly contrast = input<AvatarContrast>('dark');

  /** Anel de progresso (0–100) ao redor do avatar. @default 0 */
  readonly percentage = input<number>(0);

  /** Conteúdo sem fundo (usado pela imagem, que preenche o círculo). */
  readonly transparent = input(false, { transform: booleanAttribute });

  protected readonly progress = computed(() =>
    Math.max(0, Math.min(100, this.percentage())),
  );
  protected readonly progressCss = computed(() => `${this.progress()}%`);

  @HostBinding('attr.data-size') get hostSize() {
    return this.size();
  }
  @HostBinding('attr.data-contrast') get hostContrast() {
    return this.contrast();
  }
  @HostBinding('attr.data-surface') get hostSurface() {
    return this.transparent() ? 'transparent' : 'filled';
  }
  @HostBinding('attr.data-ring') get hostRing() {
    return this.progress() > 0 ? '' : null;
  }
}
