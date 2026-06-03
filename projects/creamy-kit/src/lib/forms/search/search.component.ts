import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';

/**
 * Variações de estilo do Search.
 *
 * Por enquanto apenas `default`.
 */
export type SearchVariant = 'default' | 'on-brand';

/**
 * Componente de Search bar do Creamy Kit.
 *
 * Apenas a caixa de busca (sem título, helper ou estado desabilitado): ícone
 * de busca (à esquerda) + placeholder/valor + ícone à direita
 * (`[iconRight]`).
 *
 * Comportamento:
 * - Em repouso: ícone de busca à esquerda + ícone à direita.
 * - Ao focar (digitar): o ícone da esquerda some e o da direita vira um “X”
 *   que limpa o texto.
 * - Ao clicar fora: o ícone da esquerda volta, agora com o texto digitado.
 *
 * Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-search placeholder="Buscar…" [(ngModel)]="termo">
 *   <svg iconRight>…</svg>
 * </creamy-kit-search>
 * ```
 */
@Component({
  selector: 'creamy-kit-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent implements ControlValueAccessor {
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Variação de estilo.
   * @default 'default'
   */
  readonly variant = input<SearchVariant>('default');

  /**
   * Placeholder exibido quando vazio.
   */
  readonly placeholder = input<string>('');

  /**
   * Versão compacta: altura 40px e ícones 16px.
   * @default false
   */
  readonly small = input(false, { transform: booleanAttribute });

  /** Valor atual. */
  protected readonly value = signal('');

  /** O campo está focado? Controla a troca de ícones. */
  protected readonly focused = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  @HostBinding('attr.data-variant')
  get hostVariant(): SearchVariant {
    return this.variant();
  }

  @HostBinding('attr.data-small')
  get hostSmall(): '' | null {
    return this.small() ? '' : null;
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  protected onFocus(): void {
    this.focused.set(true);
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.onTouched();
  }

  protected clear(): void {
    this.value.set('');
    this.onChange('');
  }

  // ControlValueAccessor -----------------------------------------------------

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
