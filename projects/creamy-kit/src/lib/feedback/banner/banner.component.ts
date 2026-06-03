import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { BannerBase } from './banner-base.directive';
import { BannerShellComponent } from './banner-shell.component';

/**
 * Banner de conteúdo (padrão): faixa de largura total com ícone, título,
 * descrição e um chevron à direita.
 *
 * ```html
 * <creamy-kit-banner
 *   title="Tudo certo!"
 *   description="Sua operação foi concluída."
 *   iconName="check_base"
 *   iconColor="--feedbacks-success-variant-2" />
 * ```
 */
@Component({
  selector: 'creamy-kit-banner',
  standalone: true,
  imports: [BannerShellComponent],
  template: `
    <creamy-kit-banner-shell
      [size]="size()"
      [title]="title()"
      [description]="description()"
      [iconName]="iconName()"
      [iconColor]="iconColor()"
      [disabled]="disabled()"
    >
      <span trailing class="banner__chevron" aria-hidden="true"></span>
    </kit-banner-shell>
  `,
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent extends BannerBase {
  constructor(private readonly themeService: ThemeService) {
    super();
  }
}
