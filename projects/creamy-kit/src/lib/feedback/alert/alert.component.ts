import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
  signal,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Semântica de cor (feedback) do Alert.
 *
 * - `information` (padrão): informação neutra.
 * - `success`: operação bem-sucedida.
 * - `error`: erro ou falha.
 */
export type AlertFeedback = 'information' | 'success' | 'error';

/**
 * Componente de Alert do Creamy Kit.
 *
 * Caixa de aviso fixa, exibida inline no fluxo da página: ponto de cor +
 * bloco (título, corpo projetado e link) + botão de fechar.
 *
 * ```html
 * <kit-alert
 *   feedback="success"
 *   title="Tudo certo!"
 *   linkText="Ver detalhes"
 *   linkHref="/pedidos/123">
 *   Seu pedido foi confirmado.
 * </kit-alert>
 * ```
 */
@Component({
  selector: 'kit-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  constructor(private readonly themeService: ThemeService) {}

  /** Semântica de cor. @default 'information' */
  readonly feedback = input<AlertFeedback>('information');

  /** Título exibido em destaque no topo do bloco de conteúdo. */
  readonly title = input<string>('');

  /** Texto do link de ação. Se vazio, usa o próprio `linkHref`. */
  readonly linkText = input<string>('');

  /** Destino (href) do link. O link só é renderizado quando definido. */
  readonly linkHref = input<string>('');

  /** Emitido quando o usuário fecha o alerta. */
  readonly closed = output<void>();

  protected readonly dismissed = signal(false);

  protected dismiss(): void {
    this.dismissed.set(true);
    this.closed.emit();
  }

  @HostBinding('attr.role') readonly role = 'alert';

  @HostBinding('attr.data-feedback') get hostFeedback() {
    return this.feedback();
  }
}
