import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { IconComponent } from '../../media/icon/icon.component';
import { BannerBase } from './banner-base.directive';
import { BannerShellComponent } from './banner-shell.component';

/**
 * Banner em cartão: faixa com ícone, título, descrição e um ícone de ação
 * à direita.
 *
 * ```html
 * <creamy-kit-banner-card
 *   title="Configurações"
 *   description="Gerencie sua conta"
 *   iconName="settings_base"
 *   trailingIconName="arrow_right" />
 * ```
 */
@Component({
  selector: 'creamy-kit-banner-card',
  standalone: true,
  imports: [BannerShellComponent, IconComponent],
  template: `
    <creamy-kit-banner-shell
      [size]="size()"
      [title]="title()"
      [description]="description()"
      [iconName]="iconName()"
      [iconColor]="iconColor()"
      [disabled]="disabled()"
    >
      @if (trailingIconName()) {
        <span trailing class="banner__trailing">
          <creamy-kit-icon [name]="trailingIconName()" [size]="20" color="currentColor" />
        </span>
      }
    </creamy-kit-banner-shell>
  `,
  styleUrl: './banner-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerCardComponent extends BannerBase {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  /** Nome do ícone à direita (em `creamy-kit-resources/icons`, sem extensão). */
  readonly trailingIconName = input<string>('');
}
