import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Ícone de erro compartilhado pelos campos de formulário.
 * Renderiza um SVG de alerta (círculo com "!") com aria-hidden.
 */
@Component({
  selector: 'creamy-kit-field-error-icon',
  standalone: true,
  template: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M8 5v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="8" cy="11" r="0.9" fill="currentColor" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorIconComponent {}
