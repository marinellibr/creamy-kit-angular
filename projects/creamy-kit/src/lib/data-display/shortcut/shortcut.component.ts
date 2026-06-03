import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { IconComponent } from '../../media/icon/icon.component';

/**
 * Componente de Shortcut (atalho) do Creamy Kit.
 *
 * Botão com um ícone em destaque e um rótulo abaixo. Reutiliza `kit-icon`.
 *
 * ```html
 * <creamy-kit-shortcut iconName="wallet_base" label="Carteira" (pressed)="abrir()" />
 * ```
 */
@Component({
  selector: 'creamy-kit-shortcut',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button type="button" class="shortcut" (click)="pressed.emit()">
      <span class="shortcut__icon">
        <creamy-kit-icon [name]="iconName()" [size]="24" color="currentColor" />
      </span>
      <span class="shortcut__label">{{ label() }}</span>
    </button>
  `,
  styleUrl: './shortcut.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortcutComponent {
  constructor(private readonly themeService: ThemeService) {}

  /** Nome do ícone (em `creamy-kit-resources/icons`, sem extensão). */
  readonly iconName = input<string>('');

  /** Rótulo exibido abaixo do ícone. */
  readonly label = input<string>('');

  /** Emitido ao clicar no atalho. */
  readonly pressed = output<void>();
}
