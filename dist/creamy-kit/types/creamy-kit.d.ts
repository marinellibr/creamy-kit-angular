import * as _angular_core from '@angular/core';
import { InjectionToken, Provider } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Origem dos assets visuais do Creamy Kit (ícones e brands).
 *
 * Por padrão aponta para o repositório público `creamy-kit-resources` no
 * GitHub (raw). Sobrescreva via {@link provideCreamyKitResources} para servir
 * os assets de um CDN próprio, de uma cópia empacotada (`/assets/...`) ou de
 * um ambiente offline — sem acoplar os componentes a uma URL fixa.
 */
interface CreamyKitResources {
    /** Base URL dos ícones (sem barra final). */
    iconsBaseUrl: string;
    /** Base URL dos brands/logos (sem barra final). */
    brandsBaseUrl: string;
}
/** Configuração padrão (GitHub raw do `creamy-kit-resources`). */
declare const CREAMY_KIT_RESOURCES_DEFAULTS: CreamyKitResources;
/**
 * Token de DI com a origem dos assets. Tem um default `providedIn: 'root'`,
 * então os componentes funcionam sem nenhuma configuração extra.
 */
declare const CREAMY_KIT_RESOURCES: InjectionToken<CreamyKitResources>;
/**
 * Configura a origem dos assets do Creamy Kit na aplicação consumidora.
 *
 * ```ts
 * bootstrapApplication(App, {
 *   providers: [
 *     provideCreamyKitResources({ iconsBaseUrl: '/assets/icons' }),
 *   ],
 * });
 * ```
 *
 * Valores omitidos mantêm o default (GitHub raw).
 */
declare function provideCreamyKitResources(config: Partial<CreamyKitResources>): Provider;

declare class ThemeService {
    private static initialized;
    constructor();
    private injectTheme;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<ThemeService>;
}

/**
 * Aparências disponíveis para o componente Button.
 */
type ButtonAppearance = 
/**
 * Botão preenchido utilizando a cor principal.
 */
'solid'
/**
 * Botão com fundo transparente e borda visível.
 */
 | 'outline';
/**
 * Contrastes disponíveis para o componente Button.
 */
type ButtonContrast = 
/**
 * Contraste padrão do tema.
 */
'default'
/**
 * Variante para uso sobre superfícies da marca (brand surfaces).
 */
 | 'on-brand';
/**
 * Componente de botão do Creamy Kit.
 *
 * ## Exemplo básico
 *
 * ```html
 * <creamy-kit-button>
 *   Salvar
 * </creamy-kit-button>
 * ```
 *
 * ## Outline
 *
 * ```html
 * <creamy-kit-button appearance="outline">
 *   Cancelar
 * </creamy-kit-button>
 * ```
 *
 * ## On Brand
 *
 * ```html
 * <creamy-kit-button contrast="on-brand">
 *   Comprar
 * </creamy-kit-button>
 * ```
 *
 * ## Outline + On Brand
 *
 * ```html
 * <creamy-kit-button
 *   appearance="outline"
 *   contrast="on-brand">
 *   Continuar
 * </creamy-kit-button>
 * ```
 */
declare class ButtonComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /**
     * Define a aparência visual do botão.
     *
     * @default 'solid'
     *
     * Opções:
     * - `solid`: botão preenchido.
     * - `outline`: botão com borda e fundo transparente.
     */
    readonly appearance: _angular_core.InputSignal<ButtonAppearance>;
    /**
     * Define o contraste visual do botão.
     *
     * @default 'default'
     *
     * Opções:
     * - `default`: utiliza as cores padrão do tema.
     * - `on-brand`: otimizado para uso sobre superfícies da marca.
     */
    readonly contrast: _angular_core.InputSignal<ButtonContrast>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ButtonComponent, "creamy-kit-button", never, { "appearance": { "alias": "appearance"; "required": false; "isSignal": true; }; "contrast": { "alias": "contrast"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/**
 * Classe abstrata que centraliza o boilerplate de `ControlValueAccessor`.
 *
 * Fornece `disabledByForm`, `onChange`, `onTouched` e as três implementações
 * padrão (`registerOnChange`, `registerOnTouched`, `setDisabledState`). Cada
 * subclasse precisa apenas implementar `writeValue`.
 */
declare abstract class BaseValueAccessor<T> implements ControlValueAccessor {
    protected readonly disabledByForm: _angular_core.WritableSignal<boolean>;
    protected onChange: (value: T) => void;
    protected onTouched: () => void;
    abstract writeValue(value: T): void;
    registerOnChange(fn: (value: T) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BaseValueAccessor<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<BaseValueAccessor<any>, never, never, {}, {}, never, never, true, never>;
}

/**
 * Ícone de erro compartilhado pelos campos de formulário.
 * Renderiza um SVG de alerta (círculo com "!") com aria-hidden.
 */
declare class FieldErrorIconComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FieldErrorIconComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FieldErrorIconComponent, "creamy-kit-field-error-icon", never, {}, {}, never, never, true, never>;
}

/**
 * Variações de estilo do Input.
 *
 * Por enquanto apenas `default`; uma segunda variação será adicionada depois.
 */
type InputVariant = 'default';
/**
 * Componente de Input do Creamy Kit.
 *
 * Implementa `ControlValueAccessor`, funcionando com `[(ngModel)]` e
 * formulários reativos.
 *
 * ```html
 * <creamy-kit-input
 *   title="E-mail"
 *   placeholder="seu@email.com"
 *   helper="Usaremos para login"
 *   [(ngModel)]="email"
 * >
 *   <svg icon>...</svg>
 * </creamy-kit-input>
 * ```
 */
declare class InputComponent extends BaseValueAccessor<string> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** ID único para associar o label ao input via `for`/`id`. */
    protected readonly uid: string;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    readonly variant: _angular_core.InputSignal<"default">;
    /**
     * Tipo do input nativo (text, password, email, …).
     * @default 'text'
     */
    readonly type: _angular_core.InputSignal<string>;
    /**
     * Placeholder exibido quando vazio (enviado pelo consumidor).
     */
    readonly placeholder: _angular_core.InputSignal<string>;
    /**
     * Título opcional, exibido 4px acima do input.
     */
    readonly title: _angular_core.InputSignal<string>;
    /**
     * Texto de ajuda opcional, exibido 4px abaixo do input.
     * Em estado de erro, aparece na cor de erro com um ícone.
     */
    readonly helper: _angular_core.InputSignal<string>;
    /**
     * Estado desabilitado. Pode vir por input ou via formulários
     * (`setDisabledState`).
     * @default false
     */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Estado de erro. Quando `true`, a borda e o helper ficam na cor de erro.
     * @default false
     */
    readonly error: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valor atual do campo. */
    protected readonly value: _angular_core.WritableSignal<string>;
    /** Estado final de disabled (input OU formulário). */
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    protected onInput(event: Event): void;
    protected onBlur(): void;
    writeValue(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<InputComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<InputComponent, "creamy-kit-input", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "helper": { "alias": "helper"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; }, {}, never, ["[icon]"], true, never>;
}

/**
 * Variações de estilo do Textbox.
 *
 * Por enquanto apenas `default` (mesmo estilo do Input).
 */
type TextboxVariant = 'default' | 'on-brand';
/**
 * Componente de Textbox (textarea) do Creamy Kit.
 *
 * Mesmo estilo do Input, porém multi-linha (min-height 80px) e com um
 * contador de caracteres opcional à direita, na mesma linha do helper.
 * Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-textbox
 *   title="Comentário"
 *   placeholder="Escreva aqui…"
 *   helper="Seja breve"
 *   [maxLength]="120"
 *   [(ngModel)]="comentario"
 * />
 * ```
 */
declare class TextboxComponent extends BaseValueAccessor<string> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    protected readonly uid: string;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    readonly variant: _angular_core.InputSignal<TextboxVariant>;
    /**
     * Placeholder exibido quando vazio.
     */
    readonly placeholder: _angular_core.InputSignal<string>;
    /**
     * Título opcional, exibido 4px acima.
     */
    readonly title: _angular_core.InputSignal<string>;
    /**
     * Texto de ajuda opcional, exibido 4px abaixo (à esquerda).
     */
    readonly helper: _angular_core.InputSignal<string>;
    /**
     * Número máximo de caracteres. Quando definido, limita o textarea e
     * exibe um contador `atual/máx` à direita do helper.
     */
    readonly maxLength: _angular_core.InputSignalWithTransform<number | null, unknown>;
    /**
     * Estado desabilitado.
     * @default false
     */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Estado de erro.
     * @default false
     */
    readonly error: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valor atual. */
    protected readonly value: _angular_core.WritableSignal<string>;
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    /** Mostra o rodapé (helper e/ou contador). */
    protected readonly hasFooter: _angular_core.Signal<boolean>;
    protected onInput(event: Event): void;
    protected onBlur(): void;
    writeValue(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TextboxComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TextboxComponent, "creamy-kit-textbox", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "helper": { "alias": "helper"; "required": false; "isSignal": true; }; "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; }, {}, never, ["[icon]"], true, never>;
}

/**
 * Variações de estilo do Password.
 *
 * Por enquanto apenas `default` (mesmo estilo do Input).
 */
type PasswordVariant = 'default' | 'on-brand';
/**
 * Componente de Input Password do Creamy Kit.
 *
 * Mesmos textos externos do Input Text (título e helper). Os dígitos
 * mascarados aparecem como círculos de 12px na cor Text/heading-2. Há um
 * ícone à direita para exibir/esconder a senha. Implementa
 * `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-password
 *   title="Senha"
 *   placeholder="Mínimo 8 caracteres"
 *   helper="Use letras e números"
 *   [(ngModel)]="senha"
 * />
 * ```
 */
declare class PasswordComponent extends BaseValueAccessor<string> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    protected readonly uid: string;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    readonly variant: _angular_core.InputSignal<PasswordVariant>;
    /**
     * Placeholder exibido quando vazio.
     */
    readonly placeholder: _angular_core.InputSignal<string>;
    /**
     * Título opcional, exibido 4px acima.
     */
    readonly title: _angular_core.InputSignal<string>;
    /**
     * Texto de ajuda opcional, exibido 4px abaixo.
     */
    readonly helper: _angular_core.InputSignal<string>;
    /**
     * Estado desabilitado.
     * @default false
     */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Estado de erro.
     * @default false
     */
    readonly error: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valor atual. */
    protected readonly value: _angular_core.WritableSignal<string>;
    /** Senha visível (texto) ou mascarada (círculos)? */
    protected readonly revealed: _angular_core.WritableSignal<boolean>;
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    protected onInput(event: Event): void;
    protected onBlur(): void;
    protected toggleReveal(): void;
    writeValue(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PasswordComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<PasswordComponent, "creamy-kit-password", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "helper": { "alias": "helper"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Variações de estilo do Search.
 *
 * Por enquanto apenas `default`.
 */
type SearchVariant = 'default' | 'on-brand';
/**
 * Componente de Search bar do Creamy Kit.
 *
 * Apenas a caixa de busca (sem título, helper ou estado desabilitado): ícone
 * de busca (à esquerda) + placeholder/valor + ícone à direita
 * (`[iconRight]`).
 *
 * Comportamento:
 * - Em repouso: ícone de busca à esquerda + ícone à direita.
 * - Ao focar (digitar): o ícone da esquerda some e o da direita vira um "X"
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
declare class SearchComponent extends BaseValueAccessor<string> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /**
     * Variação de estilo.
     * @default 'default'
     */
    readonly variant: _angular_core.InputSignal<SearchVariant>;
    /**
     * Placeholder exibido quando vazio.
     */
    readonly placeholder: _angular_core.InputSignal<string>;
    /**
     * Versão compacta: altura 40px e ícones 16px.
     * @default false
     */
    readonly small: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Desabilita o campo. @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valor atual. */
    protected readonly value: _angular_core.WritableSignal<string>;
    /** O campo está focado? Controla a troca de ícones. */
    protected readonly focused: _angular_core.WritableSignal<boolean>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    protected onInput(event: Event): void;
    protected onFocus(): void;
    protected onBlur(): void;
    protected clear(): void;
    writeValue(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SearchComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SearchComponent, "creamy-kit-search", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "small": { "alias": "small"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, ["[iconRight]"], true, never>;
}

/**
 * Opção exibida pelo Dropdown.
 */
interface DropdownOption {
    label: string;
    value: string;
}
/**
 * Variações de estilo do Dropdown.
 *
 * Por enquanto apenas `default` (mesmo estilo do Input).
 */
type DropdownVariant = 'default' | 'on-brand';
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
declare class DropdownComponent extends BaseValueAccessor<string> {
    private readonly themeService;
    private readonly host;
    constructor(themeService: ThemeService);
    protected readonly uid: string;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    readonly variant: _angular_core.InputSignal<DropdownVariant>;
    /**
     * Opções disponíveis.
     */
    readonly options: _angular_core.InputSignal<DropdownOption[]>;
    /**
     * Placeholder exibido quando nada está selecionado.
     */
    readonly placeholder: _angular_core.InputSignal<string>;
    /**
     * Título opcional, exibido 4px acima.
     */
    readonly title: _angular_core.InputSignal<string>;
    /**
     * Texto de ajuda opcional, exibido 4px abaixo.
     */
    readonly helper: _angular_core.InputSignal<string>;
    /**
     * Estado desabilitado.
     * @default false
     */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Estado de erro.
     * @default false
     */
    readonly error: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valor selecionado. */
    protected readonly value: _angular_core.WritableSignal<string>;
    /** Menu aberto? */
    protected readonly open: _angular_core.WritableSignal<boolean>;
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    /** Rótulo da opção selecionada (vazio se nenhuma). */
    protected readonly selectedLabel: _angular_core.Signal<string>;
    protected toggle(): void;
    protected select(option: DropdownOption): void;
    /** Fecha ao clicar fora do componente. */
    protected onDocumentClick(event: MouseEvent): void;
    writeValue(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DropdownComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<DropdownComponent, "creamy-kit-dropdown", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "helper": { "alias": "helper"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Variações de estilo do MultiDropdown.
 *
 * Por enquanto apenas `default`.
 */
type MultiDropdownVariant = 'default';
/**
 * Componente de Dropdown de múltipla escolha do Creamy Kit.
 *
 * Igual ao Dropdown, porém cada opção tem um quadrado à esquerda
 * (Action/neutral/base, virando Action/primary/base quando selecionado) e
 * permite selecionar vários valores. O valor é um array de strings.
 * Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-multidropdown
 *   title="Tags"
 *   placeholder="Selecione"
 *   [options]="opcoes"
 *   [(ngModel)]="tags"
 * />
 * ```
 */
declare class MultiDropdownComponent extends BaseValueAccessor<string[]> {
    private readonly themeService;
    private readonly host;
    constructor(themeService: ThemeService);
    protected readonly uid: string;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    readonly variant: _angular_core.InputSignal<"default">;
    /**
     * Opções disponíveis.
     */
    readonly options: _angular_core.InputSignal<DropdownOption[]>;
    /**
     * Placeholder exibido quando nada está selecionado.
     */
    readonly placeholder: _angular_core.InputSignal<string>;
    /**
     * Título opcional, exibido 4px acima.
     */
    readonly title: _angular_core.InputSignal<string>;
    /**
     * Texto de ajuda opcional, exibido 4px abaixo.
     */
    readonly helper: _angular_core.InputSignal<string>;
    /**
     * Estado desabilitado.
     * @default false
     */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Estado de erro.
     * @default false
     */
    readonly error: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valores selecionados. */
    protected readonly value: _angular_core.WritableSignal<string[]>;
    /** Menu aberto? */
    protected readonly open: _angular_core.WritableSignal<boolean>;
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    /** Rótulos das opções selecionadas, juntos (vazio se nenhuma). */
    protected readonly selectedLabels: _angular_core.Signal<string>;
    protected isSelected(option: DropdownOption): boolean;
    protected toggleMenu(): void;
    /** Alterna a opção sem fechar o menu (múltipla escolha). */
    protected toggleOption(option: DropdownOption): void;
    protected onDocumentClick(event: MouseEvent): void;
    writeValue(value: string[]): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MultiDropdownComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MultiDropdownComponent, "creamy-kit-multidropdown", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "helper": { "alias": "helper"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Opção do Checkbox.
 */
interface CheckboxOption {
    label: string;
    value: string;
}
/**
 * Componente de Checkbox (grupo) do Creamy Kit.
 *
 * Recebe um array de `{ label, value }` e renderiza uma linha por opção:
 * quadrado à esquerda (Action/neutral/base → Action/primary/base quando
 * marcado, 8px até o label) e um divider (small / border-medium) abaixo.
 * O valor é um `string[]` com os values marcados. Implementa
 * `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-checkbox [options]="opcoes" [(ngModel)]="marcados" />
 * ```
 */
declare class CheckboxComponent extends BaseValueAccessor<string[]> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Opções exibidas. */
    readonly options: _angular_core.InputSignal<CheckboxOption[]>;
    /**
     * Exibe o divider abaixo de cada opção.
     * @default true
     */
    readonly divider: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Desabilita o grupo inteiro. @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Values marcados. */
    protected readonly value: _angular_core.WritableSignal<string[]>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    protected isSelected(option: CheckboxOption): boolean;
    protected toggle(option: CheckboxOption): void;
    writeValue(value: string[]): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CheckboxComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CheckboxComponent, "creamy-kit-checkbox", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "divider": { "alias": "divider"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Opção de RadioButton.
 */
interface RadioOption {
    label: string;
    value: string;
}
/**
 * Componente de Radio Button (grupo) do Creamy Kit.
 *
 * Recebe um array de `{ label, value }` e renderiza uma linha por opção:
 * ícone de radio (`radio_button_base` + `radio_button_variant` sobreposto)
 * seguido de label, com 12px de gap.
 *
 * Valor é uma `string` (seleção única). Implementa `ControlValueAccessor`.
 *
 * ```html
 * <creamy-kit-radio [options]="opcoes" [(ngModel)]="selecionado" />
 * <creamy-kit-radio [options]="opcoes" [(ngModel)]="sel" color="var(--primary-base)" />
 * ```
 *
 * Inputs:
 * - `options` — array de `{ label, value }`. Default: `[]`.
 * - `color` — cor CSS (var ou valor direto). Default: `undefined` (usa base cinza + variant azul).
 *   Quando setado, usa a mesma cor para base e variant.
 */
declare class RadioComponent extends BaseValueAccessor<string | null> {
    /** Opções exibidas. */
    readonly options: _angular_core.InputSignal<RadioOption[]>;
    /** Cor do ícone radio (base + variant). Se não setado, usa cinza base + azul variant. */
    readonly color: _angular_core.InputSignal<string | undefined>;
    /** Desabilita o grupo inteiro. @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valor selecionado (string). */
    protected readonly value: _angular_core.WritableSignal<string | null>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    /** Verifica se uma opção está selecionada. */
    isSelected(opt: RadioOption): boolean;
    /** Seleciona uma opção. */
    select(opt: RadioOption): void;
    writeValue(value: string | null): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RadioComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RadioComponent, "creamy-kit-radio", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Componente de Switch (Toggle) do Creamy Kit.
 *
 * Um toggle de dois estados (on/off) com cor customizável.
 * O ícone é um círculo branco que desliza dentro de um fundo colorido.
 *
 * ```html
 * <creamy-kit-switch [(ngModel)]="ativo" />
 * <creamy-kit-switch [(ngModel)]="feature" color="var(--primary-base)" />
 * ```
 *
 * Inputs:
 * - `color` — cor CSS (var ou valor direto) para o fundo quando ativo.
 *   Default: `var(--primary-base)` (azul).
 *
 * Implementa `ControlValueAccessor` (valor é `boolean`).
 */
declare class SwitchComponent extends BaseValueAccessor<boolean> {
    /** Cor do fundo quando ativo (CSS var ou valor direto). */
    readonly color: _angular_core.InputSignal<string>;
    /** Desabilita o switch. @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Estado do toggle. */
    protected readonly value: _angular_core.WritableSignal<boolean>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    /** Toggle o estado. */
    toggle(): void;
    writeValue(value: boolean): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SwitchComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SwitchComponent, "creamy-kit-switch", never, { "color": { "alias": "color"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Quantidade de campos do Code.
 */
type CodeLength = 4 | 6;
/**
 * Componente de Code (código de verificação / OTP) do Creamy Kit.
 *
 * 4 ou 6 campos de 32×48px, um caractere cada, com avanço automático de foco.
 * Mesmo título do Input Text e o mesmo comportamento de erro — sem helper e
 * sem estado desabilitado. Implementa `ControlValueAccessor` (valor = string
 * concatenada).
 *
 * ```html
 * <creamy-kit-code title="Código" [length]="6" [(ngModel)]="codigo" />
 * ```
 */
declare class CodeComponent extends BaseValueAccessor<string> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /**
     * Quantidade de campos.
     * @default 6
     */
    readonly length: _angular_core.InputSignal<CodeLength>;
    /**
     * Título opcional, exibido 4px acima (igual ao Input Text).
     */
    readonly title: _angular_core.InputSignal<string>;
    /**
     * Estado de erro — borda dos campos na cor de erro.
     * @default false
     */
    readonly error: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Desabilita todos os campos. @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Caracteres de cada campo. */
    protected readonly chars: _angular_core.WritableSignal<string[]>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    /** Índices para renderizar os campos. */
    protected readonly indexes: _angular_core.Signal<number[]>;
    /** Referências aos inputs nativos para controle de foco. */
    private readonly boxes;
    protected charAt(index: number): string;
    protected onInput(event: Event, index: number): void;
    protected onKeydown(event: KeyboardEvent, index: number): void;
    protected onPaste(event: ClipboardEvent): void;
    protected onBlur(): void;
    private focusBox;
    private emit;
    writeValue(value: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CodeComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CodeComponent, "creamy-kit-code", never, { "length": { "alias": "length"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Componente de Calendar do Creamy Kit.
 *
 * Exibe um mês com navegação, seleção de dia e um rodapé informativo opcional.
 * Implementa `ControlValueAccessor` (valor = `Date`).
 *
 * Rodapé (`footerValue`):
 * - vazio (`''`) → rodapé oculto;
 * - `'auto'` → mostra a data selecionada formatada;
 * - qualquer outro texto → mostra o texto recebido.
 *
 * ```html
 * <creamy-kit-calendar
 *   footerLabel="Data selecionada"
 *   footerValue="auto"
 *   [(ngModel)]="data"
 * />
 * ```
 */
declare class CalendarComponent extends BaseValueAccessor<Date | null> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Título (negrito) do rodapé. Vazio = sem título. */
    readonly footerLabel: _angular_core.InputSignal<string>;
    /**
     * Valor do rodapé:
     * - `''` → rodapé oculto;
     * - `'auto'` → data selecionada formatada;
     * - outro texto → texto recebido.
     */
    readonly footerValue: _angular_core.InputSignal<string>;
    /**
     * Modo "liso": remove a borda e o raio próprios do calendário, para embuti-lo
     * em outro contêiner (ex.: DatePicker).
     * @default false
     */
    readonly bare: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Desabilita o calendário (sem navegação nem seleção). @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Locale BCP 47 usado para formatar nomes de meses e datas.
     * @default 'pt-BR'
     */
    readonly locale: _angular_core.InputSignal<string>;
    /** Emitido ao selecionar um dia. */
    readonly dateChange: _angular_core.OutputEmitterRef<Date>;
    /** Cabeçalhos dos dias da semana (Dom → Sáb). */
    protected readonly weekdays: string[];
    /** Data selecionada. */
    protected readonly selected: _angular_core.WritableSignal<Date | null>;
    /** Primeiro dia do mês exibido. */
    protected readonly view: _angular_core.WritableSignal<Date>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    /** Rótulo do mês exibido, ex.: "Fevereiro de 2026". */
    protected readonly monthLabel: _angular_core.Signal<string>;
    /** Células do grid: nulos de preenchimento + números dos dias. */
    protected readonly cells: _angular_core.Signal<(number | null)[]>;
    /** Rodapé deve ser exibido? */
    protected readonly footerVisible: _angular_core.Signal<boolean>;
    /** Texto do valor do rodapé. */
    protected readonly footerDisplay: _angular_core.Signal<string>;
    protected isSelected(day: number): boolean;
    protected prevMonth(): void;
    protected nextMonth(): void;
    protected selectDay(day: number): void;
    writeValue(value: Date | string | null): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CalendarComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CalendarComponent, "creamy-kit-calendar", never, { "footerLabel": { "alias": "footerLabel"; "required": false; "isSignal": true; }; "footerValue": { "alias": "footerValue"; "required": false; "isSignal": true; }; "bare": { "alias": "bare"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "locale": { "alias": "locale"; "required": false; "isSignal": true; }; }, { "dateChange": "dateChange"; }, never, never, true, never>;
}

/**
 * Componente de DatePicker do Creamy Kit.
 *
 * Diálogo de seleção de data que **consome o `kit-calendar`**, com cabeçalho
 * (título + descrição + fechar), texto informativo (rodapé do calendário) e
 * ações Confirmar/Cancelar (via `kit-button`).
 *
 * Implementa `ControlValueAccessor` (valor = `Date`). A data fica "pendente"
 * enquanto o usuário navega e é confirmada em `(confirm)`.
 *
 * ```html
 * <creamy-kit-date-picker
 *   title="Selecione a data"
 *   description="Description"
 *   infoText="Texto informativo sobre a escolha da data"
 *   [(ngModel)]="data"
 *   (confirm)="salvar($event)"
 *   (cancel)="fechar()"
 *   (closed)="fechar()" />
 * ```
 */
declare class DatePickerComponent extends BaseValueAccessor<Date | null> {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Título do cabeçalho. */
    readonly title: _angular_core.InputSignal<string>;
    /** Descrição (subtítulo) do cabeçalho. */
    readonly description: _angular_core.InputSignal<string>;
    /** Texto informativo exibido no rodapé do calendário. */
    readonly infoText: _angular_core.InputSignal<string>;
    /** Rótulo do botão de confirmação. */
    readonly confirmLabel: _angular_core.InputSignal<string>;
    /** Rótulo do botão de cancelamento. */
    readonly cancelLabel: _angular_core.InputSignal<string>;
    /** Desabilita o seletor (calendário e ações). @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Data selecionada (pendente até confirmar). */
    protected readonly selected: _angular_core.WritableSignal<Date | null>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    /** Emitido ao confirmar, com a data escolhida. */
    readonly confirm: _angular_core.OutputEmitterRef<Date | null>;
    /** Emitido ao cancelar. */
    readonly cancel: _angular_core.OutputEmitterRef<void>;
    /** Emitido ao fechar pelo X. */
    readonly closed: _angular_core.OutputEmitterRef<void>;
    protected onCalendarChange(date: Date | null): void;
    protected onConfirm(): void;
    protected onCancel(): void;
    protected onClose(): void;
    writeValue(value: Date | string | null): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DatePickerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<DatePickerComponent, "creamy-kit-date-picker", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "infoText": { "alias": "infoText"; "required": false; "isSignal": true; }; "confirmLabel": { "alias": "confirmLabel"; "required": false; "isSignal": true; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "confirm": "confirm"; "cancel": "cancel"; "closed": "closed"; }, never, never, true, never>;
}

/**
 * Item emitido ao clicar em uma parte do breadcrumb.
 */
interface BreadcrumbItemClick {
    /** Índice do item clicado. */
    index: number;
    /** Rótulo do item clicado. */
    label: string;
    /** Caminho acumulado até o item (segmentos unidos por "/"). */
    path: string;
}
/**
 * Componente de Breadcrumb do Creamy Kit.
 *
 * Sequência de textos clicáveis (Poppins 14px, Action/neutral/base) separados
 * por um chevron à direita. Recebe um `path` e o divide por "/".
 *
 * ```html
 * <creamy-kit-breadcrumb
 *   path="Início/Produtos/Tênis"
 *   (itemClick)="ir($event)"
 * />
 * ```
 */
declare class BreadcrumbComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /**
     * Caminho completo. Os segmentos são separados por "/".
     */
    readonly path: _angular_core.InputSignal<string>;
    /**
     * Emitido ao clicar em um segmento.
     */
    readonly itemClick: _angular_core.OutputEmitterRef<BreadcrumbItemClick>;
    /** Segmentos do caminho (ignora vazios de "/" no início/fim). */
    protected readonly items: _angular_core.Signal<string[]>;
    protected onItemClick(index: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BreadcrumbComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BreadcrumbComponent, "creamy-kit-breadcrumb", never, { "path": { "alias": "path"; "required": false; "isSignal": true; }; }, { "itemClick": "itemClick"; }, never, never, true, never>;
}

/**
 * Componente de Pagination do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
declare class PaginationComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<PaginationComponent, "creamy-kit-pagination", never, {}, {}, never, never, true, never>;
}

/**
 * Componente de Tabs do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
declare class TabsComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TabsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TabsComponent, "creamy-kit-tabs", never, {}, {}, never, never, true, never>;
}

/**
 * Item de TabBar.
 *
 * Ícone (24px) com label opcional abaixo (12px, cor action-neutral-base).
 * Use sempre dentro de `<creamy-kit-tab-bar>`.
 *
 * ```html
 * <creamy-kit-tab-bar [(ngModel)]="aba">
 *   <creamy-kit-tab-bar-item icon="home_base" label="Início" value="home" />
 *   <creamy-kit-tab-bar-item icon="user_base" label="Perfil" value="perfil" />
 * </creamy-kit-tab-bar>
 * ```
 */
declare class TabBarItemComponent {
    /** Nome do ícone (arquivo SVG no creamy-kit-resources/icons/). */
    readonly icon: _angular_core.InputSignal<string>;
    /** Label opcional exibido abaixo do ícone. */
    readonly label: _angular_core.InputSignal<string | undefined>;
    /** Valor identificador do item (para seleção). */
    readonly value: _angular_core.InputSignal<string>;
    /** Se este item está selecionado (gerenciado pelo TabBarComponent pai). */
    readonly selected: _angular_core.ModelSignal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TabBarItemComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TabBarItemComponent, "creamy-kit-tab-bar-item", never, { "icon": { "alias": "icon"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; "selected": { "alias": "selected"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; }, never, never, true, never>;
}

/**
 * Componente de TabBar do Creamy Kit.
 *
 * Uma barra de navegação com abas fixada na parte inferior.
 * Altura 74px, 100% de largura, com border-radius 24px no topo.
 * Fundo azul (action-primary-contrast).
 *
 * ```html
 * <creamy-kit-tab-bar [(ngModel)]="abaSelecionada">
 *   <creamy-kit-tab-bar-item icon="home_base" label="Home" value="home" />
 *   <creamy-kit-tab-bar-item icon="search_variant" label="Search" value="search" />
 *   <creamy-kit-tab-bar-item icon="settings_base" value="settings" />
 * </creamy-kit-tab-bar>
 * ```
 *
 * Implementa `ControlValueAccessor` (valor é `string`, o value do item).
 */
declare class TabBarComponent extends BaseValueAccessor<string | null> {
    /** Tab items filhos. */
    readonly items: _angular_core.Signal<readonly TabBarItemComponent[]>;
    /** Rótulo acessível do elemento nav. @default 'Navegação' */
    readonly ariaLabel: _angular_core.InputSignal<string>;
    /** Desabilita a barra inteira. @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Valor selecionado (value do TabBarItem). */
    protected value: _angular_core.WritableSignal<string | null>;
    /** Estado final de disabled (input OU formulário). */
    readonly isDisabled: _angular_core.Signal<boolean>;
    constructor();
    /** Seleciona um item. */
    select(item: TabBarItemComponent): void;
    writeValue(value: string | null): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TabBarComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TabBarComponent, "creamy-kit-tab-bar", never, { "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, ["items"], ["*"], true, never>;
}

/**
 * Tema do Header.
 *
 * - `brand` (padrão): fundo da marca (azul), conteúdo branco.
 * - `light`: fundo claro, conteúdo escuro.
 */
type HeaderTheme = 'brand' | 'light';
/**
 * Base abstrata compartilhada pelas variações de Header (tema + binding de
 * host). Não use diretamente — estenda nas variações. O tipo `HeaderTheme`
 * é público.
 */
declare abstract class HeaderBase {
    protected readonly themeService: ThemeService;
    /** Tema. @default 'brand' */
    readonly theme: _angular_core.InputSignal<HeaderTheme>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HeaderBase, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<HeaderBase, never, never, { "theme": { "alias": "theme"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Header de busca: barra de busca (`kit-search`) com microfone, precedida por
 * um botão de voltar ou um avatar.
 *
 * ```html
 * <creamy-kit-header-search placeholder="Buscar" avatarSrc="foto.jpg" />
 * ```
 */
declare class HeaderSearchComponent extends HeaderBase {
    /** Exibe o botão de voltar à esquerda. */
    readonly back: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Placeholder da busca. */
    readonly placeholder: _angular_core.InputSignal<string>;
    /** URL do avatar (exibido quando não há botão de voltar). */
    readonly avatarSrc: _angular_core.InputSignal<string>;
    /** Emitido ao clicar em voltar. */
    readonly backClick: _angular_core.OutputEmitterRef<void>;
    /** Emitido ao clicar no avatar. */
    readonly avatarClick: _angular_core.OutputEmitterRef<void>;
    /** Emitido ao clicar no microfone. */
    readonly micClick: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HeaderSearchComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HeaderSearchComponent, "creamy-kit-header-search", never, { "back": { "alias": "back"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "avatarSrc": { "alias": "avatarSrc"; "required": false; "isSignal": true; }; }, { "backClick": "backClick"; "avatarClick": "avatarClick"; "micClick": "micClick"; }, never, never, true, never>;
}

/**
 * Header com título em linha única, com botão de voltar opcional e ações à
 * direita (projetadas via `[actions]`).
 *
 * ```html
 * <creamy-kit-header-title title="Pedidos" back>
 *   <button actions>…</button>
 * </creamy-kit-header-title>
 * ```
 */
declare class HeaderTitleComponent extends HeaderBase {
    /** Exibe o botão de voltar à esquerda. */
    readonly back: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Título exibido. */
    readonly title: _angular_core.InputSignal<string>;
    /** Emitido ao clicar em voltar. */
    readonly backClick: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HeaderTitleComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HeaderTitleComponent, "creamy-kit-header-title", never, { "back": { "alias": "back"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; }, { "backClick": "backClick"; }, never, ["[actions]"], true, never>;
}

/**
 * Header com título grande: linha de topo (voltar + ações) e, abaixo, um
 * "small title" (overline) seguido do título grande.
 *
 * ```html
 * <creamy-kit-header-large-title subtitle="Olá," title="Luiz" back>
 *   <button actions>…</button>
 * </creamy-kit-header-large-title>
 * ```
 */
declare class HeaderLargeTitleComponent extends HeaderBase {
    /** Exibe o botão de voltar à esquerda. */
    readonly back: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Título grande. */
    readonly title: _angular_core.InputSignal<string>;
    /** "Small title" (overline) exibido acima do título grande. */
    readonly subtitle: _angular_core.InputSignal<string>;
    /** Emitido ao clicar em voltar. */
    readonly backClick: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HeaderLargeTitleComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HeaderLargeTitleComponent, "creamy-kit-header-large-title", never, { "back": { "alias": "back"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; }, { "backClick": "backClick"; }, never, ["[actions]"], true, never>;
}

/**
 * Header de perfil: avatar + nome e sub-texto, com ações à direita
 * (projetadas via `[actions]`).
 *
 * ```html
 * <creamy-kit-header-profile title="Luiz Marinelli" subtitle="Premium" avatarSrc="foto.jpg">
 *   <button actions>…</button>
 * </creamy-kit-header-profile>
 * ```
 */
declare class HeaderProfileComponent extends HeaderBase {
    /** Nome exibido. */
    readonly title: _angular_core.InputSignal<string>;
    /** Sub-texto exibido abaixo do nome. */
    readonly subtitle: _angular_core.InputSignal<string>;
    /** URL do avatar. */
    readonly avatarSrc: _angular_core.InputSignal<string>;
    /** Emitido ao clicar no avatar. */
    readonly avatarClick: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HeaderProfileComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HeaderProfileComponent, "creamy-kit-header-profile", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "avatarSrc": { "alias": "avatarSrc"; "required": false; "isSignal": true; }; }, { "avatarClick": "avatarClick"; }, never, ["[actions]"], true, never>;
}

/**
 * Semântica de cor (feedback) do Alert.
 *
 * - `information` (padrão): informação neutra.
 * - `success`: operação bem-sucedida.
 * - `error`: erro ou falha.
 */
type AlertFeedback = 'information' | 'success' | 'error';
/**
 * Componente de Alert do Creamy Kit.
 *
 * Caixa de aviso fixa, exibida inline no fluxo da página: ponto de cor +
 * bloco (título, corpo projetado e link) + botão de fechar.
 *
 * ```html
 * <creamy-kit-alert
 *   feedback="success"
 *   title="Tudo certo!"
 *   linkText="Ver detalhes"
 *   linkHref="/pedidos/123">
 *   Seu pedido foi confirmado.
 * </creamy-kit-alert>
 * ```
 */
declare class AlertComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Semântica de cor. @default 'information' */
    readonly feedback: _angular_core.InputSignal<AlertFeedback>;
    /** Título exibido em destaque no topo do bloco de conteúdo. */
    readonly title: _angular_core.InputSignal<string>;
    /** Texto do link de ação. Se vazio, usa o próprio `linkHref`. */
    readonly linkText: _angular_core.InputSignal<string>;
    /** Destino (href) do link. O link só é renderizado quando definido. */
    readonly linkHref: _angular_core.InputSignal<string>;
    /** Emitido quando o usuário fecha o alerta. */
    readonly closed: _angular_core.OutputEmitterRef<void>;
    protected readonly dismissed: _angular_core.WritableSignal<boolean>;
    protected dismiss(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AlertComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AlertComponent, "creamy-kit-alert", never, { "feedback": { "alias": "feedback"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "linkText": { "alias": "linkText"; "required": false; "isSignal": true; }; "linkHref": { "alias": "linkHref"; "required": false; "isSignal": true; }; }, { "closed": "closed"; }, never, ["*"], true, never>;
}

/**
 * Semântica de cor (feedback) do Snackbar.
 *
 * - `information` (padrão), `success`, `error`: cores de feedback.
 * - `warning`: fundo `--feedbacks-alert`, texto escuro.
 * - `black` / `white`: fundo sólido preto/branco.
 */
type SnackbarFeedback = 'information' | 'success' | 'error' | 'warning' | 'black' | 'white';
/**
 * Componente de Snackbar do Creamy Kit.
 *
 * Notificação compacta e flutuante (toast): ponto de cor + conteúdo
 * projetado. Normalmente temporária.
 *
 * ```html
 * <creamy-kit-snackbar feedback="error">Não foi possível salvar.</creamy-kit-snackbar>
 * ```
 */
declare class SnackbarComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Semântica de cor. @default 'information' */
    readonly feedback: _angular_core.InputSignal<SnackbarFeedback>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SnackbarComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SnackbarComponent, "creamy-kit-snackbar", never, { "feedback": { "alias": "feedback"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/**
 * Tamanho do ícone do Banner.
 *
 * - `small`: 16 px · `medium`: 24 px (padrão) · `large`: 32 px.
 */
type BannerSize = 'small' | 'medium' | 'large';
/**
 * Base abstrata com os inputs compartilhados pelas variações de Banner
 * (content, tag e card). Não use diretamente — estenda nas variações.
 * O tipo `BannerSize` é público.
 */
declare abstract class BannerBase {
    /** Tamanho do ícone. @default 'medium' */
    readonly size: _angular_core.InputSignal<BannerSize>;
    /** Título exibido em destaque. */
    readonly title: _angular_core.InputSignal<string>;
    /** Descrição exibida abaixo do título (10px). */
    readonly description: _angular_core.InputSignal<string>;
    /** Nome do ícone (em `creamy-kit-resources/icons`, sem extensão). */
    readonly iconName: _angular_core.InputSignal<string>;
    /** Token de cor do ícone, ex.: `--feedbacks-success-variant-2`. */
    readonly iconColor: _angular_core.InputSignal<string>;
    /** Estado desabilitado. @default false */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BannerBase, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<BannerBase, never, never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "iconName": { "alias": "iconName"; "required": false; "isSignal": true; }; "iconColor": { "alias": "iconColor"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

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
declare class BannerComponent extends BannerBase {
    private readonly themeService;
    constructor(themeService: ThemeService);
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BannerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BannerComponent, "creamy-kit-banner", never, {}, {}, never, never, true, never>;
}

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
declare class BannerTagComponent extends BannerBase {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Valor exibido à direita, no topo. */
    readonly tagValue: _angular_core.InputSignal<string>;
    /** Label exibida à direita, abaixo do valor. */
    readonly tagLabel: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BannerTagComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BannerTagComponent, "creamy-kit-banner-tag", never, { "tagValue": { "alias": "tagValue"; "required": false; "isSignal": true; }; "tagLabel": { "alias": "tagLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

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
declare class BannerCardComponent extends BannerBase {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Nome do ícone à direita (em `creamy-kit-resources/icons`, sem extensão). */
    readonly trailingIconName: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BannerCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BannerCardComponent, "creamy-kit-banner-card", never, { "trailingIconName": { "alias": "trailingIconName"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

type LoadingSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type LoadingVariant = 'primary' | 'neutral' | 'on-brand';
/**
 * Componente de Loading (Loader) do Creamy Kit.
 *
 * Um ícone central rodeado por um radial de 8 traços. A opacidade percorre os
 * traços como uma cauda de cometa — cada traço escurece quando a “cabeça” passa
 * e clareia logo atrás, dando a volta continuamente.
 *
 * ```html
 * <creamy-kit-loading />
 * <creamy-kit-loading icon="lock_base" size="large" variant="neutral" />
 * <creamy-kit-loading variant="on-brand" [showIcon]="false" />
 * ```
 *
 * Inputs:
 * - `icon` — nome do ícone central (arquivo SVG no `creamy-kit-resources/icons/`,
 *   sem extensão). Default: `'circle_variant'`.
 * - `size` — `'xsmall'` (16) | `'small'` (24) | `'medium'` (32) | `'large'` (64).
 *   Default: `'medium'`.
 * - `variant` — cor: `'primary'` (azul) | `'neutral'` (escuro) | `'on-brand'`
 *   (branco, para fundos coloridos). Default: `'primary'`.
 * - `showIcon` — exibe o ícone central. Default: `true`.
 * - `ariaLabel` — rótulo acessível. Default: `'Carregando'`.
 */
declare class LoadingComponent {
    readonly icon: _angular_core.InputSignal<string>;
    readonly size: _angular_core.InputSignal<LoadingSize>;
    readonly variant: _angular_core.InputSignal<LoadingVariant>;
    readonly showIcon: _angular_core.InputSignal<boolean>;
    readonly ariaLabel: _angular_core.InputSignal<string>;
    /** Tamanho (px) do ícone central conforme o `size`. */
    readonly iconPx: _angular_core.Signal<number>;
    /** Classes do host (`kit-loading` + modificadores de size/variant). */
    readonly hostClass: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<LoadingComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<LoadingComponent, "creamy-kit-loading", never, { "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "showIcon": { "alias": "showIcon"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Componente de Progress do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
declare class ProgressComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ProgressComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ProgressComponent, "creamy-kit-progress", never, {}, {}, never, never, true, never>;
}

type TooltipVariant = 'default' | 'contrast';
/**
 * Componente Tooltip do Creamy Kit.
 *
 * Um pequeno rótulo informativo com altura 44px, border-radius 50% (circular),
 * texto centralizado e suporte a ícone opcional.
 *
 * ```html
 * <creamy-kit-tooltip text="Copiar para área de transferência" />
 * <creamy-kit-tooltip text="Configurações" icon="settings_base" variant="contrast" />
 * ```
 *
 * Inputs:
 * - `text` — texto do tooltip. Obrigatório.
 * - `icon` — nome do ícone (SVG sem extensão, opcional).
 * - `variant` — `'default'` (fundo neutro) | `'contrast'` (fundo mais escuro).
 *   Default: `'default'`.
 */
declare class TooltipComponent {
    readonly text: _angular_core.InputSignal<string>;
    readonly icon: _angular_core.InputSignal<string | undefined>;
    readonly variant: _angular_core.InputSignal<TooltipVariant>;
    /** Classes do host (`kit-tooltip` + modificador de variante). */
    readonly hostClass: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TooltipComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TooltipComponent, "creamy-kit-tooltip", never, { "text": { "alias": "text"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Componente de Modal do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
declare class ModalComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ModalComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ModalComponent, "creamy-kit-modal", never, {}, {}, never, never, true, never>;
}

/**
 * Componente de Sheets (bottom sheet) do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
declare class SheetsComponent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SheetsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SheetsComponent, "creamy-kit-sheets", never, {}, {}, never, never, true, never>;
}

/**
 * Tamanhos disponíveis para os componentes de Avatar.
 *
 * - `small`: 24 × 24 px
 * - `medium`: 32 × 32 px (padrão)
 * - `large`: 48 × 48 px
 */
type AvatarSize = 'small' | 'medium' | 'large';
/**
 * Contraste de cor (fundo + conteúdo) do Avatar.
 *
 * - `dark` (padrão): fundo `--neutral-base`, conteúdo `--primary-contrast`.
 * - `light`: fundo `--primary-contrast`, conteúdo `--neutral-base`.
 * - `variant`: fundo `--primary-base`, conteúdo `--primary-contrast`.
 * - `on-brand`: fundo `--primary-contrast`, conteúdo `--primary-base`.
 */
type AvatarContrast = 'dark' | 'light' | 'variant' | 'on-brand';

/**
 * Avatar com ícone.
 *
 * ```html
 * <creamy-kit-avatar-icon name="user_base" contrast="dark" size="medium" />
 * ```
 */
declare class AvatarIconComponent {
    /** Nome do ícone (arquivo em `creamy-kit-resources/icons`, sem extensão). */
    readonly name: _angular_core.InputSignal<string>;
    /** Tamanho do avatar. @default 'medium' */
    readonly size: _angular_core.InputSignal<AvatarSize>;
    /** Contraste de cor. @default 'dark' */
    readonly contrast: _angular_core.InputSignal<AvatarContrast>;
    /** Anel de progresso (0–100). @default 0 */
    readonly percentage: _angular_core.InputSignal<number>;
    protected readonly iconPx: _angular_core.Signal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AvatarIconComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AvatarIconComponent, "creamy-kit-avatar-icon", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "contrast": { "alias": "contrast"; "required": false; "isSignal": true; }; "percentage": { "alias": "percentage"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Avatar com iniciais (texto).
 *
 * ```html
 * <creamy-kit-avatar-text text="LM" size="large" contrast="variant" />
 * ```
 */
declare class AvatarTextComponent {
    /** Iniciais exibidas (ex.: "LM"). */
    readonly text: _angular_core.InputSignal<string>;
    /** Tamanho do avatar. @default 'medium' */
    readonly size: _angular_core.InputSignal<AvatarSize>;
    /** Contraste de cor. @default 'dark' */
    readonly contrast: _angular_core.InputSignal<AvatarContrast>;
    /** Anel de progresso (0–100). @default 0 */
    readonly percentage: _angular_core.InputSignal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AvatarTextComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AvatarTextComponent, "creamy-kit-avatar-text", never, { "text": { "alias": "text"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "contrast": { "alias": "contrast"; "required": false; "isSignal": true; }; "percentage": { "alias": "percentage"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Avatar com imagem.
 *
 * ```html
 * <creamy-kit-avatar-image src="foto.jpg" alt="Luiz" size="large" />
 * ```
 */
declare class AvatarImageComponent {
    /** URL da imagem. */
    readonly src: _angular_core.InputSignal<string>;
    /** Texto alternativo acessível. */
    readonly alt: _angular_core.InputSignal<string>;
    /** Tamanho do avatar. @default 'medium' */
    readonly size: _angular_core.InputSignal<AvatarSize>;
    /** Contraste de cor (usado no anel de progresso). @default 'dark' */
    readonly contrast: _angular_core.InputSignal<AvatarContrast>;
    /** Anel de progresso (0–100). @default 0 */
    readonly percentage: _angular_core.InputSignal<number>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AvatarImageComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AvatarImageComponent, "creamy-kit-avatar-image", never, { "src": { "alias": "src"; "required": true; "isSignal": true; }; "alt": { "alias": "alt"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "contrast": { "alias": "contrast"; "required": false; "isSignal": true; }; "percentage": { "alias": "percentage"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Componente de Card do Creamy Kit.
 *
 * Contêiner de largura total com cantos arredondados e borda. O conteúdo é
 * projetado via `<ng-content>`.
 *
 * ```html
 * <creamy-kit-card>
 *   <!-- conteúdo -->
 * </creamy-kit-card>
 * ```
 */
declare class CardComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CardComponent, "creamy-kit-card", never, {}, {}, never, ["*"], true, never>;
}

/**
 * Componente de List do Creamy Kit.
 *
 * Contêiner vertical que empilha os itens projetados via `<ng-content>`,
 * separando-os com uma linha sutil.
 *
 * ```html
 * <creamy-kit-list>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </creamy-kit-list>
 * ```
 */
declare class ListComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ListComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ListComponent, "creamy-kit-list", never, {}, {}, never, ["*"], true, never>;
}

/**
 * Cor (semântica) da Tag.
 */
type TagColor = 'neutral' | 'primary' | 'success' | 'error' | 'alert';
/**
 * Componente de Tag do Creamy Kit.
 *
 * Pequena etiqueta (pill) com o conteúdo projetado via `<ng-content>`.
 *
 * ```html
 * <creamy-kit-tag color="success">Pago</creamy-kit-tag>
 * ```
 */
declare class TagComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Cor semântica. @default 'neutral' */
    readonly color: _angular_core.InputSignal<TagColor>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TagComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TagComponent, "creamy-kit-tag", never, { "color": { "alias": "color"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/**
 * Componente de Product Card do Creamy Kit.
 *
 * Cartão de produto que reutiliza `kit-image`, `kit-tag` e `kit-button`:
 * imagem no topo (com tag opcional), título, preço e botão de ação.
 *
 * ```html
 * <creamy-kit-product-card
 *   imagePath="tenis.jpg"
 *   title="Tênis Creamy"
 *   price="R$ 299,90"
 *   tagText="Novo"
 *   buttonText="Comprar"
 *   (action)="comprar()" />
 * ```
 */
declare class ProductCardComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** URL da imagem do produto. */
    readonly imagePath: _angular_core.InputSignal<string>;
    /** Título do produto. */
    readonly title: _angular_core.InputSignal<string>;
    /** Preço exibido. */
    readonly price: _angular_core.InputSignal<string>;
    /** Texto da tag (canto da imagem). Quando vazio, a tag não é exibida. */
    readonly tagText: _angular_core.InputSignal<string>;
    /** Cor da tag. @default 'primary' */
    readonly tagColor: _angular_core.InputSignal<TagColor>;
    /** Texto do botão. Quando vazio, o botão não é exibido. */
    readonly buttonText: _angular_core.InputSignal<string>;
    /** Emitido ao clicar no botão. */
    readonly action: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ProductCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ProductCardComponent, "creamy-kit-product-card", never, { "imagePath": { "alias": "imagePath"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "price": { "alias": "price"; "required": false; "isSignal": true; }; "tagText": { "alias": "tagText"; "required": false; "isSignal": true; }; "tagColor": { "alias": "tagColor"; "required": false; "isSignal": true; }; "buttonText": { "alias": "buttonText"; "required": false; "isSignal": true; }; }, { "action": "action"; }, never, never, true, never>;
}

/**
 * Componente de Shortcut (atalho) do Creamy Kit.
 *
 * Botão com um ícone em destaque e um rótulo abaixo. Reutiliza `kit-icon`.
 *
 * ```html
 * <creamy-kit-shortcut iconName="wallet_base" label="Carteira" (pressed)="abrir()" />
 * ```
 */
declare class ShortcutComponent {
    /** Nome do ícone (em `creamy-kit-resources/icons`, sem extensão). */
    readonly iconName: _angular_core.InputSignal<string>;
    /** Rótulo exibido abaixo do ícone. */
    readonly label: _angular_core.InputSignal<string>;
    /** Emitido ao clicar no atalho. */
    readonly pressed: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ShortcutComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ShortcutComponent, "creamy-kit-shortcut", never, { "iconName": { "alias": "iconName"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; }, { "pressed": "pressed"; }, never, never, true, never>;
}

type TextType = 'title' | 'subtitle' | 'section' | 'body' | 'label';
type TextColor = 'default' | 'on-brand' | 'variant';
type TitleSize = 'small' | 'default' | 'large';
type SectionSize = 'small' | 'default';
type BodySize = 'small' | 'default' | 'large';
type LabelSize = 'xxsmall' | 'xsmall' | 'small' | 'default' | 'large';
/**
 * Componente de Tipografia do Creamy Kit.
 *
 * Renderiza textos com estilos pré-definidos:
 * - **title**: 16px (small) / 24px (default) / 40px (large)
 * - **subtitle**: 36px fixo
 * - **section**: 16px (small) / 20px (default), weight 600
 * - **body**: 14px (small) / 16px (default) / 18px (large), com bold opcional (weight 500)
 * - **label**: 10px (xxsmall) / 11px (xsmall) / 14px (small) / 16px (default) / 20px (large),
 *   com bold, underline opcionals
 *
 * Cores:
 * - **default** (Title, Subtitle, Body): Text/heading
 * - **on-brand** (Title, Subtitle, Body, Label): Action/primary/contrast
 * - **variant** (Title, Subtitle, Body, Label): Action/primary/base
 * - Section: sem opção de cor variant
 *
 * ```html
 * <creamy-kit-text type="title" size="large" color="on-brand">Bem-vindo</creamy-kit-text>
 * <creamy-kit-text type="body" size="default" [bold]="true">Descrição em negrito</creamy-kit-text>
 * <creamy-kit-text type="label" size="small" [underline]="true">Label com underline</creamy-kit-text>
 * ```
 */
declare class TextComponent {
    /** Tipo de tipografia. */
    readonly type: _angular_core.InputSignal<TextType>;
    /** Cor: 'default' (Text/heading), 'on-brand' (Action/primary/contrast), 'variant' (Action/primary/base). */
    readonly color: _angular_core.InputSignal<TextColor>;
    /** Tamanho (depende do type). */
    readonly size: _angular_core.InputSignal<"small" | "default" | "large" | "xsmall" | "xxsmall">;
    /** Se true, weight 500 (para body e label). */
    readonly bold: _angular_core.InputSignal<boolean>;
    /** Se true, underline (para label). */
    readonly underline: _angular_core.InputSignal<boolean>;
    /** Classes CSS do host. */
    readonly hostClass: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TextComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TextComponent, "creamy-kit-text", never, { "type": { "alias": "type"; "required": true; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "bold": { "alias": "bold"; "required": false; "isSignal": true; }; "underline": { "alias": "underline"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/**
 * Componente de Text Link do Creamy Kit.
 *
 * Link de texto sublinhado, com o rótulo projetado via `<ng-content>`.
 *
 * ```html
 * <creamy-kit-text-link href="/termos">Termos de uso</creamy-kit-text-link>
 * ```
 */
declare class TextLinkComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /** Destino do link. */
    readonly href: _angular_core.InputSignal<string>;
    /** Alvo do link. @default '_self' */
    readonly target: _angular_core.InputSignal<"_self" | "_blank">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TextLinkComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TextLinkComponent, "creamy-kit-text-link", never, { "href": { "alias": "href"; "required": false; "isSignal": true; }; "target": { "alias": "target"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/**
 * Componente de Ícone do Creamy Kit.
 *
 * Renderiza um SVG do `creamy-kit-resources` como `mask-image`, pintado com
 * a cor passada via `color` (qualquer valor CSS, inclusive `var(--token)` ou
 * `currentColor`). O tamanho é em pixels.
 *
 * ```html
 * <creamy-kit-icon name="arrow_right" />
 * <creamy-kit-icon name="lock_base" [size]="32" color="var(--primary-base)" />
 * <creamy-kit-icon name="search_variant" [size]="16" color="#ed339c" />
 * ```
 *
 * Inputs:
 * - `name` — nome do arquivo SVG no `icons/`, sem extensão.
 * - `size` — largura/altura em px. Default `24`.
 * - `color` — qualquer valor CSS (token var, hex, rgb, `currentColor`).
 *   Default `currentColor` (herda do contexto).
 * - `ariaLabel` — opcional. Quando omitido, o `name` é usado.
 */
declare class IconComponent {
    /** Nome do arquivo SVG no `creamy-kit-resources/icons/`, sem `.svg`. */
    readonly name: _angular_core.InputSignal<string>;
    /** Tamanho do ícone (largura = altura), em pixels. */
    readonly size: _angular_core.InputSignal<number>;
    /** Cor do ícone. Aceita qualquer valor CSS. */
    readonly color: _angular_core.InputSignal<string>;
    /** Rótulo acessível opcional. Default = `name`. */
    readonly ariaLabel: _angular_core.InputSignal<string | undefined>;
    private readonly resources;
    /** URL `mask-image: url(...)` montada a partir do `name`. */
    readonly maskImageUrl: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<IconComponent, "creamy-kit-icon", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Tamanhos do Image.
 *
 * - `xxsmall`: 90×90, raio 24px
 * - `xsmall`: 140×140, raio 40px
 * - `small`: 321×256, raio 40px
 * - `medium`: 340×256, raio 40px (padrão)
 * - `large`: 355×256, raio 40px
 */
type ImageSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large';
/**
 * Componente de Image do Creamy Kit.
 *
 * Renderiza a imagem (`path`) no tamanho do `size` com o raio correto. Em caso
 * de erro de carregamento, exibe Background/base no lugar.
 *
 * ```html
 * <creamy-kit-image size="medium" path="foto.jpg" alt="Descrição" />
 * ```
 */
declare class ImageComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /**
     * Tamanho da imagem.
     * @default 'medium'
     */
    readonly size: _angular_core.InputSignal<ImageSize>;
    /** URL (path) da imagem. */
    readonly path: _angular_core.InputSignal<string>;
    /** Texto alternativo (opcional). */
    readonly alt: _angular_core.InputSignal<string>;
    /** Falhou ao carregar? */
    protected readonly errored: _angular_core.WritableSignal<boolean>;
    protected onError(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ImageComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ImageComponent, "creamy-kit-image", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "path": { "alias": "path"; "required": false; "isSignal": true; }; "alt": { "alias": "alt"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Componente de Brand do Creamy Kit.
 *
 * Exibe um logo do `creamy-kit-resources/brands` com a altura informada.
 *
 * ```html
 * <creamy-kit-brand name="creamy" [height]="32" />
 * ```
 */
declare class BrandComponent {
    /** Nome do arquivo do logo (em `brands/`, sem extensão). */
    readonly name: _angular_core.InputSignal<string>;
    /** Altura do logo em pixels. @default 24 */
    readonly height: _angular_core.InputSignal<number>;
    /** Texto alternativo. Default = `name`. */
    readonly alt: _angular_core.InputSignal<string>;
    /** Extensão do arquivo. @default 'svg' */
    readonly ext: _angular_core.InputSignal<string>;
    private readonly resources;
    protected readonly src: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandComponent, "creamy-kit-brand", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; "alt": { "alias": "alt"; "required": false; "isSignal": true; }; "ext": { "alias": "ext"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Tamanho do brand: `small` | `medium` (padrão) | `large`. */
type BrandSize = 'small' | 'medium' | 'large';

/**
 * Logo de marca no formato quadrado (1:1) do Creamy Kit.
 *
 * Carrega `{brand}_square_{size}.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-square brandName="creamy" size="large" />
 * ```
 */
declare class BrandSquareComponent {
    /** Nome da marca (arquivo em `brands/`, sem extensão). */
    readonly brandName: _angular_core.InputSignal<string>;
    /** Tamanho do logo. @default 'medium' */
    readonly size: _angular_core.InputSignal<BrandSize>;
    private readonly resources;
    /** URL final do SVG, derivada de `brandName` + `size`. */
    readonly brandUrl: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandSquareComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandSquareComponent, "creamy-brand-square", never, { "brandName": { "alias": "brandName"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Logo de marca no formato horizontal (logo + wordmark) do Creamy Kit.
 *
 * Carrega `{brand}_horizontal_{size}.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-horizontal brandName="creamy" size="medium" />
 * ```
 */
declare class BrandHorizontalComponent {
    /** Nome da marca (arquivo em `brands/`, sem extensão). */
    readonly brandName: _angular_core.InputSignal<string>;
    /** Tamanho do logo. @default 'medium' */
    readonly size: _angular_core.InputSignal<BrandSize>;
    private readonly resources;
    /** URL final do SVG, derivada de `brandName` + `size`. */
    readonly brandUrl: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandHorizontalComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandHorizontalComponent, "creamy-brand-horizontal", never, { "brandName": { "alias": "brandName"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Logo de marca no formato cardholder (selo para cartões) do Creamy Kit.
 *
 * Carrega `{brand}_cardholder.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-cardholder brandName="creamy" />
 * ```
 */
declare class BrandCardholderComponent {
    /** Nome da marca (arquivo em `brands/`, sem extensão). */
    readonly brandName: _angular_core.InputSignal<string>;
    private readonly resources;
    /** URL final do SVG, derivada de `brandName`. */
    readonly brandUrl: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandCardholderComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandCardholderComponent, "creamy-brand-cardholder", never, { "brandName": { "alias": "brandName"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Espessura do Divider.
 */
type DividerWeight = '2px' | '3px' | '4px';
/**
 * Cor do Divider.
 */
type DividerColor = 'border-soft' | 'border-medium' | 'border-strong' | 'primary' | 'error';
/**
 * Componente de Divider do Creamy Kit.
 *
 * Linha horizontal de separação. Recebe espessura e cor como parâmetros.
 *
 * ```html
 * <creamy-kit-divider />
 * <creamy-kit-divider weight="3px" color="primary" />
 * ```
 */
declare class DividerComponent {
    private readonly themeService;
    constructor(themeService: ThemeService);
    /**
     * Espessura da linha.
     * @default '2px'
     */
    readonly weight: _angular_core.InputSignal<DividerWeight>;
    /**
     * Cor da linha.
     *
     * - `border-soft` → `--border-soft`
     * - `border-medium` → `--border-medium` (padrão)
     * - `border-strong` → `--border-strong`
     * - `primary` → `--primary-base`
     * - `error` → `--feedbacks-error`
     *
     * @default 'border-medium'
     */
    readonly color: _angular_core.InputSignal<DividerColor>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DividerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<DividerComponent, "creamy-kit-divider", never, { "weight": { "alias": "weight"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { AlertComponent, AvatarIconComponent, AvatarImageComponent, AvatarTextComponent, BannerBase, BannerCardComponent, BannerComponent, BannerTagComponent, BaseValueAccessor, BrandCardholderComponent, BrandComponent, BrandHorizontalComponent, BrandSquareComponent, BreadcrumbComponent, ButtonComponent, CREAMY_KIT_RESOURCES, CREAMY_KIT_RESOURCES_DEFAULTS, CalendarComponent, CardComponent, CheckboxComponent, CodeComponent, DatePickerComponent, DividerComponent, DropdownComponent, FieldErrorIconComponent, HeaderBase, HeaderLargeTitleComponent, HeaderProfileComponent, HeaderSearchComponent, HeaderTitleComponent, IconComponent, ImageComponent, InputComponent, ListComponent, LoadingComponent, ModalComponent, MultiDropdownComponent, PaginationComponent, PasswordComponent, ProductCardComponent, ProgressComponent, RadioComponent, SearchComponent, SheetsComponent, ShortcutComponent, SnackbarComponent, SwitchComponent, TabBarComponent, TabBarItemComponent, TabsComponent, TagComponent, TextComponent, TextLinkComponent, TextboxComponent, TooltipComponent, provideCreamyKitResources };
export type { AlertFeedback, AvatarContrast, AvatarSize, BannerSize, BodySize, BreadcrumbItemClick, ButtonAppearance, ButtonContrast, CheckboxOption, CodeLength, CreamyKitResources, DividerColor, DividerWeight, DropdownOption, DropdownVariant, HeaderTheme, ImageSize, InputVariant, LabelSize, LoadingSize, LoadingVariant, MultiDropdownVariant, PasswordVariant, RadioOption, SearchVariant, SectionSize, SnackbarFeedback, TagColor, TextColor, TextType, TextboxVariant, TitleSize, TooltipVariant };
