import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { BannerBase } from './banner-base.directive';
import { BannerShellComponent } from './banner-shell.component';

/**
 * Banner com tag: faixa com ícone, título, descrição e um bloco à direita
 * com um valor (em destaque) e uma label abaixo.
 *
 * ```html
 * <creamy-kit-banner-tag
 *   title="Cashback"
 *   description="Disponível hoje"
 *   iconName="wallet_base"
 *   tagValue="R$ 12,90"
 *   tagLabel="saldo" />
 * ```
 */
@Component({
  selector: 'creamy-kit-banner-tag',
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
      <div trailing class="banner__tag">
        <span class="banner__tag-value">{{ tagValue() }}</span>
        <span class="banner__tag-label">{{ tagLabel() }}</span>
      </div>
    </kit-banner-shell>
  `,
  styleUrl: './banner-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerTagComponent extends BannerBase {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  /** Valor exibido à direita, no topo. */
  readonly tagValue = input<string>('');

  /** Label exibida à direita, abaixo do valor. */
  readonly tagLabel = input<string>('');
}
