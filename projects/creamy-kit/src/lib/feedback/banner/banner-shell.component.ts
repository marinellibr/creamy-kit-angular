import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { IconComponent } from '../../media/icon/icon.component';
import { BannerSize } from './banner-base.directive';

/**
 * Casca (shell) compartilhada das variações de Banner.
 *
 * Uso **interno**: renderiza a faixa (ícone + título + descrição) e expõe um
 * slot `[trailing]` para o elemento à direita de cada variação.
 */
@Component({
  selector: 'kit-banner-shell',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="banner">
      <span class="banner__icon" [style.color]="iconColorCss()">
        @if (iconName()) {
          <kit-icon [name]="iconName()" [size]="iconSizePx()" [color]="iconColorCss()" />
        } @else {
          <ng-content select="[icon]" />
        }
      </span>

      <div class="banner__body">
        @if (title()) {
          <strong class="banner__title">{{ title() }}</strong>
        }
        @if (description()) {
          <span class="banner__description">{{ description() }}</span>
        }
      </div>

      <ng-content select="[trailing]" />
    </div>
  `,
  styleUrl: './banner-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerShellComponent {
  constructor(private readonly themeService: ThemeService) {}

  readonly size = input<BannerSize>('medium');
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly iconName = input<string>('');
  readonly iconColor = input<string>('--feedbacks-information');
  readonly disabled = input<boolean>(false);

  protected readonly iconColorCss = computed(() =>
    this.disabled() ? 'var(--disabled-variant)' : `var(${this.iconColor()})`,
  );

  protected readonly iconSizePx = computed(() =>
    this.size() === 'small' ? 16 : this.size() === 'large' ? 32 : 24,
  );

  @HostBinding('attr.data-size') get hostSize() {
    return this.size();
  }
  @HostBinding('attr.data-disabled') get hostDisabled() {
    return this.disabled() ? '' : null;
  }
}
