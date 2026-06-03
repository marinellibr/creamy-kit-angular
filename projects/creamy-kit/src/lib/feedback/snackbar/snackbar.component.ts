import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Semântica de cor (feedback) do Snackbar.
 *
 * - `information` (padrão), `success`, `error`: cores de feedback.
 * - `warning`: fundo `--feedbacks-alert`, texto escuro.
 * - `black` / `white`: fundo sólido preto/branco.
 */
export type SnackbarFeedback =
  | 'information'
  | 'success'
  | 'error'
  | 'warning'
  | 'black'
  | 'white';

/**
 * Componente de Snackbar do Creamy Kit.
 *
 * Notificação compacta e flutuante (toast): ponto de cor + conteúdo
 * projetado. Normalmente temporária.
 *
 * ```html
 * <kit-snackbar feedback="error">Não foi possível salvar.</kit-snackbar>
 * ```
 */
@Component({
  selector: 'kit-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  constructor(private readonly themeService: ThemeService) {}

  /** Semântica de cor. @default 'information' */
  readonly feedback = input<SnackbarFeedback>('information');

  @HostBinding('attr.role') readonly role = 'status';

  @HostBinding('attr.data-feedback') get hostFeedback() {
    return this.feedback();
  }
}
