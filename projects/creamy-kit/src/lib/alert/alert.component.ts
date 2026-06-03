import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
  signal,
} from '@angular/core';
import { ThemeService } from '../core/theme.service';

/**
 * Variações de exibição disponíveis para o componente Alert.
 */
export type AlertVariant =
  /**
   * Mensagem fixa, exibida inline no fluxo da página (caixa de aviso).
   */
  | 'alert'

  /**
   * Notificação compacta e flutuante (toast), normalmente temporária.
   */
  | 'snackbar';

/**
 * Feedbacks disponíveis na variação `alert` (caixa fixa).
 */
export type AlertFeedback = 'information' | 'success' | 'error';

/**
 * Feedbacks disponíveis na variação `snackbar`.
 * Inclui todos os feedbacks do `alert` mais `'warning'`, `'black'` e `'white'`.
 * - `warning`: fundo `--feedbacks-alert`, texto/ícone escuros.
 * - `black` / `white`: fundo sólido preto/branco.
 * `warning`, `black` e `white` são exclusivos do snackbar.
 */
export type SnackbarFeedback = AlertFeedback | 'warning' | 'black' | 'white';

/**
 * Componente de Alert do Creamy Kit.
 *
 * Exibe uma mensagem de feedback que pode ser renderizada como uma caixa
 * fixa (`alert`) ou como uma notificação flutuante (`snackbar`).
 *
 * Na variação `alert`, o layout é: ícone (32×32) + bloco com título, corpo e
 * link + botão de fechar. O corpo é projetado via `<ng-content>`.
 *
 * ## Alert (padrão)
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
 *
 * ## Snackbar
 *
 * ```html
 * <kit-alert variant="snackbar" feedback="error">
 *   Não foi possível salvar.
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

  /**
   * Define como o alerta é exibido.
   *
   * @default 'alert'
   *
   * Opções:
   * - `alert`: caixa de aviso fixa, inline no fluxo da página.
   * - `snackbar`: notificação compacta e flutuante (toast).
   */
  readonly variant = input<AlertVariant>('alert');

  /**
   * Define a semântica de cor (feedback) do alerta.
   *
   * @default 'information'
   *
   * Opções:
   * - `information`: informação neutra.
   * - `success`: operação bem-sucedida.
   * - `error`: erro ou falha.
   * - `warning`: atenção / aviso.
   */
  /**
   * Define a semântica de cor do alerta.
   *
   * @default 'information'
   *
   * Opções para `alert`: `information` · `success` · `error`.
   * Opções extras para `snackbar`: `black` · `white`.
   */
  readonly feedback = input<SnackbarFeedback>('information');

  /**
   * Título exibido em destaque no topo do bloco de conteúdo.
   *
   * Usado apenas na variação `alert`.
   */
  readonly title = input<string>('');

  /**
   * Texto exibido para o link de ação. Se vazio, usa o próprio `linkHref`.
   *
   * Usado apenas na variação `alert`.
   */
  readonly linkText = input<string>('');

  /**
   * Destino (href) do link de ação. O link só é renderizado quando definido.
   *
   * Usado apenas na variação `alert`.
   */
  readonly linkHref = input<string>('');

  /**
   * Emitido quando o usuário fecha o alerta pelo botão de fechar.
   */
  readonly closed = output<void>();

  /**
   * Controla a visibilidade interna após o fechamento.
   */
  protected readonly dismissed = signal(false);

  /**
   * Fecha o alerta e emite o evento `closed`.
   */
  protected dismiss(): void {
    this.dismissed.set(true);
    this.closed.emit();
  }

  @HostBinding('attr.role')
  get hostRole(): 'status' | 'alert' {
    return this.variant() === 'snackbar' ? 'status' : 'alert';
  }

  @HostBinding('attr.data-variant')
  get hostVariant(): AlertVariant {
    return this.variant();
  }

  @HostBinding('attr.data-feedback')
  get hostFeedback(): SnackbarFeedback {
    return this.feedback();
  }
}
