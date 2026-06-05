import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';
import { BaseValueAccessor } from '../base-value-accessor';
import { FieldErrorIconComponent } from '../field-error-icon/field-error-icon.component';

let nextId = 0;

/**
 * Opção exibida pelo Dropdown.
 */
export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * Variações de estilo do Dropdown.
 *
 * Por enquanto apenas `default` (mesmo estilo do Input).
 */
export type DropdownVariant = 'default' | 'on-brand';

/**
 * Componente de Dropdown (select) do Creamy Kit.
 *
 * Mesmo estilo visual do Input (título, caixa, helper, estados de foco,
 * disabled e erro). Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-dropdown
 *   title="País"
 *   placeholder="Selecione"
 *   helper="Escolha um país"
 *   [options]="[{ label: 'Brasil', value: 'br' }]"
 *   [(ngModel)]="pais"
 * />
 * ```
 */
@Component({
  selector: 'creamy-kit-dropdown',
  standalone: true,
  imports: [FieldErrorIconComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-open]': "open() ? '' : null",
    '[attr.data-error]': "error() ? '' : null",
    '[attr.data-disabled]': "isDisabled() ? '' : null",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent extends BaseValueAccessor<string> {
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor(private readonly themeService: ThemeService) {
    super();
  }

  protected readonly uid = `kit-dropdown-${nextId++}`;

  /**
   * Variação de estilo.
   * @default 'default'
   */
  readonly variant = input<DropdownVariant>('default');

  /**
   * Opções disponíveis.
   */
  readonly options = input<DropdownOption[]>([]);

  /**
   * Placeholder exibido quando nada está selecionado.
   */
  readonly placeholder = input<string>('');

  /**
   * Título opcional, exibido 4px acima.
   */
  readonly title = input<string>('');

  /**
   * Texto de ajuda opcional, exibido 4px abaixo.
   */
  readonly helper = input<string>('');

  /**
   * Estado desabilitado.
   * @default false
   */
  readonly disabled = input(false, { transform: booleanAttribute });

  /**
   * Estado de erro.
   * @default false
   */
  readonly error = input(false, { transform: booleanAttribute });

  /** Valor selecionado. */
  protected readonly value = signal<string>('');

  /** Menu aberto? */
  protected readonly open = signal(false);

  protected readonly isDisabled = computed(
    () => this.disabled() || this.disabledByForm()
  );

  /** Rótulo da opção selecionada (vazio se nenhuma). */
  protected readonly selectedLabel = computed(
    () => this.options().find((o) => o.value === this.value())?.label ?? ''
  );

  protected toggle(): void {
    if (this.isDisabled()) {
      return;
    }
    this.open.update((v) => !v);
  }

  protected select(option: DropdownOption): void {
    this.value.set(option.value);
    this.onChange(option.value);
    this.open.set(false);
    this.onTouched();
  }

  /** Fecha ao clicar fora do componente. */
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target)) {
      this.open.set(false);
      this.onTouched();
    }
  }

  // ControlValueAccessor -----------------------------------------------------

  override writeValue(value: string): void {
    this.value.set(value ?? '');
  }
}
