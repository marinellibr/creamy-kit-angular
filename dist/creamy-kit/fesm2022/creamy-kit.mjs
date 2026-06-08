import * as i0 from '@angular/core';
import { InjectionToken, Injectable, input, ChangeDetectionStrategy, Component, signal, Directive, booleanAttribute, computed, forwardRef, numberAttribute, inject, ElementRef, HostListener, viewChildren, output, model, contentChildren, effect } from '@angular/core';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

const RESOURCES_BASE = 'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main';
/** Configuração padrão (GitHub raw do `creamy-kit-resources`). */
const CREAMY_KIT_RESOURCES_DEFAULTS = {
    iconsBaseUrl: `${RESOURCES_BASE}/icons`,
    brandsBaseUrl: `${RESOURCES_BASE}/brands`,
};
/**
 * Token de DI com a origem dos assets. Tem um default `providedIn: 'root'`,
 * então os componentes funcionam sem nenhuma configuração extra.
 */
const CREAMY_KIT_RESOURCES = new InjectionToken('CREAMY_KIT_RESOURCES', { providedIn: 'root', factory: () => CREAMY_KIT_RESOURCES_DEFAULTS });
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
function provideCreamyKitResources(config) {
    return {
        provide: CREAMY_KIT_RESOURCES,
        useValue: { ...CREAMY_KIT_RESOURCES_DEFAULTS, ...config },
    };
}

class ThemeService {
    static initialized = false;
    constructor() {
        this.injectTheme();
    }
    injectTheme() {
        if (ThemeService.initialized) {
            return;
        }
        if (document.getElementById('creamy-theme')) {
            ThemeService.initialized = true;
            return;
        }
        const style = document.createElement('style');
        style.id = 'creamy-theme';
        style.textContent = `
      :root {
        --primary-base: #128cfe;
        --primary-variant: #00bfff;
        --primary-contrast: #f9f9fa;

        --secondary-base: #ed339c;
        --secondary-variant: #022f5e;

        --background-base: #f9f9fa;
        --background-variant: #f2f2f4;
        --background-variant-2: #e8e8ea;
        --background-primary: #128cfe;
        --background-secondary: #00bfff;

        --white: #ffffff;
        --black: #000000;

        --neutral-base: #484848;
        --neutral-variant: #000000;

        --disabled-base: #d2d2d2;
        --disabled-variant: #7a7a7a;

        --feedbacks-information: #054d99;

        --feedbacks-success: #8ed1a0;
        --feedbacks-success-variant: #6eaa7f;
        --feedbacks-success-variant-2: #42704f;
        --feedbacks-success-contrast: #ffffff;

        --feedbacks-error: #da270f;
        --feedbacks-error-contrast: #ffffff;

        --feedbacks-alert: #fbd3af;
        --feedbacks-alert-variant: #f58122;
        --feedbacks-alert-variant-2: #ca5f08;
        --feedbacks-alert-contrast: #2b2b2b;

        --feedbacks-neutral: #a6a6a6;
        --feedbacks-neutral-contrast: #ffffff;

        --feedbacks-contrast: #f9f9fa;

        --text-heading: #2b2b2b;
        --text-heading-2: #484848;
        --text-body: #000000;
        --text-body-2: #7a7a7a;
        --text-highlight: #022f5e;
        --text-link: #054d99;

        --border-soft: #e8e8ea;
        --border-medium: #d2d2d2;
        --border-strong: #a6a6a6;
      }
    `;
        document.head.appendChild(style);
        ThemeService.initialized = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ThemeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

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
class ButtonComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /**
     * Define a aparência visual do botão.
     *
     * @default 'solid'
     *
     * Opções:
     * - `solid`: botão preenchido.
     * - `outline`: botão com borda e fundo transparente.
     */
    appearance = input('solid', ...(ngDevMode ? [{ debugName: "appearance" }] : /* istanbul ignore next */ []));
    /**
     * Define o contraste visual do botão.
     *
     * @default 'default'
     *
     * Opções:
     * - `default`: utiliza as cores padrão do tema.
     * - `on-brand`: otimizado para uso sobre superfícies da marca.
     */
    contrast = input('default', ...(ngDevMode ? [{ debugName: "contrast" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ButtonComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: ButtonComponent, isStandalone: true, selector: "creamy-kit-button", inputs: { appearance: { classPropertyName: "appearance", publicName: "appearance", isSignal: true, isRequired: false, transformFunction: null }, contrast: { classPropertyName: "contrast", publicName: "contrast", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-appearance": "appearance()", "attr.data-contrast": "contrast()" } }, ngImport: i0, template: "<button class=\"button\">\n  <ng-content />\n</button>\n", styles: [":host{display:inline-flex}.button{width:100%;height:48px;border-radius:18px;border:none;cursor:pointer;display:flex;justify-content:center;align-items:center;text-align:center}:host([data-appearance=solid]) .button{background:var(--primary-base);color:var(--primary-contrast)}:host([data-appearance=outline]) .button{background:transparent;border:1px solid var(--secondary-variant);color:var(--secondary-variant)}:host([data-contrast=on-brand][data-appearance=solid]) .button{background:var(--primary-contrast);color:var(--primary-base)}:host([data-contrast=on-brand][data-appearance=outline]) .button{border-color:var(--primary-contrast);color:var(--primary-contrast)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-button', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-appearance]': 'appearance()',
                        '[attr.data-contrast]': 'contrast()',
                    }, template: "<button class=\"button\">\n  <ng-content />\n</button>\n", styles: [":host{display:inline-flex}.button{width:100%;height:48px;border-radius:18px;border:none;cursor:pointer;display:flex;justify-content:center;align-items:center;text-align:center}:host([data-appearance=solid]) .button{background:var(--primary-base);color:var(--primary-contrast)}:host([data-appearance=outline]) .button{background:transparent;border:1px solid var(--secondary-variant);color:var(--secondary-variant)}:host([data-contrast=on-brand][data-appearance=solid]) .button{background:var(--primary-contrast);color:var(--primary-base)}:host([data-contrast=on-brand][data-appearance=outline]) .button{border-color:var(--primary-contrast);color:var(--primary-contrast)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { appearance: [{ type: i0.Input, args: [{ isSignal: true, alias: "appearance", required: false }] }], contrast: [{ type: i0.Input, args: [{ isSignal: true, alias: "contrast", required: false }] }] } });

/**
 * Classe abstrata que centraliza o boilerplate de `ControlValueAccessor`.
 *
 * Fornece `disabledByForm`, `onChange`, `onTouched` e as três implementações
 * padrão (`registerOnChange`, `registerOnTouched`, `setDisabledState`). Cada
 * subclasse precisa apenas implementar `writeValue`.
 */
class BaseValueAccessor {
    disabledByForm = signal(false, ...(ngDevMode ? [{ debugName: "disabledByForm" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabledByForm.set(isDisabled);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BaseValueAccessor, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.16", type: BaseValueAccessor, isStandalone: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BaseValueAccessor, decorators: [{
            type: Directive
        }] });

/**
 * Ícone de erro compartilhado pelos campos de formulário.
 * Renderiza um SVG de alerta (círculo com "!") com aria-hidden.
 */
class FieldErrorIconComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: FieldErrorIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: FieldErrorIconComponent, isStandalone: true, selector: "creamy-kit-field-error-icon", ngImport: i0, template: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M8 5v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="8" cy="11" r="0.9" fill="currentColor" />
    </svg>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: FieldErrorIconComponent, decorators: [{
            type: Component,
            args: [{
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
                }]
        }] });

let nextId$4 = 0;
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
class InputComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /** ID único para associar o label ao input via `for`/`id`. */
    uid = `kit-input-${nextId$4++}`;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    /**
     * Tipo do input nativo (text, password, email, …).
     * @default 'text'
     */
    type = input('text', ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    /**
     * Placeholder exibido quando vazio (enviado pelo consumidor).
     */
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    /**
     * Título opcional, exibido 4px acima do input.
     */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /**
     * Texto de ajuda opcional, exibido 4px abaixo do input.
     * Em estado de erro, aparece na cor de erro com um ícone.
     */
    helper = input('', ...(ngDevMode ? [{ debugName: "helper" }] : /* istanbul ignore next */ []));
    /**
     * Estado desabilitado. Pode vir por input ou via formulários
     * (`setDisabledState`).
     * @default false
     */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /**
     * Estado de erro. Quando `true`, a borda e o helper ficam na cor de erro.
     * @default false
     */
    error = input(false, { ...(ngDevMode ? { debugName: "error" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valor atual do campo. */
    value = signal('', ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    onInput(event) {
        const value = event.target.value;
        this.value.set(value);
        this.onChange(value);
    }
    onBlur() {
        this.onTouched();
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value ?? '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: InputComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: InputComponent, isStandalone: true, selector: "creamy-kit-input", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, helper: { classPropertyName: "helper", publicName: "helper", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-variant": "variant()", "attr.data-error": "error() ? '' : null", "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => InputComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"field\">\n  @if (title()) {\n    <label class=\"field__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"field__control\">\n    <input\n      class=\"field__input\"\n      [id]=\"uid\"\n      [type]=\"type()\"\n      [placeholder]=\"placeholder()\"\n      [value]=\"value()\"\n      [disabled]=\"isDisabled()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onBlur()\"\n    />\n    <span class=\"field__icon\" aria-hidden=\"true\">\n      <ng-content select=\"[icon]\" />\n    </span>\n  </div>\n\n  @if (helper()) {\n    <span class=\"field__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"field__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:4px;width:100%}.field__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.field__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.field__input{flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;font-weight:400;color:var(--text-body);padding:0}.field__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.field__input:disabled{cursor:not-allowed}.field__input:disabled::placeholder{color:var(--disabled-variant)}.field__icon{flex:0 0 auto;display:inline-flex;align-items:center;color:var(--disabled-base)}.field__icon ::ng-deep svg{display:block;width:24px;height:24px}.field__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.field__helper-icon{flex:0 0 auto}:host([data-error]) .field__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .field__helper{color:var(--feedbacks-error)}:host .field__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-disabled]) .field__control{background-color:var(--disabled-base)}\n"], dependencies: [{ kind: "component", type: FieldErrorIconComponent, selector: "creamy-kit-field-error-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-input', standalone: true, imports: [FieldErrorIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-variant]': 'variant()',
                        '[attr.data-error]': "error() ? '' : null",
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => InputComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"field\">\n  @if (title()) {\n    <label class=\"field__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"field__control\">\n    <input\n      class=\"field__input\"\n      [id]=\"uid\"\n      [type]=\"type()\"\n      [placeholder]=\"placeholder()\"\n      [value]=\"value()\"\n      [disabled]=\"isDisabled()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onBlur()\"\n    />\n    <span class=\"field__icon\" aria-hidden=\"true\">\n      <ng-content select=\"[icon]\" />\n    </span>\n  </div>\n\n  @if (helper()) {\n    <span class=\"field__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"field__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.field{display:flex;flex-direction:column;gap:4px;width:100%}.field__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.field__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.field__input{flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;font-weight:400;color:var(--text-body);padding:0}.field__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.field__input:disabled{cursor:not-allowed}.field__input:disabled::placeholder{color:var(--disabled-variant)}.field__icon{flex:0 0 auto;display:inline-flex;align-items:center;color:var(--disabled-base)}.field__icon ::ng-deep svg{display:block;width:24px;height:24px}.field__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.field__helper-icon{flex:0 0 auto}:host([data-error]) .field__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .field__helper{color:var(--feedbacks-error)}:host .field__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-disabled]) .field__control{background-color:var(--disabled-base)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], helper: [{ type: i0.Input, args: [{ isSignal: true, alias: "helper", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }] } });

let nextId$3 = 0;
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
class TextboxComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    uid = `kit-textbox-${nextId$3++}`;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    /**
     * Placeholder exibido quando vazio.
     */
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    /**
     * Título opcional, exibido 4px acima.
     */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /**
     * Texto de ajuda opcional, exibido 4px abaixo (à esquerda).
     */
    helper = input('', ...(ngDevMode ? [{ debugName: "helper" }] : /* istanbul ignore next */ []));
    /**
     * Número máximo de caracteres. Quando definido, limita o textarea e
     * exibe um contador `atual/máx` à direita do helper.
     */
    maxLength = input(null, { ...(ngDevMode ? { debugName: "maxLength" } : /* istanbul ignore next */ {}), transform: numberAttribute });
    /**
     * Estado desabilitado.
     * @default false
     */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /**
     * Estado de erro.
     * @default false
     */
    error = input(false, { ...(ngDevMode ? { debugName: "error" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valor atual. */
    value = signal('', ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Mostra o rodapé (helper e/ou contador). */
    hasFooter = computed(() => !!this.helper() || this.maxLength() != null, ...(ngDevMode ? [{ debugName: "hasFooter" }] : /* istanbul ignore next */ []));
    onInput(event) {
        const value = event.target.value;
        this.value.set(value);
        this.onChange(value);
    }
    onBlur() {
        this.onTouched();
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value ?? '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TextboxComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: TextboxComponent, isStandalone: true, selector: "creamy-kit-textbox", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, helper: { classPropertyName: "helper", publicName: "helper", isSignal: true, isRequired: false, transformFunction: null }, maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-variant": "variant()", "attr.data-error": "error() ? '' : null", "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => TextboxComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"textbox\">\n  @if (title()) {\n    <label class=\"textbox__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"textbox__control\">\n    <textarea\n      class=\"textbox__input\"\n      [id]=\"uid\"\n      [placeholder]=\"placeholder()\"\n      [value]=\"value()\"\n      [disabled]=\"isDisabled()\"\n      [attr.maxlength]=\"maxLength()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onBlur()\"\n    ></textarea>\n    <span class=\"textbox__icon\" aria-hidden=\"true\">\n      <ng-content select=\"[icon]\" />\n    </span>\n  </div>\n\n  @if (hasFooter()) {\n    <div class=\"textbox__footer\">\n      @if (helper()) {\n        <span class=\"textbox__helper\">\n          @if (error()) {\n            <creamy-kit-field-error-icon class=\"textbox__helper-icon\" />\n          }\n          {{ helper() }}\n        </span>\n      }\n\n      @if (maxLength() != null) {\n        <span class=\"textbox__counter\">{{ value().length }}/{{ maxLength() }}</span>\n      }\n    </div>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.textbox{display:flex;flex-direction:column;gap:4px;width:100%}.textbox__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.textbox__control{display:flex;align-items:flex-start;gap:8px;width:100%;box-sizing:border-box;min-height:80px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.textbox__input{flex:1 1 auto;min-width:0;min-height:56px;border:none;outline:none;background:transparent;resize:none;font-family:inherit;font-size:14px;font-weight:400;line-height:1.4;color:var(--text-body);padding:0}.textbox__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.textbox__input:disabled{cursor:not-allowed}.textbox__input:disabled::placeholder{color:var(--disabled-variant)}.textbox__icon{flex:0 0 auto;display:inline-flex;align-items:center;color:var(--disabled-base)}.textbox__icon ::ng-deep svg{display:block;width:24px;height:24px}.textbox__footer{display:flex;align-items:center;gap:8px}.textbox__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.textbox__helper-icon{flex:0 0 auto}.textbox__counter{margin-left:auto;flex:0 0 auto;font-size:11px;font-weight:400;color:var(--text-body-2)}:host([data-error]) .textbox__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .textbox__helper{color:var(--feedbacks-error)}:host .textbox__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-disabled]) .textbox__control{background-color:var(--disabled-base)}:host([data-variant=on-brand]) .textbox__title,:host([data-variant=on-brand]) .textbox__helper,:host([data-variant=on-brand]) .textbox__counter{color:var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__input,:host([data-variant=on-brand]) .textbox__icon{color:var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__input::placeholder{color:var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__control:focus-within{box-shadow:inset 0 0 0 2px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .textbox__control{box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .textbox__helper{color:var(--primary-contrast)}:host([data-variant=on-brand][data-disabled]) .textbox__control{background-color:transparent}:host([data-variant=on-brand][data-disabled]) .textbox__input:disabled::placeholder{color:var(--primary-contrast)}\n"], dependencies: [{ kind: "component", type: FieldErrorIconComponent, selector: "creamy-kit-field-error-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TextboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-textbox', standalone: true, imports: [FieldErrorIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-variant]': 'variant()',
                        '[attr.data-error]': "error() ? '' : null",
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TextboxComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"textbox\">\n  @if (title()) {\n    <label class=\"textbox__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"textbox__control\">\n    <textarea\n      class=\"textbox__input\"\n      [id]=\"uid\"\n      [placeholder]=\"placeholder()\"\n      [value]=\"value()\"\n      [disabled]=\"isDisabled()\"\n      [attr.maxlength]=\"maxLength()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onBlur()\"\n    ></textarea>\n    <span class=\"textbox__icon\" aria-hidden=\"true\">\n      <ng-content select=\"[icon]\" />\n    </span>\n  </div>\n\n  @if (hasFooter()) {\n    <div class=\"textbox__footer\">\n      @if (helper()) {\n        <span class=\"textbox__helper\">\n          @if (error()) {\n            <creamy-kit-field-error-icon class=\"textbox__helper-icon\" />\n          }\n          {{ helper() }}\n        </span>\n      }\n\n      @if (maxLength() != null) {\n        <span class=\"textbox__counter\">{{ value().length }}/{{ maxLength() }}</span>\n      }\n    </div>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.textbox{display:flex;flex-direction:column;gap:4px;width:100%}.textbox__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.textbox__control{display:flex;align-items:flex-start;gap:8px;width:100%;box-sizing:border-box;min-height:80px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.textbox__input{flex:1 1 auto;min-width:0;min-height:56px;border:none;outline:none;background:transparent;resize:none;font-family:inherit;font-size:14px;font-weight:400;line-height:1.4;color:var(--text-body);padding:0}.textbox__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.textbox__input:disabled{cursor:not-allowed}.textbox__input:disabled::placeholder{color:var(--disabled-variant)}.textbox__icon{flex:0 0 auto;display:inline-flex;align-items:center;color:var(--disabled-base)}.textbox__icon ::ng-deep svg{display:block;width:24px;height:24px}.textbox__footer{display:flex;align-items:center;gap:8px}.textbox__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.textbox__helper-icon{flex:0 0 auto}.textbox__counter{margin-left:auto;flex:0 0 auto;font-size:11px;font-weight:400;color:var(--text-body-2)}:host([data-error]) .textbox__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .textbox__helper{color:var(--feedbacks-error)}:host .textbox__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-disabled]) .textbox__control{background-color:var(--disabled-base)}:host([data-variant=on-brand]) .textbox__title,:host([data-variant=on-brand]) .textbox__helper,:host([data-variant=on-brand]) .textbox__counter{color:var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__input,:host([data-variant=on-brand]) .textbox__icon{color:var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__input::placeholder{color:var(--primary-contrast)}:host([data-variant=on-brand]) .textbox__control:focus-within{box-shadow:inset 0 0 0 2px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .textbox__control{box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .textbox__helper{color:var(--primary-contrast)}:host([data-variant=on-brand][data-disabled]) .textbox__control{background-color:transparent}:host([data-variant=on-brand][data-disabled]) .textbox__input:disabled::placeholder{color:var(--primary-contrast)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], helper: [{ type: i0.Input, args: [{ isSignal: true, alias: "helper", required: false }] }], maxLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLength", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }] } });

let nextId$2 = 0;
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
class PasswordComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    uid = `kit-password-${nextId$2++}`;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    /**
     * Placeholder exibido quando vazio.
     */
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    /**
     * Título opcional, exibido 4px acima.
     */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /**
     * Texto de ajuda opcional, exibido 4px abaixo.
     */
    helper = input('', ...(ngDevMode ? [{ debugName: "helper" }] : /* istanbul ignore next */ []));
    /**
     * Estado desabilitado.
     * @default false
     */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /**
     * Estado de erro.
     * @default false
     */
    error = input(false, { ...(ngDevMode ? { debugName: "error" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valor atual. */
    value = signal('', ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Senha visível (texto) ou mascarada (círculos)? */
    revealed = signal(false, ...(ngDevMode ? [{ debugName: "revealed" }] : /* istanbul ignore next */ []));
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    onInput(event) {
        const value = event.target.value;
        this.value.set(value);
        this.onChange(value);
    }
    onBlur() {
        this.onTouched();
    }
    toggleReveal() {
        this.revealed.update((v) => !v);
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value ?? '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: PasswordComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: PasswordComponent, isStandalone: true, selector: "creamy-kit-password", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, helper: { classPropertyName: "helper", publicName: "helper", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-variant": "variant()", "attr.data-revealed": "revealed() ? '' : null", "attr.data-error": "error() ? '' : null", "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => PasswordComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"password\">\n  @if (title()) {\n    <label class=\"password__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"password__control\">\n    <input\n      class=\"password__input\"\n      [id]=\"uid\"\n      [type]=\"revealed() ? 'text' : 'password'\"\n      [placeholder]=\"placeholder()\"\n      [value]=\"value()\"\n      [disabled]=\"isDisabled()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onBlur()\"\n    />\n\n    <button\n      type=\"button\"\n      class=\"password__toggle\"\n      [attr.aria-label]=\"revealed() ? 'Esconder senha' : 'Exibir senha'\"\n      [disabled]=\"isDisabled()\"\n      (mousedown)=\"$event.preventDefault()\"\n      (click)=\"toggleReveal()\"\n    >\n      @if (revealed()) {\n        <!-- olho cortado (esconder) -->\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <path d=\"M3 3l18 18\" />\n          <path d=\"M10.6 10.6a2 2 0 0 0 2.8 2.8\" />\n          <path d=\"M9.4 5.2A9.5 9.5 0 0 1 12 5c5 0 9 4.5 9 7a12 12 0 0 1-2.2 3\" />\n          <path d=\"M6.3 6.3A12 12 0 0 0 3 12c0 2.5 4 7 9 7a9.5 9.5 0 0 0 3.3-.6\" />\n        </svg>\n      } @else {\n        <!-- olho (exibir) -->\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <path d=\"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z\" />\n          <circle cx=\"12\" cy=\"12\" r=\"3\" />\n        </svg>\n      }\n    </button>\n  </div>\n\n  @if (helper()) {\n    <span class=\"password__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"password__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.password{display:flex;flex-direction:column;gap:4px;width:100%}.password__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.password__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.password__input{flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;font-weight:400;color:var(--text-body);padding:0}.password__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.password__input:disabled{cursor:not-allowed}.password__input:disabled::placeholder{color:var(--disabled-variant)}:host(:not([data-revealed])) .password__input{font-size:12px;color:var(--text-heading-2);letter-spacing:2px}.password__toggle{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:none;background:transparent;color:var(--disabled-base);cursor:pointer}.password__toggle:hover{color:var(--text-body)}.password__toggle:disabled{cursor:not-allowed}.password__toggle svg{display:block;width:24px;height:24px}.password__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.password__helper-icon{flex:0 0 auto}:host([data-error]) .password__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .password__helper{color:var(--feedbacks-error)}:host .password__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-disabled]) .password__control{background-color:var(--disabled-base)}:host([data-variant=on-brand]) .password__title,:host([data-variant=on-brand]) .password__helper{color:var(--primary-contrast)}:host([data-variant=on-brand]) .password__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .password__input,:host([data-variant=on-brand]) .password__toggle{color:var(--primary-contrast)}:host([data-variant=on-brand]) .password__input::placeholder{color:var(--primary-contrast)}:host([data-variant=on-brand]:not([data-revealed])) .password__input{color:var(--primary-contrast)}:host([data-variant=on-brand]) .password__control:focus-within{box-shadow:inset 0 0 0 2px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .password__control{box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .password__helper{color:var(--primary-contrast)}:host([data-variant=on-brand][data-disabled]) .password__control{background-color:transparent}:host([data-variant=on-brand][data-disabled]) .password__input:disabled::placeholder{color:var(--primary-contrast)}\n"], dependencies: [{ kind: "component", type: FieldErrorIconComponent, selector: "creamy-kit-field-error-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: PasswordComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-password', standalone: true, imports: [FieldErrorIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-variant]': 'variant()',
                        '[attr.data-revealed]': "revealed() ? '' : null",
                        '[attr.data-error]': "error() ? '' : null",
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => PasswordComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"password\">\n  @if (title()) {\n    <label class=\"password__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"password__control\">\n    <input\n      class=\"password__input\"\n      [id]=\"uid\"\n      [type]=\"revealed() ? 'text' : 'password'\"\n      [placeholder]=\"placeholder()\"\n      [value]=\"value()\"\n      [disabled]=\"isDisabled()\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onBlur()\"\n    />\n\n    <button\n      type=\"button\"\n      class=\"password__toggle\"\n      [attr.aria-label]=\"revealed() ? 'Esconder senha' : 'Exibir senha'\"\n      [disabled]=\"isDisabled()\"\n      (mousedown)=\"$event.preventDefault()\"\n      (click)=\"toggleReveal()\"\n    >\n      @if (revealed()) {\n        <!-- olho cortado (esconder) -->\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <path d=\"M3 3l18 18\" />\n          <path d=\"M10.6 10.6a2 2 0 0 0 2.8 2.8\" />\n          <path d=\"M9.4 5.2A9.5 9.5 0 0 1 12 5c5 0 9 4.5 9 7a12 12 0 0 1-2.2 3\" />\n          <path d=\"M6.3 6.3A12 12 0 0 0 3 12c0 2.5 4 7 9 7a9.5 9.5 0 0 0 3.3-.6\" />\n        </svg>\n      } @else {\n        <!-- olho (exibir) -->\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <path d=\"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z\" />\n          <circle cx=\"12\" cy=\"12\" r=\"3\" />\n        </svg>\n      }\n    </button>\n  </div>\n\n  @if (helper()) {\n    <span class=\"password__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"password__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.password{display:flex;flex-direction:column;gap:4px;width:100%}.password__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.password__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.password__input{flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;font-weight:400;color:var(--text-body);padding:0}.password__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.password__input:disabled{cursor:not-allowed}.password__input:disabled::placeholder{color:var(--disabled-variant)}:host(:not([data-revealed])) .password__input{font-size:12px;color:var(--text-heading-2);letter-spacing:2px}.password__toggle{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:none;background:transparent;color:var(--disabled-base);cursor:pointer}.password__toggle:hover{color:var(--text-body)}.password__toggle:disabled{cursor:not-allowed}.password__toggle svg{display:block;width:24px;height:24px}.password__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.password__helper-icon{flex:0 0 auto}:host([data-error]) .password__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .password__helper{color:var(--feedbacks-error)}:host .password__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-disabled]) .password__control{background-color:var(--disabled-base)}:host([data-variant=on-brand]) .password__title,:host([data-variant=on-brand]) .password__helper{color:var(--primary-contrast)}:host([data-variant=on-brand]) .password__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .password__input,:host([data-variant=on-brand]) .password__toggle{color:var(--primary-contrast)}:host([data-variant=on-brand]) .password__input::placeholder{color:var(--primary-contrast)}:host([data-variant=on-brand]:not([data-revealed])) .password__input{color:var(--primary-contrast)}:host([data-variant=on-brand]) .password__control:focus-within{box-shadow:inset 0 0 0 2px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .password__control{box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .password__helper{color:var(--primary-contrast)}:host([data-variant=on-brand][data-disabled]) .password__control{background-color:transparent}:host([data-variant=on-brand][data-disabled]) .password__input:disabled::placeholder{color:var(--primary-contrast)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], helper: [{ type: i0.Input, args: [{ isSignal: true, alias: "helper", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }] } });

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
class SearchComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /**
     * Variação de estilo.
     * @default 'default'
     */
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    /**
     * Placeholder exibido quando vazio.
     */
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    /**
     * Versão compacta: altura 40px e ícones 16px.
     * @default false
     */
    small = input(false, { ...(ngDevMode ? { debugName: "small" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Desabilita o campo. @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valor atual. */
    value = signal('', ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** O campo está focado? Controla a troca de ícones. */
    focused = signal(false, ...(ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    onInput(event) {
        const value = event.target.value;
        this.value.set(value);
        this.onChange(value);
    }
    onFocus() {
        this.focused.set(true);
    }
    onBlur() {
        this.focused.set(false);
        this.onTouched();
    }
    clear() {
        if (this.isDisabled())
            return;
        this.value.set('');
        this.onChange('');
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value ?? '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SearchComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: SearchComponent, isStandalone: true, selector: "creamy-kit-search", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, small: { classPropertyName: "small", publicName: "small", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-variant": "variant()", "attr.data-small": "small() ? '' : null", "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SearchComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"search__control\">\n  @if (!focused()) {\n    <span class=\"search__icon search__icon--left\" aria-hidden=\"true\">\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <circle cx=\"11\" cy=\"11\" r=\"7\" />\n        <path d=\"M21 21l-4.3-4.3\" />\n      </svg>\n    </span>\n  }\n\n  <input\n    class=\"search__input\"\n    type=\"text\"\n    [placeholder]=\"placeholder()\"\n    [value]=\"value()\"\n    [disabled]=\"isDisabled()\"\n    (input)=\"onInput($event)\"\n    (focus)=\"onFocus()\"\n    (blur)=\"onBlur()\"\n  />\n\n  @if (focused()) {\n    <button\n      type=\"button\"\n      class=\"search__clear\"\n      aria-label=\"Limpar\"\n      (mousedown)=\"$event.preventDefault()\"\n      (click)=\"clear()\"\n    >\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M6 6l12 12M18 6L6 18\" />\n      </svg>\n    </button>\n  } @else {\n    <span class=\"search__icon search__icon--right\" aria-hidden=\"true\">\n      <ng-content select=\"[iconRight]\" />\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host[data-disabled]{opacity:.5}:host[data-disabled] .search__control{cursor:not-allowed}.search__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.search__input{flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;font-weight:400;color:var(--text-body);padding:0}.search__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.search__icon{flex:0 0 auto;display:inline-flex;align-items:center;width:24px;height:24px;color:var(--disabled-base)}.search__icon svg{display:block;width:24px;height:24px}.search__icon ::ng-deep svg{display:block;width:24px;height:24px}.search__clear{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:none;background:transparent;color:var(--disabled-base);cursor:pointer}.search__clear:hover{color:var(--text-body)}.search__clear svg{display:block;width:24px;height:24px}:host .search__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-small]) .search__control{min-height:40px}:host([data-small]) .search__icon,:host([data-small]) .search__clear{width:16px;height:16px}:host([data-small]) .search__icon svg,:host([data-small]) .search__clear svg{width:16px;height:16px}:host([data-small]) .search__icon ::ng-deep svg,:host([data-small]) .search__clear ::ng-deep svg{width:16px;height:16px}:host([data-variant=on-brand]) .search__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .search__input,:host([data-variant=on-brand]) .search__icon,:host([data-variant=on-brand]) .search__clear{color:var(--primary-contrast)}:host([data-variant=on-brand]) .search__input::placeholder{color:var(--primary-contrast)}:host([data-variant=on-brand]) .search__control:focus-within{box-shadow:inset 0 0 0 2px var(--primary-contrast)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-search', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-variant]': 'variant()',
                        '[attr.data-small]': "small() ? '' : null",
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SearchComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"search__control\">\n  @if (!focused()) {\n    <span class=\"search__icon search__icon--left\" aria-hidden=\"true\">\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <circle cx=\"11\" cy=\"11\" r=\"7\" />\n        <path d=\"M21 21l-4.3-4.3\" />\n      </svg>\n    </span>\n  }\n\n  <input\n    class=\"search__input\"\n    type=\"text\"\n    [placeholder]=\"placeholder()\"\n    [value]=\"value()\"\n    [disabled]=\"isDisabled()\"\n    (input)=\"onInput($event)\"\n    (focus)=\"onFocus()\"\n    (blur)=\"onBlur()\"\n  />\n\n  @if (focused()) {\n    <button\n      type=\"button\"\n      class=\"search__clear\"\n      aria-label=\"Limpar\"\n      (mousedown)=\"$event.preventDefault()\"\n      (click)=\"clear()\"\n    >\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M6 6l12 12M18 6L6 18\" />\n      </svg>\n    </button>\n  } @else {\n    <span class=\"search__icon search__icon--right\" aria-hidden=\"true\">\n      <ng-content select=\"[iconRight]\" />\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host[data-disabled]{opacity:.5}:host[data-disabled] .search__control{cursor:not-allowed}.search__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border-radius:20px;box-shadow:inset 0 0 0 1px var(--border-medium)}.search__input{flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:inherit;font-size:14px;font-weight:400;color:var(--text-body);padding:0}.search__input::placeholder{color:var(--disabled-base);font-size:14px;font-weight:400}.search__icon{flex:0 0 auto;display:inline-flex;align-items:center;width:24px;height:24px;color:var(--disabled-base)}.search__icon svg{display:block;width:24px;height:24px}.search__icon ::ng-deep svg{display:block;width:24px;height:24px}.search__clear{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:none;background:transparent;color:var(--disabled-base);cursor:pointer}.search__clear:hover{color:var(--text-body)}.search__clear svg{display:block;width:24px;height:24px}:host .search__control:focus-within{box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-small]) .search__control{min-height:40px}:host([data-small]) .search__icon,:host([data-small]) .search__clear{width:16px;height:16px}:host([data-small]) .search__icon svg,:host([data-small]) .search__clear svg{width:16px;height:16px}:host([data-small]) .search__icon ::ng-deep svg,:host([data-small]) .search__clear ::ng-deep svg{width:16px;height:16px}:host([data-variant=on-brand]) .search__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .search__input,:host([data-variant=on-brand]) .search__icon,:host([data-variant=on-brand]) .search__clear{color:var(--primary-contrast)}:host([data-variant=on-brand]) .search__input::placeholder{color:var(--primary-contrast)}:host([data-variant=on-brand]) .search__control:focus-within{box-shadow:inset 0 0 0 2px var(--primary-contrast)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], small: [{ type: i0.Input, args: [{ isSignal: true, alias: "small", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

let nextId$1 = 0;
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
class DropdownComponent extends BaseValueAccessor {
    themeService;
    host = inject((ElementRef));
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    uid = `kit-dropdown-${nextId$1++}`;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    /**
     * Opções disponíveis.
     */
    options = input([], ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    /**
     * Placeholder exibido quando nada está selecionado.
     */
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    /**
     * Título opcional, exibido 4px acima.
     */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /**
     * Texto de ajuda opcional, exibido 4px abaixo.
     */
    helper = input('', ...(ngDevMode ? [{ debugName: "helper" }] : /* istanbul ignore next */ []));
    /**
     * Estado desabilitado.
     * @default false
     */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /**
     * Estado de erro.
     * @default false
     */
    error = input(false, { ...(ngDevMode ? { debugName: "error" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valor selecionado. */
    value = signal('', ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Menu aberto? */
    open = signal(false, ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Rótulo da opção selecionada (vazio se nenhuma). */
    selectedLabel = computed(() => this.options().find((o) => o.value === this.value())?.label ?? '', ...(ngDevMode ? [{ debugName: "selectedLabel" }] : /* istanbul ignore next */ []));
    toggle() {
        if (this.isDisabled()) {
            return;
        }
        this.open.update((v) => !v);
    }
    select(option) {
        this.value.set(option.value);
        this.onChange(option.value);
        this.open.set(false);
        this.onTouched();
    }
    /** Fecha ao clicar fora do componente. */
    onDocumentClick(event) {
        if (this.open() && !this.host.nativeElement.contains(event.target)) {
            this.open.set(false);
            this.onTouched();
        }
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value ?? '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: DropdownComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: DropdownComponent, isStandalone: true, selector: "creamy-kit-dropdown", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, helper: { classPropertyName: "helper", publicName: "helper", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "document:click": "onDocumentClick($event)" }, properties: { "attr.data-variant": "variant()", "attr.data-open": "open() ? '' : null", "attr.data-error": "error() ? '' : null", "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DropdownComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"dropdown\">\n  @if (title()) {\n    <label class=\"dropdown__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"dropdown__field\">\n    <button\n      type=\"button\"\n      class=\"dropdown__control\"\n      [id]=\"uid\"\n      [disabled]=\"isDisabled()\"\n      (click)=\"toggle()\"\n      aria-haspopup=\"listbox\"\n      [attr.aria-expanded]=\"open()\"\n    >\n      <span\n        class=\"dropdown__value\"\n        [class.dropdown__value--placeholder]=\"!selectedLabel()\"\n      >\n        {{ selectedLabel() || placeholder() }}\n      </span>\n      <span class=\"dropdown__chevron\" aria-hidden=\"true\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n          <path\n            d=\"M4 6l4 4 4-4\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </button>\n\n    @if (open()) {\n      <ul class=\"dropdown__menu\" role=\"listbox\">\n        @for (opt of options(); track opt.value) {\n          <li\n            class=\"dropdown__option\"\n            role=\"option\"\n            [attr.aria-selected]=\"opt.value === value()\"\n            [class.dropdown__option--selected]=\"opt.value === value()\"\n            (click)=\"select(opt)\"\n          >\n            {{ opt.label }}\n          </li>\n        }\n      </ul>\n    }\n  </div>\n\n  @if (helper()) {\n    <span class=\"dropdown__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"dropdown__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.dropdown{display:flex;flex-direction:column;gap:4px;width:100%}.dropdown__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.dropdown__field{position:relative;width:100%}.dropdown__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border:none;border-radius:20px;cursor:pointer;font-family:inherit;text-align:left;box-shadow:inset 0 0 0 1px var(--border-medium)}.dropdown__value{flex:1 1 auto;min-width:0;font-size:14px;font-weight:400;color:var(--text-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown__value--placeholder{color:var(--disabled-base)}.dropdown__chevron{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:var(--disabled-base);transition:transform .15s ease}.dropdown__chevron svg{width:16px;height:16px;display:block}.dropdown__menu{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:10;margin:0;padding:6px;list-style:none;background-color:var(--primary-contrast);border:1px solid var(--border-medium);border-radius:16px;box-shadow:0 8px 24px #0000001f;max-height:240px;overflow-y:auto}.dropdown__option{padding:10px 12px;border-radius:12px;font-size:14px;color:var(--text-body);cursor:pointer}.dropdown__option:hover{background-color:var(--background-variant)}.dropdown__option--selected{color:var(--primary-base);font-weight:500}.dropdown__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.dropdown__helper-icon{flex:0 0 auto}:host([data-error]) .dropdown__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .dropdown__helper{color:var(--feedbacks-error)}:host .dropdown__control:focus-visible,:host([data-open]) .dropdown__control{outline:none;box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-open]) .dropdown__chevron{transform:rotate(180deg)}:host([data-disabled]) .dropdown__control{background-color:var(--disabled-base);cursor:not-allowed}:host([data-disabled]) .dropdown__value--placeholder{color:var(--disabled-variant)}:host([data-variant=on-brand]) .dropdown__title,:host([data-variant=on-brand]) .dropdown__helper{color:var(--primary-contrast)}:host([data-variant=on-brand]) .dropdown__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .dropdown__value,:host([data-variant=on-brand]) .dropdown__value--placeholder,:host([data-variant=on-brand]) .dropdown__chevron{color:var(--primary-contrast)}:host([data-variant=on-brand]) .dropdown__control:focus-visible,:host([data-variant=on-brand][data-open]) .dropdown__control{box-shadow:inset 0 0 0 2px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .dropdown__control{box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .dropdown__helper{color:var(--primary-contrast)}:host([data-variant=on-brand][data-disabled]) .dropdown__control{background-color:transparent}:host([data-variant=on-brand][data-disabled]) .dropdown__value--placeholder{color:var(--primary-contrast)}\n"], dependencies: [{ kind: "component", type: FieldErrorIconComponent, selector: "creamy-kit-field-error-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: DropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-dropdown', standalone: true, imports: [FieldErrorIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-variant]': 'variant()',
                        '[attr.data-open]': "open() ? '' : null",
                        '[attr.data-error]': "error() ? '' : null",
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DropdownComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"dropdown\">\n  @if (title()) {\n    <label class=\"dropdown__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"dropdown__field\">\n    <button\n      type=\"button\"\n      class=\"dropdown__control\"\n      [id]=\"uid\"\n      [disabled]=\"isDisabled()\"\n      (click)=\"toggle()\"\n      aria-haspopup=\"listbox\"\n      [attr.aria-expanded]=\"open()\"\n    >\n      <span\n        class=\"dropdown__value\"\n        [class.dropdown__value--placeholder]=\"!selectedLabel()\"\n      >\n        {{ selectedLabel() || placeholder() }}\n      </span>\n      <span class=\"dropdown__chevron\" aria-hidden=\"true\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n          <path\n            d=\"M4 6l4 4 4-4\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </button>\n\n    @if (open()) {\n      <ul class=\"dropdown__menu\" role=\"listbox\">\n        @for (opt of options(); track opt.value) {\n          <li\n            class=\"dropdown__option\"\n            role=\"option\"\n            [attr.aria-selected]=\"opt.value === value()\"\n            [class.dropdown__option--selected]=\"opt.value === value()\"\n            (click)=\"select(opt)\"\n          >\n            {{ opt.label }}\n          </li>\n        }\n      </ul>\n    }\n  </div>\n\n  @if (helper()) {\n    <span class=\"dropdown__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"dropdown__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.dropdown{display:flex;flex-direction:column;gap:4px;width:100%}.dropdown__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.dropdown__field{position:relative;width:100%}.dropdown__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border:none;border-radius:20px;cursor:pointer;font-family:inherit;text-align:left;box-shadow:inset 0 0 0 1px var(--border-medium)}.dropdown__value{flex:1 1 auto;min-width:0;font-size:14px;font-weight:400;color:var(--text-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown__value--placeholder{color:var(--disabled-base)}.dropdown__chevron{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:var(--disabled-base);transition:transform .15s ease}.dropdown__chevron svg{width:16px;height:16px;display:block}.dropdown__menu{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:10;margin:0;padding:6px;list-style:none;background-color:var(--primary-contrast);border:1px solid var(--border-medium);border-radius:16px;box-shadow:0 8px 24px #0000001f;max-height:240px;overflow-y:auto}.dropdown__option{padding:10px 12px;border-radius:12px;font-size:14px;color:var(--text-body);cursor:pointer}.dropdown__option:hover{background-color:var(--background-variant)}.dropdown__option--selected{color:var(--primary-base);font-weight:500}.dropdown__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.dropdown__helper-icon{flex:0 0 auto}:host([data-error]) .dropdown__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .dropdown__helper{color:var(--feedbacks-error)}:host .dropdown__control:focus-visible,:host([data-open]) .dropdown__control{outline:none;box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-open]) .dropdown__chevron{transform:rotate(180deg)}:host([data-disabled]) .dropdown__control{background-color:var(--disabled-base);cursor:not-allowed}:host([data-disabled]) .dropdown__value--placeholder{color:var(--disabled-variant)}:host([data-variant=on-brand]) .dropdown__title,:host([data-variant=on-brand]) .dropdown__helper{color:var(--primary-contrast)}:host([data-variant=on-brand]) .dropdown__control{background-color:transparent;box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand]) .dropdown__value,:host([data-variant=on-brand]) .dropdown__value--placeholder,:host([data-variant=on-brand]) .dropdown__chevron{color:var(--primary-contrast)}:host([data-variant=on-brand]) .dropdown__control:focus-visible,:host([data-variant=on-brand][data-open]) .dropdown__control{box-shadow:inset 0 0 0 2px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .dropdown__control{box-shadow:inset 0 0 0 1px var(--primary-contrast)}:host([data-variant=on-brand][data-error]) .dropdown__helper{color:var(--primary-contrast)}:host([data-variant=on-brand][data-disabled]) .dropdown__control{background-color:transparent}:host([data-variant=on-brand][data-disabled]) .dropdown__value--placeholder{color:var(--primary-contrast)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], helper: [{ type: i0.Input, args: [{ isSignal: true, alias: "helper", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

let nextId = 0;
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
class MultiDropdownComponent extends BaseValueAccessor {
    themeService;
    host = inject((ElementRef));
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    uid = `kit-multidropdown-${nextId++}`;
    /**
     * Variação de estilo.
     * @default 'default'
     */
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    /**
     * Opções disponíveis.
     */
    options = input([], ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    /**
     * Placeholder exibido quando nada está selecionado.
     */
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    /**
     * Título opcional, exibido 4px acima.
     */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /**
     * Texto de ajuda opcional, exibido 4px abaixo.
     */
    helper = input('', ...(ngDevMode ? [{ debugName: "helper" }] : /* istanbul ignore next */ []));
    /**
     * Estado desabilitado.
     * @default false
     */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /**
     * Estado de erro.
     * @default false
     */
    error = input(false, { ...(ngDevMode ? { debugName: "error" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valores selecionados. */
    value = signal([], ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Menu aberto? */
    open = signal(false, ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Rótulos das opções selecionadas, juntos (vazio se nenhuma). */
    selectedLabels = computed(() => {
        const selected = this.value();
        return this.options()
            .filter((o) => selected.includes(o.value))
            .map((o) => o.label)
            .join(', ');
    }, ...(ngDevMode ? [{ debugName: "selectedLabels" }] : /* istanbul ignore next */ []));
    isSelected(option) {
        return this.value().includes(option.value);
    }
    toggleMenu() {
        if (this.isDisabled()) {
            return;
        }
        this.open.update((v) => !v);
    }
    /** Alterna a opção sem fechar o menu (múltipla escolha). */
    toggleOption(option) {
        const current = this.value();
        const next = current.includes(option.value)
            ? current.filter((v) => v !== option.value)
            : [...current, option.value];
        this.value.set(next);
        this.onChange(next);
    }
    onDocumentClick(event) {
        if (this.open() && !this.host.nativeElement.contains(event.target)) {
            this.open.set(false);
            this.onTouched();
        }
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(Array.isArray(value) ? value : []);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: MultiDropdownComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: MultiDropdownComponent, isStandalone: true, selector: "creamy-kit-multidropdown", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, helper: { classPropertyName: "helper", publicName: "helper", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "document:click": "onDocumentClick($event)" }, properties: { "attr.data-variant": "variant()", "attr.data-open": "open() ? '' : null", "attr.data-error": "error() ? '' : null", "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MultiDropdownComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"multidropdown\">\n  @if (title()) {\n    <label class=\"multidropdown__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"multidropdown__field\">\n    <button\n      type=\"button\"\n      class=\"multidropdown__control\"\n      [id]=\"uid\"\n      [disabled]=\"isDisabled()\"\n      (click)=\"toggleMenu()\"\n      aria-haspopup=\"listbox\"\n      [attr.aria-expanded]=\"open()\"\n    >\n      <span\n        class=\"multidropdown__value\"\n        [class.multidropdown__value--placeholder]=\"!selectedLabels()\"\n      >\n        {{ selectedLabels() || placeholder() }}\n      </span>\n      <span class=\"multidropdown__chevron\" aria-hidden=\"true\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n          <path\n            d=\"M4 6l4 4 4-4\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </button>\n\n    @if (open()) {\n      <ul class=\"multidropdown__menu\" role=\"listbox\" aria-multiselectable=\"true\">\n        @for (opt of options(); track opt.value) {\n          <li\n            class=\"multidropdown__option\"\n            role=\"option\"\n            [attr.aria-selected]=\"isSelected(opt)\"\n            [class.multidropdown__option--selected]=\"isSelected(opt)\"\n            (click)=\"toggleOption(opt)\"\n          >\n            <span class=\"multidropdown__check\" aria-hidden=\"true\"></span>\n            <span class=\"multidropdown__label\">{{ opt.label }}</span>\n          </li>\n        }\n      </ul>\n    }\n  </div>\n\n  @if (helper()) {\n    <span class=\"multidropdown__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"multidropdown__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.multidropdown{display:flex;flex-direction:column;gap:4px;width:100%}.multidropdown__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.multidropdown__field{position:relative;width:100%}.multidropdown__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border:none;border-radius:20px;cursor:pointer;font-family:inherit;text-align:left;box-shadow:inset 0 0 0 1px var(--border-medium)}.multidropdown__value{flex:1 1 auto;min-width:0;font-size:14px;font-weight:400;color:var(--text-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.multidropdown__value--placeholder{color:var(--disabled-base)}.multidropdown__chevron{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:var(--disabled-base);transition:transform .15s ease}.multidropdown__chevron svg{width:16px;height:16px;display:block}.multidropdown__menu{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:10;margin:0;padding:6px;list-style:none;background-color:var(--primary-contrast);border:1px solid var(--border-medium);border-radius:16px;box-shadow:0 8px 24px #0000001f;max-height:240px;overflow-y:auto}.multidropdown__option{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;font-size:14px;color:var(--text-body);cursor:pointer}.multidropdown__option:hover{background-color:var(--background-variant)}.multidropdown__check{flex:0 0 auto;width:18px;height:18px;border-radius:4px;background-color:var(--neutral-base);transition:background-color .12s ease}.multidropdown__option--selected .multidropdown__check{background-color:var(--primary-base)}.multidropdown__label{flex:1 1 auto;min-width:0}.multidropdown__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.multidropdown__helper-icon{flex:0 0 auto}:host([data-error]) .multidropdown__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .multidropdown__helper{color:var(--feedbacks-error)}:host .multidropdown__control:focus-visible,:host([data-open]) .multidropdown__control{outline:none;box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-open]) .multidropdown__chevron{transform:rotate(180deg)}:host([data-disabled]) .multidropdown__control{background-color:var(--disabled-base);cursor:not-allowed}:host([data-disabled]) .multidropdown__value--placeholder{color:var(--disabled-variant)}\n"], dependencies: [{ kind: "component", type: FieldErrorIconComponent, selector: "creamy-kit-field-error-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: MultiDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-multidropdown', standalone: true, imports: [FieldErrorIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-variant]': 'variant()',
                        '[attr.data-open]': "open() ? '' : null",
                        '[attr.data-error]': "error() ? '' : null",
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MultiDropdownComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"multidropdown\">\n  @if (title()) {\n    <label class=\"multidropdown__title\" [for]=\"uid\">{{ title() }}</label>\n  }\n\n  <div class=\"multidropdown__field\">\n    <button\n      type=\"button\"\n      class=\"multidropdown__control\"\n      [id]=\"uid\"\n      [disabled]=\"isDisabled()\"\n      (click)=\"toggleMenu()\"\n      aria-haspopup=\"listbox\"\n      [attr.aria-expanded]=\"open()\"\n    >\n      <span\n        class=\"multidropdown__value\"\n        [class.multidropdown__value--placeholder]=\"!selectedLabels()\"\n      >\n        {{ selectedLabels() || placeholder() }}\n      </span>\n      <span class=\"multidropdown__chevron\" aria-hidden=\"true\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n          <path\n            d=\"M4 6l4 4 4-4\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </button>\n\n    @if (open()) {\n      <ul class=\"multidropdown__menu\" role=\"listbox\" aria-multiselectable=\"true\">\n        @for (opt of options(); track opt.value) {\n          <li\n            class=\"multidropdown__option\"\n            role=\"option\"\n            [attr.aria-selected]=\"isSelected(opt)\"\n            [class.multidropdown__option--selected]=\"isSelected(opt)\"\n            (click)=\"toggleOption(opt)\"\n          >\n            <span class=\"multidropdown__check\" aria-hidden=\"true\"></span>\n            <span class=\"multidropdown__label\">{{ opt.label }}</span>\n          </li>\n        }\n      </ul>\n    }\n  </div>\n\n  @if (helper()) {\n    <span class=\"multidropdown__helper\">\n      @if (error()) {\n        <creamy-kit-field-error-icon class=\"multidropdown__helper-icon\" />\n      }\n      {{ helper() }}\n    </span>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.multidropdown{display:flex;flex-direction:column;gap:4px;width:100%}.multidropdown__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.multidropdown__field{position:relative;width:100%}.multidropdown__control{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;min-height:48px;padding:12px;background-color:var(--primary-contrast);border:none;border-radius:20px;cursor:pointer;font-family:inherit;text-align:left;box-shadow:inset 0 0 0 1px var(--border-medium)}.multidropdown__value{flex:1 1 auto;min-width:0;font-size:14px;font-weight:400;color:var(--text-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.multidropdown__value--placeholder{color:var(--disabled-base)}.multidropdown__chevron{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;color:var(--disabled-base);transition:transform .15s ease}.multidropdown__chevron svg{width:16px;height:16px;display:block}.multidropdown__menu{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:10;margin:0;padding:6px;list-style:none;background-color:var(--primary-contrast);border:1px solid var(--border-medium);border-radius:16px;box-shadow:0 8px 24px #0000001f;max-height:240px;overflow-y:auto}.multidropdown__option{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;font-size:14px;color:var(--text-body);cursor:pointer}.multidropdown__option:hover{background-color:var(--background-variant)}.multidropdown__check{flex:0 0 auto;width:18px;height:18px;border-radius:4px;background-color:var(--neutral-base);transition:background-color .12s ease}.multidropdown__option--selected .multidropdown__check{background-color:var(--primary-base)}.multidropdown__label{flex:1 1 auto;min-width:0}.multidropdown__helper{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:400;color:var(--text-heading-2)}.multidropdown__helper-icon{flex:0 0 auto}:host([data-error]) .multidropdown__control{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host([data-error]) .multidropdown__helper{color:var(--feedbacks-error)}:host .multidropdown__control:focus-visible,:host([data-open]) .multidropdown__control{outline:none;box-shadow:inset 0 0 0 2px var(--background-primary)}:host([data-open]) .multidropdown__chevron{transform:rotate(180deg)}:host([data-disabled]) .multidropdown__control{background-color:var(--disabled-base);cursor:not-allowed}:host([data-disabled]) .multidropdown__value--placeholder{color:var(--disabled-variant)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], helper: [{ type: i0.Input, args: [{ isSignal: true, alias: "helper", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

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
class DividerComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /**
     * Espessura da linha.
     * @default '2px'
     */
    weight = input('2px', ...(ngDevMode ? [{ debugName: "weight" }] : /* istanbul ignore next */ []));
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
    color = input('border-medium', ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: DividerComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: DividerComponent, isStandalone: true, selector: "creamy-kit-divider", inputs: { weight: { classPropertyName: "weight", publicName: "weight", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-weight": "weight()", "attr.data-color": "color()" } }, ngImport: i0, template: "<hr class=\"divider\" aria-hidden=\"true\" />\n", styles: [":host{display:block;width:100%}.divider{width:100%;box-sizing:border-box;border:none;border-top-style:solid;border-top-width:var(--kit-divider-weight, 2px);border-top-color:var(--kit-divider-color, var(--border-medium));margin:0}:host([data-weight=\"2px\"]){--kit-divider-weight: 2px}:host([data-weight=\"3px\"]){--kit-divider-weight: 3px}:host([data-weight=\"4px\"]){--kit-divider-weight: 4px}:host([data-color=border-soft]){--kit-divider-color: var(--border-soft)}:host([data-color=border-medium]){--kit-divider-color: var(--border-medium)}:host([data-color=border-strong]){--kit-divider-color: var(--border-strong)}:host([data-color=primary]){--kit-divider-color: var(--primary-base)}:host([data-color=error]){--kit-divider-color: var(--feedbacks-error)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: DividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-divider', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-weight]': 'weight()',
                        '[attr.data-color]': 'color()',
                    }, template: "<hr class=\"divider\" aria-hidden=\"true\" />\n", styles: [":host{display:block;width:100%}.divider{width:100%;box-sizing:border-box;border:none;border-top-style:solid;border-top-width:var(--kit-divider-weight, 2px);border-top-color:var(--kit-divider-color, var(--border-medium));margin:0}:host([data-weight=\"2px\"]){--kit-divider-weight: 2px}:host([data-weight=\"3px\"]){--kit-divider-weight: 3px}:host([data-weight=\"4px\"]){--kit-divider-weight: 4px}:host([data-color=border-soft]){--kit-divider-color: var(--border-soft)}:host([data-color=border-medium]){--kit-divider-color: var(--border-medium)}:host([data-color=border-strong]){--kit-divider-color: var(--border-strong)}:host([data-color=primary]){--kit-divider-color: var(--primary-base)}:host([data-color=error]){--kit-divider-color: var(--feedbacks-error)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { weight: [{ type: i0.Input, args: [{ isSignal: true, alias: "weight", required: false }] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }] } });

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
class CheckboxComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /** Opções exibidas. */
    options = input([], ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    /**
     * Exibe o divider abaixo de cada opção.
     * @default true
     */
    divider = input(true, { ...(ngDevMode ? { debugName: "divider" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Desabilita o grupo inteiro. @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Values marcados. */
    value = signal([], ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    isSelected(option) {
        return this.value().includes(option.value);
    }
    toggle(option) {
        if (this.isDisabled())
            return;
        const current = this.value();
        const next = current.includes(option.value)
            ? current.filter((v) => v !== option.value)
            : [...current, option.value];
        this.value.set(next);
        this.onChange(next);
        this.onTouched();
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(Array.isArray(value) ? value : []);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CheckboxComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: CheckboxComponent, isStandalone: true, selector: "creamy-kit-checkbox", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, divider: { classPropertyName: "divider", publicName: "divider", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CheckboxComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "@for (opt of options(); track opt.value) {\n  <button\n    type=\"button\"\n    class=\"checkbox__row\"\n    role=\"checkbox\"\n    [attr.aria-checked]=\"isSelected(opt)\"\n    [attr.aria-disabled]=\"isDisabled()\"\n    [disabled]=\"isDisabled()\"\n    (click)=\"toggle(opt)\"\n  >\n    <span\n      class=\"checkbox__box\"\n      [class.checkbox__box--checked]=\"isSelected(opt)\"\n      aria-hidden=\"true\"\n    ></span>\n    <span class=\"checkbox__label\">{{ opt.label }}</span>\n  </button>\n\n  @if (divider()) {\n    <creamy-kit-divider weight=\"2px\" color=\"border-medium\" />\n  }\n}\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.checkbox__row{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:8px 0;border:none;background:transparent;cursor:pointer;text-align:left;font-family:inherit}.checkbox__row:disabled{opacity:.5;cursor:not-allowed}.checkbox__box{flex:0 0 auto;width:18px;height:18px;border-radius:4px;background-color:var(--neutral-base);transition:background-color .12s ease}.checkbox__box--checked{background-color:var(--primary-base)}.checkbox__label{flex:1 1 auto;min-width:0;font-size:14px;color:var(--text-body)}\n"], dependencies: [{ kind: "component", type: DividerComponent, selector: "creamy-kit-divider", inputs: ["weight", "color"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-checkbox', standalone: true, imports: [DividerComponent], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CheckboxComponent),
                            multi: true,
                        },
                    ], template: "@for (opt of options(); track opt.value) {\n  <button\n    type=\"button\"\n    class=\"checkbox__row\"\n    role=\"checkbox\"\n    [attr.aria-checked]=\"isSelected(opt)\"\n    [attr.aria-disabled]=\"isDisabled()\"\n    [disabled]=\"isDisabled()\"\n    (click)=\"toggle(opt)\"\n  >\n    <span\n      class=\"checkbox__box\"\n      [class.checkbox__box--checked]=\"isSelected(opt)\"\n      aria-hidden=\"true\"\n    ></span>\n    <span class=\"checkbox__label\">{{ opt.label }}</span>\n  </button>\n\n  @if (divider()) {\n    <creamy-kit-divider weight=\"2px\" color=\"border-medium\" />\n  }\n}\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.checkbox__row{display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:8px 0;border:none;background:transparent;cursor:pointer;text-align:left;font-family:inherit}.checkbox__row:disabled{opacity:.5;cursor:not-allowed}.checkbox__box{flex:0 0 auto;width:18px;height:18px;border-radius:4px;background-color:var(--neutral-base);transition:background-color .12s ease}.checkbox__box--checked{background-color:var(--primary-base)}.checkbox__label{flex:1 1 auto;min-width:0;font-size:14px;color:var(--text-body)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], divider: [{ type: i0.Input, args: [{ isSignal: true, alias: "divider", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

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
class IconComponent {
    /** Nome do arquivo SVG no `creamy-kit-resources/icons/`, sem `.svg`. */
    name = input.required(...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    /** Tamanho do ícone (largura = altura), em pixels. */
    size = input(24, ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** Cor do ícone. Aceita qualquer valor CSS. */
    color = input('currentColor', ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    /** Rótulo acessível opcional. Default = `name`. */
    ariaLabel = input(undefined, ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    resources = inject(CREAMY_KIT_RESOURCES);
    /** URL `mask-image: url(...)` montada a partir do `name`. */
    maskImageUrl = computed(() => `url("${this.resources.iconsBaseUrl}/${this.name()}.svg")`, ...(ngDevMode ? [{ debugName: "maskImageUrl" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: IconComponent, isStandalone: true, selector: "creamy-kit-icon", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <span
      class="kit-icon__mask"
      role="img"
      [attr.aria-label]="ariaLabel() ?? name()"
      [style.background-color]="color()"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.mask-image]="maskImageUrl()"
      [style.-webkit-mask-image]="maskImageUrl()"
    ></span>
  `, isInline: true, styles: ["@charset \"UTF-8\";:host{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;line-height:0;vertical-align:middle}.kit-icon__mask{display:inline-block;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-icon', standalone: true, template: `
    <span
      class="kit-icon__mask"
      role="img"
      [attr.aria-label]="ariaLabel() ?? name()"
      [style.background-color]="color()"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.mask-image]="maskImageUrl()"
      [style.-webkit-mask-image]="maskImageUrl()"
    ></span>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["@charset \"UTF-8\";:host{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;line-height:0;vertical-align:middle}.kit-icon__mask{display:inline-block;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain}\n"] }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }] } });

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
class RadioComponent extends BaseValueAccessor {
    /** Opções exibidas. */
    options = input([], ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    /** Cor do ícone radio (base + variant). Se não setado, usa cinza base + azul variant. */
    color = input(undefined, ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    /** Desabilita o grupo inteiro. @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valor selecionado (string). */
    value = signal(null, ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Verifica se uma opção está selecionada. */
    isSelected(opt) {
        return this.value() === opt.value;
    }
    /** Seleciona uma opção. */
    select(opt) {
        if (this.isDisabled())
            return;
        this.value.set(opt.value);
        this.onChange(this.value());
        this.onTouched();
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: RadioComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: RadioComponent, isStandalone: true, selector: "creamy-kit-radio", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => RadioComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "@for (opt of options(); track opt.value) {\n  <button\n    type=\"button\"\n    class=\"radio__row\"\n    role=\"radio\"\n    [attr.aria-checked]=\"isSelected(opt)\"\n    [attr.aria-disabled]=\"isDisabled()\"\n    [disabled]=\"isDisabled()\"\n    (click)=\"select(opt)\"\n  >\n    <span\n      class=\"radio__icon\"\n      [style.--radio-color]=\"color()\"\n      aria-hidden=\"true\"\n    >\n      <creamy-kit-icon name=\"radio_button_base\" [size]=\"24\" />\n      @if (isSelected(opt)) {\n        <creamy-kit-icon class=\"radio__icon--variant\" name=\"radio_button_variant\" [size]=\"24\" />\n      }\n    </span>\n    <span class=\"radio__label\">{{ opt.label }}</span>\n  </button>\n}\n", styles: ["@charset \"UTF-8\";.radio__row{display:flex;align-items:center;gap:12px;padding:12px 0;border:none;background:none;cursor:pointer;font-family:inherit;font-size:inherit;text-align:left}.radio__row:hover{opacity:.85}.radio__row:focus-visible{outline:2px solid var(--primary-base, #128cfe);outline-offset:2px;border-radius:4px}.radio__row:disabled{opacity:.5;cursor:not-allowed}.radio__icon{position:relative;display:inline-flex;flex-shrink:0;width:24px;height:24px}.radio__icon creamy-kit-icon{position:absolute;inset:0}.radio__icon creamy-kit-icon:first-child{color:var(--neutral-base, #484848)}@supports (--custom: var(--radio-color)){.radio__icon[style*=--radio-color] creamy-kit-icon{color:var(--radio-color)}}.radio__icon:not([style*=--radio-color]) .radio__icon--variant{color:var(--primary-base, #128cfe)}.radio__label{color:var(--text-body, #2a2a2a);font-size:1rem;font-weight:400;line-height:1.5}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: RadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-radio', standalone: true, imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RadioComponent),
                            multi: true,
                        },
                    ], template: "@for (opt of options(); track opt.value) {\n  <button\n    type=\"button\"\n    class=\"radio__row\"\n    role=\"radio\"\n    [attr.aria-checked]=\"isSelected(opt)\"\n    [attr.aria-disabled]=\"isDisabled()\"\n    [disabled]=\"isDisabled()\"\n    (click)=\"select(opt)\"\n  >\n    <span\n      class=\"radio__icon\"\n      [style.--radio-color]=\"color()\"\n      aria-hidden=\"true\"\n    >\n      <creamy-kit-icon name=\"radio_button_base\" [size]=\"24\" />\n      @if (isSelected(opt)) {\n        <creamy-kit-icon class=\"radio__icon--variant\" name=\"radio_button_variant\" [size]=\"24\" />\n      }\n    </span>\n    <span class=\"radio__label\">{{ opt.label }}</span>\n  </button>\n}\n", styles: ["@charset \"UTF-8\";.radio__row{display:flex;align-items:center;gap:12px;padding:12px 0;border:none;background:none;cursor:pointer;font-family:inherit;font-size:inherit;text-align:left}.radio__row:hover{opacity:.85}.radio__row:focus-visible{outline:2px solid var(--primary-base, #128cfe);outline-offset:2px;border-radius:4px}.radio__row:disabled{opacity:.5;cursor:not-allowed}.radio__icon{position:relative;display:inline-flex;flex-shrink:0;width:24px;height:24px}.radio__icon creamy-kit-icon{position:absolute;inset:0}.radio__icon creamy-kit-icon:first-child{color:var(--neutral-base, #484848)}@supports (--custom: var(--radio-color)){.radio__icon[style*=--radio-color] creamy-kit-icon{color:var(--radio-color)}}.radio__icon:not([style*=--radio-color]) .radio__icon--variant{color:var(--primary-base, #128cfe)}.radio__label{color:var(--text-body, #2a2a2a);font-size:1rem;font-weight:400;line-height:1.5}\n"] }]
        }], propDecorators: { options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: false }] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

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
class SwitchComponent extends BaseValueAccessor {
    /** Cor do fundo quando ativo (CSS var ou valor direto). */
    color = input('var(--primary-base, #128cfe)', ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    /** Desabilita o switch. @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Estado do toggle. */
    value = signal(false, ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Toggle o estado. */
    toggle() {
        if (this.isDisabled())
            return;
        this.value.set(!this.value());
        this.onChange(this.value());
        this.onTouched();
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value ?? false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SwitchComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: SwitchComponent, isStandalone: true, selector: "creamy-kit-switch", inputs: { color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SwitchComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"switch\"\n  [class.switch--on]=\"value()\"\n  [style.--switch-color]=\"color()\"\n  (click)=\"toggle()\"\n  [disabled]=\"isDisabled()\"\n  role=\"switch\"\n  [attr.aria-checked]=\"value()\"\n  [attr.aria-disabled]=\"isDisabled()\"\n>\n  <span class=\"switch__thumb\" aria-hidden=\"true\"></span>\n</button>\n", styles: [".switch{position:relative;display:inline-flex;align-items:center;justify-content:flex-start;width:52px;height:32px;padding:2px;border:none;border-radius:16px;background:var(--border-medium, #d2d2d2);cursor:pointer;transition:background-color .3s ease}.switch:focus-visible{outline:2px solid var(--primary-base, #128cfe);outline-offset:2px}.switch:hover{opacity:.9}.switch--on{background-color:var(--switch-color);justify-content:flex-end}.switch:disabled{opacity:.5;cursor:not-allowed}.switch__thumb{display:block;width:28px;height:28px;border-radius:50%;background:var(--white, #ffffff);transition:transform .3s ease;flex-shrink:0}@media(prefers-reduced-motion:reduce){.switch,.switch__thumb{transition:none}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-switch', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SwitchComponent),
                            multi: true,
                        },
                    ], template: "<button\n  type=\"button\"\n  class=\"switch\"\n  [class.switch--on]=\"value()\"\n  [style.--switch-color]=\"color()\"\n  (click)=\"toggle()\"\n  [disabled]=\"isDisabled()\"\n  role=\"switch\"\n  [attr.aria-checked]=\"value()\"\n  [attr.aria-disabled]=\"isDisabled()\"\n>\n  <span class=\"switch__thumb\" aria-hidden=\"true\"></span>\n</button>\n", styles: [".switch{position:relative;display:inline-flex;align-items:center;justify-content:flex-start;width:52px;height:32px;padding:2px;border:none;border-radius:16px;background:var(--border-medium, #d2d2d2);cursor:pointer;transition:background-color .3s ease}.switch:focus-visible{outline:2px solid var(--primary-base, #128cfe);outline-offset:2px}.switch:hover{opacity:.9}.switch--on{background-color:var(--switch-color);justify-content:flex-end}.switch:disabled{opacity:.5;cursor:not-allowed}.switch__thumb{display:block;width:28px;height:28px;border-radius:50%;background:var(--white, #ffffff);transition:transform .3s ease;flex-shrink:0}@media(prefers-reduced-motion:reduce){.switch,.switch__thumb{transition:none}}\n"] }]
        }], propDecorators: { color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

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
class CodeComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /**
     * Quantidade de campos.
     * @default 6
     */
    length = input(6, ...(ngDevMode ? [{ debugName: "length" }] : /* istanbul ignore next */ []));
    /**
     * Título opcional, exibido 4px acima (igual ao Input Text).
     */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /**
     * Estado de erro — borda dos campos na cor de erro.
     * @default false
     */
    error = input(false, { ...(ngDevMode ? { debugName: "error" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Desabilita todos os campos. @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Caracteres de cada campo. */
    chars = signal([], ...(ngDevMode ? [{ debugName: "chars" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Índices para renderizar os campos. */
    indexes = computed(() => Array.from({ length: this.length() }, (_, i) => i), ...(ngDevMode ? [{ debugName: "indexes" }] : /* istanbul ignore next */ []));
    /** Referências aos inputs nativos para controle de foco. */
    boxes = viewChildren('box', ...(ngDevMode ? [{ debugName: "boxes" }] : /* istanbul ignore next */ []));
    charAt(index) {
        return this.chars()[index] ?? '';
    }
    onInput(event, index) {
        const input = event.target;
        let val = input.value;
        if (val.length > 1) {
            val = val.slice(-1);
        }
        input.value = val;
        const chars = [...this.chars()];
        while (chars.length < this.length()) {
            chars.push('');
        }
        chars[index] = val;
        this.chars.set(chars);
        this.emit();
        if (val && index < this.length() - 1) {
            this.focusBox(index + 1);
        }
    }
    onKeydown(event, index) {
        const input = event.target;
        if (event.key === 'Backspace' && !input.value && index > 0) {
            this.focusBox(index - 1);
        }
        else if (event.key === 'ArrowLeft' && index > 0) {
            this.focusBox(index - 1);
        }
        else if (event.key === 'ArrowRight' && index < this.length() - 1) {
            this.focusBox(index + 1);
        }
    }
    onPaste(event) {
        event.preventDefault();
        const text = (event.clipboardData?.getData('text') ?? '').trim();
        if (!text) {
            return;
        }
        const len = this.length();
        const chars = Array.from({ length: len }, (_, i) => text[i] ?? '');
        this.chars.set(chars);
        this.emit();
        const firstEmpty = chars.findIndex((c) => !c);
        this.focusBox(firstEmpty === -1 ? len - 1 : firstEmpty);
    }
    onBlur() {
        this.onTouched();
    }
    focusBox(index) {
        const el = this.boxes()[index]?.nativeElement;
        if (el) {
            el.focus();
            el.select();
        }
    }
    emit() {
        this.onChange(this.chars().join(''));
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        const text = value ?? '';
        const chars = Array.from({ length: this.length() }, (_, i) => text[i] ?? '');
        this.chars.set(chars);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CodeComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: CodeComponent, isStandalone: true, selector: "creamy-kit-code", inputs: { length: { classPropertyName: "length", publicName: "length", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, error: { classPropertyName: "error", publicName: "error", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-error": "error() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CodeComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "boxes", predicate: ["box"], descendants: true, isSignal: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"code\">\n  @if (title()) {\n    <span class=\"code__title\">{{ title() }}</span>\n  }\n\n  <div class=\"code__fields\">\n    @for (i of indexes(); track i) {\n      <input\n        #box\n        class=\"code__field\"\n        type=\"text\"\n        inputmode=\"text\"\n        autocomplete=\"off\"\n        maxlength=\"1\"\n        [value]=\"charAt(i)\"\n        [disabled]=\"isDisabled()\"\n        (input)=\"onInput($event, i)\"\n        (keydown)=\"onKeydown($event, i)\"\n        (paste)=\"onPaste($event)\"\n        (blur)=\"onBlur()\"\n      />\n    }\n  </div>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block}.code__field:disabled{opacity:.5;cursor:not-allowed}.code{display:flex;flex-direction:column;gap:4px}.code__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.code__fields{display:flex;gap:8px}.code__field{width:32px;height:48px;box-sizing:border-box;padding:0;text-align:center;background-color:var(--primary-contrast);border:none;border-radius:12px;box-shadow:inset 0 0 0 1px var(--border-medium);font-family:inherit;font-size:18px;font-weight:500;color:var(--text-body);outline:none}:host([data-error]) .code__field{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host .code__field:focus{box-shadow:inset 0 0 0 2px var(--background-primary)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CodeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-code', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-error]': "error() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CodeComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"code\">\n  @if (title()) {\n    <span class=\"code__title\">{{ title() }}</span>\n  }\n\n  <div class=\"code__fields\">\n    @for (i of indexes(); track i) {\n      <input\n        #box\n        class=\"code__field\"\n        type=\"text\"\n        inputmode=\"text\"\n        autocomplete=\"off\"\n        maxlength=\"1\"\n        [value]=\"charAt(i)\"\n        [disabled]=\"isDisabled()\"\n        (input)=\"onInput($event, i)\"\n        (keydown)=\"onKeydown($event, i)\"\n        (paste)=\"onPaste($event)\"\n        (blur)=\"onBlur()\"\n      />\n    }\n  </div>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:block}.code__field:disabled{opacity:.5;cursor:not-allowed}.code{display:flex;flex-direction:column;gap:4px}.code__title{font-size:16px;font-weight:500;color:var(--text-heading-2)}.code__fields{display:flex;gap:8px}.code__field{width:32px;height:48px;box-sizing:border-box;padding:0;text-align:center;background-color:var(--primary-contrast);border:none;border-radius:12px;box-shadow:inset 0 0 0 1px var(--border-medium);font-family:inherit;font-size:18px;font-weight:500;color:var(--text-body);outline:none}:host([data-error]) .code__field{box-shadow:inset 0 0 0 1px var(--feedbacks-error)}:host .code__field:focus{box-shadow:inset 0 0 0 2px var(--background-primary)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { length: [{ type: i0.Input, args: [{ isSignal: true, alias: "length", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], error: [{ type: i0.Input, args: [{ isSignal: true, alias: "error", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], boxes: [{ type: i0.ViewChildren, args: ['box', { isSignal: true }] }] } });

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
class CalendarComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /** Título (negrito) do rodapé. Vazio = sem título. */
    footerLabel = input('', ...(ngDevMode ? [{ debugName: "footerLabel" }] : /* istanbul ignore next */ []));
    /**
     * Valor do rodapé:
     * - `''` → rodapé oculto;
     * - `'auto'` → data selecionada formatada;
     * - outro texto → texto recebido.
     */
    footerValue = input('', ...(ngDevMode ? [{ debugName: "footerValue" }] : /* istanbul ignore next */ []));
    /**
     * Modo "liso": remove a borda e o raio próprios do calendário, para embuti-lo
     * em outro contêiner (ex.: DatePicker).
     * @default false
     */
    bare = input(false, { ...(ngDevMode ? { debugName: "bare" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Desabilita o calendário (sem navegação nem seleção). @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /**
     * Locale BCP 47 usado para formatar nomes de meses e datas.
     * @default 'pt-BR'
     */
    locale = input('pt-BR', ...(ngDevMode ? [{ debugName: "locale" }] : /* istanbul ignore next */ []));
    /** Emitido ao selecionar um dia. */
    dateChange = output();
    /** Cabeçalhos dos dias da semana (Dom → Sáb). */
    weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    /** Data selecionada. */
    selected = signal(null, ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
    /** Primeiro dia do mês exibido. */
    view = signal(startOfMonth(new Date()), ...(ngDevMode ? [{ debugName: "view" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Rótulo do mês exibido, ex.: "Fevereiro de 2026". */
    monthLabel = computed(() => {
        const d = this.view();
        const m = monthName(d, this.locale());
        return `${m.charAt(0).toUpperCase()}${m.slice(1)} de ${d.getFullYear()}`;
    }, ...(ngDevMode ? [{ debugName: "monthLabel" }] : /* istanbul ignore next */ []));
    /** Células do grid: nulos de preenchimento + números dos dias. */
    cells = computed(() => {
        const d = this.view();
        const year = d.getFullYear();
        const month = d.getMonth();
        const firstWeekday = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const arr = [];
        for (let i = 0; i < firstWeekday; i++) {
            arr.push(null);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            arr.push(day);
        }
        return arr;
    }, ...(ngDevMode ? [{ debugName: "cells" }] : /* istanbul ignore next */ []));
    /** Rodapé deve ser exibido? */
    footerVisible = computed(() => !!this.footerLabel() || !!this.footerValue(), ...(ngDevMode ? [{ debugName: "footerVisible" }] : /* istanbul ignore next */ []));
    /** Texto do valor do rodapé. */
    footerDisplay = computed(() => {
        const v = this.footerValue();
        if (v === 'auto') {
            const s = this.selected();
            return s ? formatFull(s, this.locale()) : '';
        }
        return v;
    }, ...(ngDevMode ? [{ debugName: "footerDisplay" }] : /* istanbul ignore next */ []));
    isSelected(day) {
        const s = this.selected();
        if (!s) {
            return false;
        }
        const v = this.view();
        return (s.getFullYear() === v.getFullYear() &&
            s.getMonth() === v.getMonth() &&
            s.getDate() === day);
    }
    prevMonth() {
        if (this.isDisabled())
            return;
        const d = this.view();
        this.view.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    }
    nextMonth() {
        if (this.isDisabled())
            return;
        const d = this.view();
        this.view.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    }
    selectDay(day) {
        if (this.isDisabled())
            return;
        const v = this.view();
        const date = new Date(v.getFullYear(), v.getMonth(), day);
        this.selected.set(date);
        this.onChange(date);
        this.onTouched();
        this.dateChange.emit(date);
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        if (!value) {
            this.selected.set(null);
            return;
        }
        const d = value instanceof Date ? value : new Date(value);
        if (isNaN(d.getTime())) {
            return;
        }
        this.selected.set(d);
        this.view.set(startOfMonth(d));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CalendarComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: CalendarComponent, isStandalone: true, selector: "creamy-kit-calendar", inputs: { footerLabel: { classPropertyName: "footerLabel", publicName: "footerLabel", isSignal: true, isRequired: false, transformFunction: null }, footerValue: { classPropertyName: "footerValue", publicName: "footerValue", isSignal: true, isRequired: false, transformFunction: null }, bare: { classPropertyName: "bare", publicName: "bare", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, locale: { classPropertyName: "locale", publicName: "locale", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { dateChange: "dateChange" }, host: { properties: { "attr.data-bare": "bare() ? '' : null", "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CalendarComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"calendar\">\n  <header class=\"calendar__header\">\n    <span class=\"calendar__month\">{{ monthLabel() }}</span>\n    <div class=\"calendar__nav\">\n      <button\n        type=\"button\"\n        class=\"calendar__navbtn calendar__navbtn--prev\"\n        aria-label=\"M\u00EAs anterior\"\n        (click)=\"prevMonth()\"\n      >\n        <span class=\"calendar__chevron\" aria-hidden=\"true\"></span>\n      </button>\n      <button\n        type=\"button\"\n        class=\"calendar__navbtn calendar__navbtn--next\"\n        aria-label=\"Pr\u00F3ximo m\u00EAs\"\n        (click)=\"nextMonth()\"\n      >\n        <span class=\"calendar__chevron\" aria-hidden=\"true\"></span>\n      </button>\n    </div>\n  </header>\n\n  <div class=\"calendar__grid\">\n    @for (w of weekdays; track $index) {\n      <span class=\"calendar__weekday\">{{ w }}</span>\n    }\n\n    @for (cell of cells(); track $index) {\n      @if (cell !== null) {\n        <button\n          type=\"button\"\n          class=\"calendar__day\"\n          [class.calendar__day--selected]=\"isSelected(cell)\"\n          (click)=\"selectDay(cell)\"\n        >\n          {{ cell }}\n        </button>\n      } @else {\n        <span class=\"calendar__day calendar__day--empty\"></span>\n      }\n    }\n  </div>\n\n  @if (footerVisible()) {\n    <div class=\"calendar__footer\">\n      <span class=\"calendar__footer-dot\" aria-hidden=\"true\"></span>\n      <div class=\"calendar__footer-text\">\n        @if (footerLabel()) {\n          <strong class=\"calendar__footer-label\">{{ footerLabel() }}</strong>\n        }\n        <span class=\"calendar__footer-value\">{{ footerDisplay() }}</span>\n      </div>\n    </div>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:100%;max-width:320px}:host[data-disabled]{opacity:.5;pointer-events:none}.calendar{width:100%;box-sizing:border-box;background-color:var(--background-base);border:1px solid var(--border-soft);border-radius:16px;overflow:hidden}:host([data-bare]) .calendar{border:none;border-radius:0}.calendar__header{display:flex;align-items:center;justify-content:space-between;padding:16px}.calendar__month{font-size:16px;font-weight:600;color:var(--text-heading)}.calendar__nav{display:flex;align-items:center;gap:8px}.calendar__navbtn{width:36px;height:36px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:none;background:transparent}.calendar__chevron{display:inline-block;flex:0 0 auto;width:16px;height:16px;background-color:currentColor;-webkit-mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain}.calendar__navbtn--prev{border:1px solid var(--border-medium);color:var(--neutral-base)}.calendar__navbtn--prev .calendar__chevron{transform:rotate(180deg)}.calendar__navbtn--next{background-color:var(--primary-base);color:var(--primary-contrast)}.calendar__grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:0 12px 16px}.calendar__weekday{display:flex;align-items:center;justify-content:center;height:32px;font-size:13px;color:var(--text-body-2)}.calendar__day{justify-self:center;width:36px;height:36px;border:none;background:transparent;border-radius:50%;font-family:inherit;font-size:14px;color:var(--text-body);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.calendar__day:hover{background-color:var(--background-variant)}.calendar__day--selected,.calendar__day--selected:hover{background-color:var(--primary-base);color:var(--primary-contrast)}.calendar__day--empty{cursor:default;visibility:hidden}.calendar__footer{display:flex;align-items:center;gap:12px;padding:16px;background-color:var(--background-variant-2)}.calendar__footer-dot{flex:0 0 auto;width:32px;height:32px;border-radius:50%;background-color:var(--neutral-base)}.calendar__footer-text{display:flex;flex-direction:column;gap:2px;min-width:0}.calendar__footer-label{font-size:14px;font-weight:600;color:var(--text-heading)}.calendar__footer-value{font-size:14px;color:var(--text-body)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-calendar', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-bare]': "bare() ? '' : null",
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CalendarComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"calendar\">\n  <header class=\"calendar__header\">\n    <span class=\"calendar__month\">{{ monthLabel() }}</span>\n    <div class=\"calendar__nav\">\n      <button\n        type=\"button\"\n        class=\"calendar__navbtn calendar__navbtn--prev\"\n        aria-label=\"M\u00EAs anterior\"\n        (click)=\"prevMonth()\"\n      >\n        <span class=\"calendar__chevron\" aria-hidden=\"true\"></span>\n      </button>\n      <button\n        type=\"button\"\n        class=\"calendar__navbtn calendar__navbtn--next\"\n        aria-label=\"Pr\u00F3ximo m\u00EAs\"\n        (click)=\"nextMonth()\"\n      >\n        <span class=\"calendar__chevron\" aria-hidden=\"true\"></span>\n      </button>\n    </div>\n  </header>\n\n  <div class=\"calendar__grid\">\n    @for (w of weekdays; track $index) {\n      <span class=\"calendar__weekday\">{{ w }}</span>\n    }\n\n    @for (cell of cells(); track $index) {\n      @if (cell !== null) {\n        <button\n          type=\"button\"\n          class=\"calendar__day\"\n          [class.calendar__day--selected]=\"isSelected(cell)\"\n          (click)=\"selectDay(cell)\"\n        >\n          {{ cell }}\n        </button>\n      } @else {\n        <span class=\"calendar__day calendar__day--empty\"></span>\n      }\n    }\n  </div>\n\n  @if (footerVisible()) {\n    <div class=\"calendar__footer\">\n      <span class=\"calendar__footer-dot\" aria-hidden=\"true\"></span>\n      <div class=\"calendar__footer-text\">\n        @if (footerLabel()) {\n          <strong class=\"calendar__footer-label\">{{ footerLabel() }}</strong>\n        }\n        <span class=\"calendar__footer-value\">{{ footerDisplay() }}</span>\n      </div>\n    </div>\n  }\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:100%;max-width:320px}:host[data-disabled]{opacity:.5;pointer-events:none}.calendar{width:100%;box-sizing:border-box;background-color:var(--background-base);border:1px solid var(--border-soft);border-radius:16px;overflow:hidden}:host([data-bare]) .calendar{border:none;border-radius:0}.calendar__header{display:flex;align-items:center;justify-content:space-between;padding:16px}.calendar__month{font-size:16px;font-weight:600;color:var(--text-heading)}.calendar__nav{display:flex;align-items:center;gap:8px}.calendar__navbtn{width:36px;height:36px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:none;background:transparent}.calendar__chevron{display:inline-block;flex:0 0 auto;width:16px;height:16px;background-color:currentColor;-webkit-mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain}.calendar__navbtn--prev{border:1px solid var(--border-medium);color:var(--neutral-base)}.calendar__navbtn--prev .calendar__chevron{transform:rotate(180deg)}.calendar__navbtn--next{background-color:var(--primary-base);color:var(--primary-contrast)}.calendar__grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:0 12px 16px}.calendar__weekday{display:flex;align-items:center;justify-content:center;height:32px;font-size:13px;color:var(--text-body-2)}.calendar__day{justify-self:center;width:36px;height:36px;border:none;background:transparent;border-radius:50%;font-family:inherit;font-size:14px;color:var(--text-body);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.calendar__day:hover{background-color:var(--background-variant)}.calendar__day--selected,.calendar__day--selected:hover{background-color:var(--primary-base);color:var(--primary-contrast)}.calendar__day--empty{cursor:default;visibility:hidden}.calendar__footer{display:flex;align-items:center;gap:12px;padding:16px;background-color:var(--background-variant-2)}.calendar__footer-dot{flex:0 0 auto;width:32px;height:32px;border-radius:50%;background-color:var(--neutral-base)}.calendar__footer-text{display:flex;flex-direction:column;gap:2px;min-width:0}.calendar__footer-label{font-size:14px;font-weight:600;color:var(--text-heading)}.calendar__footer-value{font-size:14px;color:var(--text-body)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { footerLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "footerLabel", required: false }] }], footerValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "footerValue", required: false }] }], bare: [{ type: i0.Input, args: [{ isSignal: true, alias: "bare", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], locale: [{ type: i0.Input, args: [{ isSignal: true, alias: "locale", required: false }] }], dateChange: [{ type: i0.Output, args: ["dateChange"] }] } });
function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function monthName(date, locale) {
    return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
}
function formatFull(date, locale) {
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} de ${monthName(date, locale)} de ${date.getFullYear()}`;
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
class DatePickerComponent extends BaseValueAccessor {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /** Título do cabeçalho. */
    title = input('Selecione a data', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** Descrição (subtítulo) do cabeçalho. */
    description = input('', ...(ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []));
    /** Texto informativo exibido no rodapé do calendário. */
    infoText = input('', ...(ngDevMode ? [{ debugName: "infoText" }] : /* istanbul ignore next */ []));
    /** Rótulo do botão de confirmação. */
    confirmLabel = input('Confirmar', ...(ngDevMode ? [{ debugName: "confirmLabel" }] : /* istanbul ignore next */ []));
    /** Rótulo do botão de cancelamento. */
    cancelLabel = input('Cancelar', ...(ngDevMode ? [{ debugName: "cancelLabel" }] : /* istanbul ignore next */ []));
    /** Desabilita o seletor (calendário e ações). @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Data selecionada (pendente até confirmar). */
    selected = signal(null, ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    /** Emitido ao confirmar, com a data escolhida. */
    confirm = output();
    /** Emitido ao cancelar. */
    cancel = output();
    /** Emitido ao fechar pelo X. */
    closed = output();
    onCalendarChange(date) {
        this.selected.set(date);
    }
    onConfirm() {
        if (this.isDisabled())
            return;
        const value = this.selected();
        this.onChange(value);
        this.onTouched();
        this.confirm.emit(value);
    }
    onCancel() {
        this.cancel.emit();
    }
    onClose() {
        this.closed.emit();
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        if (!value) {
            this.selected.set(null);
            return;
        }
        const d = value instanceof Date ? value : new Date(value);
        this.selected.set(isNaN(d.getTime()) ? null : d);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: DatePickerComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: DatePickerComponent, isStandalone: true, selector: "creamy-kit-date-picker", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, infoText: { classPropertyName: "infoText", publicName: "infoText", isSignal: true, isRequired: false, transformFunction: null }, confirmLabel: { classPropertyName: "confirmLabel", publicName: "confirmLabel", isSignal: true, isRequired: false, transformFunction: null }, cancelLabel: { classPropertyName: "cancelLabel", publicName: "cancelLabel", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { confirm: "confirm", cancel: "cancel", closed: "closed" }, host: { properties: { "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DatePickerComponent),
                multi: true,
            },
        ], usesInheritance: true, ngImport: i0, template: "<div class=\"datepicker\">\n  <header class=\"datepicker__header\">\n    <div class=\"datepicker__heading\">\n      <strong class=\"datepicker__title\">{{ title() }}</strong>\n      @if (description()) {\n        <span class=\"datepicker__desc\">{{ description() }}</span>\n      }\n    </div>\n    <button\n      type=\"button\"\n      class=\"datepicker__close\"\n      aria-label=\"Fechar\"\n      (click)=\"onClose()\"\n    >\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M6 6l12 12M18 6L6 18\" />\n      </svg>\n    </button>\n  </header>\n\n  <creamy-kit-calendar\n    bare\n    [footerValue]=\"infoText()\"\n    [disabled]=\"isDisabled()\"\n    [ngModel]=\"selected()\"\n    (ngModelChange)=\"onCalendarChange($event)\"\n  />\n\n  <div class=\"datepicker__actions\">\n    <creamy-kit-button class=\"datepicker__action\" (click)=\"onConfirm()\">\n      {{ confirmLabel() }}\n    </creamy-kit-button>\n    <creamy-kit-button\n      class=\"datepicker__action\"\n      appearance=\"outline\"\n      (click)=\"onCancel()\"\n    >\n      {{ cancelLabel() }}\n    </creamy-kit-button>\n  </div>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:100%;max-width:340px}:host[data-disabled] .datepicker__actions{opacity:.5;pointer-events:none}.datepicker{width:100%;box-sizing:border-box;display:flex;flex-direction:column;background-color:var(--background-base);border:1px solid var(--border-soft);border-radius:16px;overflow:hidden;box-shadow:0 12px 32px #0000001f}.datepicker kit-calendar{max-width:none;width:100%}.datepicker__header{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:16px;border-bottom:1px solid var(--border-soft)}.datepicker__heading{display:flex;flex-direction:column;gap:2px;min-width:0}.datepicker__title{font-size:18px;font-weight:600;color:var(--text-heading)}.datepicker__desc{font-size:13px;color:var(--text-body-2)}.datepicker__close{flex:0 0 auto;width:28px;height:28px;padding:0;border:none;background:transparent;color:var(--text-heading);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.datepicker__close:hover{color:var(--text-body)}.datepicker__actions{display:flex;gap:12px;padding:16px}.datepicker__action{flex:1}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: CalendarComponent, selector: "creamy-kit-calendar", inputs: ["footerLabel", "footerValue", "bare", "disabled", "locale"], outputs: ["dateChange"] }, { kind: "component", type: ButtonComponent, selector: "creamy-kit-button", inputs: ["appearance", "contrast"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: DatePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-date-picker', standalone: true, imports: [FormsModule, CalendarComponent, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DatePickerComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"datepicker\">\n  <header class=\"datepicker__header\">\n    <div class=\"datepicker__heading\">\n      <strong class=\"datepicker__title\">{{ title() }}</strong>\n      @if (description()) {\n        <span class=\"datepicker__desc\">{{ description() }}</span>\n      }\n    </div>\n    <button\n      type=\"button\"\n      class=\"datepicker__close\"\n      aria-label=\"Fechar\"\n      (click)=\"onClose()\"\n    >\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M6 6l12 12M18 6L6 18\" />\n      </svg>\n    </button>\n  </header>\n\n  <creamy-kit-calendar\n    bare\n    [footerValue]=\"infoText()\"\n    [disabled]=\"isDisabled()\"\n    [ngModel]=\"selected()\"\n    (ngModelChange)=\"onCalendarChange($event)\"\n  />\n\n  <div class=\"datepicker__actions\">\n    <creamy-kit-button class=\"datepicker__action\" (click)=\"onConfirm()\">\n      {{ confirmLabel() }}\n    </creamy-kit-button>\n    <creamy-kit-button\n      class=\"datepicker__action\"\n      appearance=\"outline\"\n      (click)=\"onCancel()\"\n    >\n      {{ cancelLabel() }}\n    </creamy-kit-button>\n  </div>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:100%;max-width:340px}:host[data-disabled] .datepicker__actions{opacity:.5;pointer-events:none}.datepicker{width:100%;box-sizing:border-box;display:flex;flex-direction:column;background-color:var(--background-base);border:1px solid var(--border-soft);border-radius:16px;overflow:hidden;box-shadow:0 12px 32px #0000001f}.datepicker kit-calendar{max-width:none;width:100%}.datepicker__header{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:16px;border-bottom:1px solid var(--border-soft)}.datepicker__heading{display:flex;flex-direction:column;gap:2px;min-width:0}.datepicker__title{font-size:18px;font-weight:600;color:var(--text-heading)}.datepicker__desc{font-size:13px;color:var(--text-body-2)}.datepicker__close{flex:0 0 auto;width:28px;height:28px;padding:0;border:none;background:transparent;color:var(--text-heading);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.datepicker__close:hover{color:var(--text-body)}.datepicker__actions{display:flex;gap:12px;padding:16px}.datepicker__action{flex:1}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }], infoText: [{ type: i0.Input, args: [{ isSignal: true, alias: "infoText", required: false }] }], confirmLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "confirmLabel", required: false }] }], cancelLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "cancelLabel", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], confirm: [{ type: i0.Output, args: ["confirm"] }], cancel: [{ type: i0.Output, args: ["cancel"] }], closed: [{ type: i0.Output, args: ["closed"] }] } });

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
class BreadcrumbComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /**
     * Caminho completo. Os segmentos são separados por "/".
     */
    path = input('', ...(ngDevMode ? [{ debugName: "path" }] : /* istanbul ignore next */ []));
    /**
     * Emitido ao clicar em um segmento.
     */
    itemClick = output();
    /** Segmentos do caminho (ignora vazios de "/" no início/fim). */
    items = computed(() => this.path()
        .split('/')
        .map((s) => s.trim())
        .filter((s) => s.length > 0), ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    onItemClick(index) {
        const items = this.items();
        this.itemClick.emit({
            index,
            label: items[index],
            path: items.slice(0, index + 1).join('/'),
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BreadcrumbComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: BreadcrumbComponent, isStandalone: true, selector: "creamy-kit-breadcrumb", inputs: { path: { classPropertyName: "path", publicName: "path", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { itemClick: "itemClick" }, ngImport: i0, template: "<nav class=\"breadcrumb\" aria-label=\"breadcrumb\">\n  @for (item of items(); track $index; let i = $index) {\n    @if (i > 0) {\n      <span class=\"breadcrumb__sep\" aria-hidden=\"true\"></span>\n    }\n    <button type=\"button\" class=\"breadcrumb__item\" (click)=\"onItemClick(i)\">\n      {{ item }}\n    </button>\n  }\n</nav>\n", styles: ["@charset \"UTF-8\";:host{display:block}.breadcrumb{display:flex;align-items:center;flex-wrap:wrap}.breadcrumb__item{border:none;background:transparent;padding:0;margin:0;font-family:inherit;font-size:14px;font-weight:400;color:var(--neutral-base);cursor:pointer}.breadcrumb__item:hover{text-decoration:underline}.breadcrumb__sep{display:inline-block;flex:0 0 auto;width:16px;height:16px;background-color:currentColor;-webkit-mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;margin-left:4px;margin-right:8px;color:var(--neutral-base)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-breadcrumb', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav class=\"breadcrumb\" aria-label=\"breadcrumb\">\n  @for (item of items(); track $index; let i = $index) {\n    @if (i > 0) {\n      <span class=\"breadcrumb__sep\" aria-hidden=\"true\"></span>\n    }\n    <button type=\"button\" class=\"breadcrumb__item\" (click)=\"onItemClick(i)\">\n      {{ item }}\n    </button>\n  }\n</nav>\n", styles: ["@charset \"UTF-8\";:host{display:block}.breadcrumb{display:flex;align-items:center;flex-wrap:wrap}.breadcrumb__item{border:none;background:transparent;padding:0;margin:0;font-family:inherit;font-size:14px;font-weight:400;color:var(--neutral-base);cursor:pointer}.breadcrumb__item:hover{text-decoration:underline}.breadcrumb__sep{display:inline-block;flex:0 0 auto;width:16px;height:16px;background-color:currentColor;-webkit-mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;margin-left:4px;margin-right:8px;color:var(--neutral-base)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { path: [{ type: i0.Input, args: [{ isSignal: true, alias: "path", required: false }] }], itemClick: [{ type: i0.Output, args: ["itemClick"] }] } });

/**
 * Componente de Pagination do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
class PaginationComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: PaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: PaginationComponent, isStandalone: true, selector: "creamy-kit-pagination", ngImport: i0, template: "<p>pagination works!</p>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-pagination', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p>pagination works!</p>\n" }]
        }] });

/**
 * Componente de Tabs do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
class TabsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: TabsComponent, isStandalone: true, selector: "creamy-kit-tabs", ngImport: i0, template: "<p>tabs works!</p>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-tabs', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p>tabs works!</p>\n" }]
        }] });

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
class TabBarItemComponent {
    /** Nome do ícone (arquivo SVG no creamy-kit-resources/icons/). */
    icon = input.required(...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    /** Label opcional exibido abaixo do ícone. */
    label = input(undefined, ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    /** Valor identificador do item (para seleção). */
    value = input.required(...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Se este item está selecionado (gerenciado pelo TabBarComponent pai). */
    selected = model(false, ...(ngDevMode ? [{ debugName: "selected" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TabBarItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: TabBarItemComponent, isStandalone: true, selector: "creamy-kit-tab-bar-item", inputs: { icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, selected: { classPropertyName: "selected", publicName: "selected", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selectedChange" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"tab-bar-item\"\n  role=\"tab\"\n  [attr.data-value]=\"value()\"\n  [attr.aria-selected]=\"selected()\"\n>\n  <creamy-kit-icon [name]=\"icon()\" [size]=\"24\" />\n  @if (label()) {\n    <span class=\"tab-bar-item__label\">{{ label() }}</span>\n  }\n</button>\n", styles: [".tab-bar-item{display:flex;flex-direction:column;align-items:center;gap:12px;padding:0;border:none;background:none;cursor:pointer;color:inherit;font-family:inherit}.tab-bar-item creamy-kit-icon{color:#fff}.tab-bar-item:focus-visible{outline:2px solid rgba(255,255,255,.5);outline-offset:2px;border-radius:8px}.tab-bar-item:hover{opacity:.85}.tab-bar-item__label{font-size:12px;font-weight:500;color:var(--action-neutral-base, #484848);line-height:1}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TabBarItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-tab-bar-item', standalone: true, imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"tab-bar-item\"\n  role=\"tab\"\n  [attr.data-value]=\"value()\"\n  [attr.aria-selected]=\"selected()\"\n>\n  <creamy-kit-icon [name]=\"icon()\" [size]=\"24\" />\n  @if (label()) {\n    <span class=\"tab-bar-item__label\">{{ label() }}</span>\n  }\n</button>\n", styles: [".tab-bar-item{display:flex;flex-direction:column;align-items:center;gap:12px;padding:0;border:none;background:none;cursor:pointer;color:inherit;font-family:inherit}.tab-bar-item creamy-kit-icon{color:#fff}.tab-bar-item:focus-visible{outline:2px solid rgba(255,255,255,.5);outline-offset:2px;border-radius:8px}.tab-bar-item:hover{opacity:.85}.tab-bar-item__label{font-size:12px;font-weight:500;color:var(--action-neutral-base, #484848);line-height:1}\n"] }]
        }], propDecorators: { icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], selected: [{ type: i0.Input, args: [{ isSignal: true, alias: "selected", required: false }] }, { type: i0.Output, args: ["selectedChange"] }] } });

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
class TabBarComponent extends BaseValueAccessor {
    /** Tab items filhos. */
    items = contentChildren(TabBarItemComponent, ...(ngDevMode ? [{ debugName: "items" }] : /* istanbul ignore next */ []));
    /** Rótulo acessível do elemento nav. @default 'Navegação' */
    ariaLabel = input('Navegação', ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    /** Desabilita a barra inteira. @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Valor selecionado (value do TabBarItem). */
    value = signal(null, ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    /** Estado final de disabled (input OU formulário). */
    isDisabled = computed(() => this.disabled() || this.disabledByForm(), ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    constructor() {
        super();
        // Mantém item.selected em sync com o valor controlado. O efeito rastreia
        // tanto value() quanto items() para cobrir writeValue() chamado antes do
        // conteúdo projetado estar disponível.
        effect(() => {
            const current = this.value();
            this.items().forEach(item => item.selected.set(item.value() === current));
        }, { allowSignalWrites: true });
    }
    /** Seleciona um item. */
    select(item) {
        if (this.isDisabled())
            return;
        this.value.set(item.value());
        this.onChange(this.value());
        this.onTouched();
    }
    // ControlValueAccessor -----------------------------------------------------
    writeValue(value) {
        this.value.set(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TabBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "21.2.16", type: TabBarComponent, isStandalone: true, selector: "creamy-kit-tab-bar", inputs: { ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-disabled": "isDisabled() ? '' : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => TabBarComponent),
                multi: true,
            },
        ], queries: [{ propertyName: "items", predicate: TabBarItemComponent, isSignal: true }], usesInheritance: true, ngImport: i0, template: "<nav class=\"tab-bar\" role=\"tablist\" [attr.aria-label]=\"ariaLabel()\">\n  <ng-content />\n</nav>\n", styles: [":host([data-disabled]) .tab-bar{opacity:.5;pointer-events:none}.tab-bar{position:fixed;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:space-around;width:100%;height:74px;padding:0;border-radius:24px 24px 0 0;background:var(--action-primary-contrast, #128cfe);margin:0;list-style:none;z-index:100}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TabBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-tab-bar', standalone: true, imports: [TabBarItemComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-disabled]': "isDisabled() ? '' : null",
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TabBarComponent),
                            multi: true,
                        },
                    ], template: "<nav class=\"tab-bar\" role=\"tablist\" [attr.aria-label]=\"ariaLabel()\">\n  <ng-content />\n</nav>\n", styles: [":host([data-disabled]) .tab-bar{opacity:.5;pointer-events:none}.tab-bar{position:fixed;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:space-around;width:100%;height:74px;padding:0;border-radius:24px 24px 0 0;background:var(--action-primary-contrast, #128cfe);margin:0;list-style:none;z-index:100}\n"] }]
        }], ctorParameters: () => [], propDecorators: { items: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => TabBarItemComponent), { isSignal: true }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

/**
 * Base abstrata compartilhada pelas variações de Header (tema + binding de
 * host). Não use diretamente — estenda nas variações. O tipo `HeaderTheme`
 * é público.
 */
class HeaderBase {
    themeService = inject(ThemeService);
    /** Tema. @default 'brand' */
    theme = input('brand', ...(ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.2.16", type: HeaderBase, isStandalone: true, inputs: { theme: { classPropertyName: "theme", publicName: "theme", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-theme": "theme()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderBase, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        '[attr.data-theme]': 'theme()',
                    },
                }]
        }], propDecorators: { theme: [{ type: i0.Input, args: [{ isSignal: true, alias: "theme", required: false }] }] } });

/**
 * Casca (shell) circular compartilhada pelos avatares.
 *
 * Uso **interno** do Creamy Kit: não é exportada na API pública. Concentra o
 * círculo, os tamanhos, os contrastes e o anel de progresso. Os avatares
 * públicos (`kit-avatar-icon`, `kit-avatar-text`, `kit-avatar-image`) a
 * reutilizam por composição, projetando apenas o conteúdo.
 */
class AvatarShellComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /** Tamanho do avatar. @default 'medium' */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** Contraste de cor. @default 'dark' */
    contrast = input('dark', ...(ngDevMode ? [{ debugName: "contrast" }] : /* istanbul ignore next */ []));
    /** Anel de progresso (0–100) ao redor do avatar. @default 0 */
    percentage = input(0, ...(ngDevMode ? [{ debugName: "percentage" }] : /* istanbul ignore next */ []));
    /** Conteúdo sem fundo (usado pela imagem, que preenche o círculo). */
    transparent = input(false, { ...(ngDevMode ? { debugName: "transparent" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    progress = computed(() => Math.max(0, Math.min(100, this.percentage())), ...(ngDevMode ? [{ debugName: "progress" }] : /* istanbul ignore next */ []));
    progressCss = computed(() => `${this.progress()}%`, ...(ngDevMode ? [{ debugName: "progressCss" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarShellComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: AvatarShellComponent, isStandalone: true, selector: "creamy-kit-avatar-shell", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, contrast: { classPropertyName: "contrast", publicName: "contrast", isSignal: true, isRequired: false, transformFunction: null }, percentage: { classPropertyName: "percentage", publicName: "percentage", isSignal: true, isRequired: false, transformFunction: null }, transparent: { classPropertyName: "transparent", publicName: "transparent", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-size": "size()", "attr.data-contrast": "contrast()", "attr.data-surface": "transparent() ? 'transparent' : 'filled'", "attr.data-ring": "progress() > 0 ? '' : null" } }, ngImport: i0, template: `
    <div class="avatar" [style.--kit-avatar-progress]="progressCss()">
      <span class="avatar__content"><ng-content /></span>
    </div>
  `, isInline: true, styles: ["@charset \"UTF-8\";:host{display:inline-flex}.avatar{border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;-webkit-user-select:none;user-select:none;box-sizing:border-box}.avatar__content{width:100%;height:100%;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;background-color:var(--kit-avatar-bg);color:var(--kit-avatar-fg)}.avatar__content img{width:100%;height:100%;object-fit:cover;display:block}:host([data-surface=transparent]) .avatar__content{background-color:transparent}:host([data-size=small]) .avatar{width:24px;height:24px;font-size:.625rem;--kit-avatar-ring-width: 1px}:host([data-size=medium]) .avatar{width:32px;height:32px;font-size:.75rem;--kit-avatar-ring-width: 2px}:host([data-size=large]) .avatar{width:48px;height:48px;font-size:1rem;--kit-avatar-ring-width: 4px}:host([data-contrast=dark]) .avatar{--kit-avatar-bg: var(--neutral-base);--kit-avatar-fg: var(--primary-contrast)}:host([data-contrast=light]) .avatar{--kit-avatar-bg: var(--primary-contrast);--kit-avatar-fg: var(--neutral-base)}:host([data-contrast=variant]) .avatar{--kit-avatar-bg: var(--primary-base);--kit-avatar-fg: var(--primary-contrast)}:host([data-contrast=on-brand]) .avatar{--kit-avatar-bg: var(--primary-contrast);--kit-avatar-fg: var(--primary-base)}:host([data-ring]) .avatar{padding:var(--kit-avatar-ring-width);background:conic-gradient(from 180deg,var(--kit-avatar-fg) var(--kit-avatar-progress, 0%),var(--kit-avatar-bg) 0)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarShellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-avatar-shell', standalone: true, template: `
    <div class="avatar" [style.--kit-avatar-progress]="progressCss()">
      <span class="avatar__content"><ng-content /></span>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-size]': 'size()',
                        '[attr.data-contrast]': 'contrast()',
                        '[attr.data-surface]': "transparent() ? 'transparent' : 'filled'",
                        '[attr.data-ring]': "progress() > 0 ? '' : null",
                    }, styles: ["@charset \"UTF-8\";:host{display:inline-flex}.avatar{border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;-webkit-user-select:none;user-select:none;box-sizing:border-box}.avatar__content{width:100%;height:100%;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;background-color:var(--kit-avatar-bg);color:var(--kit-avatar-fg)}.avatar__content img{width:100%;height:100%;object-fit:cover;display:block}:host([data-surface=transparent]) .avatar__content{background-color:transparent}:host([data-size=small]) .avatar{width:24px;height:24px;font-size:.625rem;--kit-avatar-ring-width: 1px}:host([data-size=medium]) .avatar{width:32px;height:32px;font-size:.75rem;--kit-avatar-ring-width: 2px}:host([data-size=large]) .avatar{width:48px;height:48px;font-size:1rem;--kit-avatar-ring-width: 4px}:host([data-contrast=dark]) .avatar{--kit-avatar-bg: var(--neutral-base);--kit-avatar-fg: var(--primary-contrast)}:host([data-contrast=light]) .avatar{--kit-avatar-bg: var(--primary-contrast);--kit-avatar-fg: var(--neutral-base)}:host([data-contrast=variant]) .avatar{--kit-avatar-bg: var(--primary-base);--kit-avatar-fg: var(--primary-contrast)}:host([data-contrast=on-brand]) .avatar{--kit-avatar-bg: var(--primary-contrast);--kit-avatar-fg: var(--primary-base)}:host([data-ring]) .avatar{padding:var(--kit-avatar-ring-width);background:conic-gradient(from 180deg,var(--kit-avatar-fg) var(--kit-avatar-progress, 0%),var(--kit-avatar-bg) 0)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], contrast: [{ type: i0.Input, args: [{ isSignal: true, alias: "contrast", required: false }] }], percentage: [{ type: i0.Input, args: [{ isSignal: true, alias: "percentage", required: false }] }], transparent: [{ type: i0.Input, args: [{ isSignal: true, alias: "transparent", required: false }] }] } });

/**
 * Avatar com imagem.
 *
 * ```html
 * <creamy-kit-avatar-image src="foto.jpg" alt="Luiz" size="large" />
 * ```
 */
class AvatarImageComponent {
    /** URL da imagem. */
    src = input.required(...(ngDevMode ? [{ debugName: "src" }] : /* istanbul ignore next */ []));
    /** Texto alternativo acessível. */
    alt = input.required(...(ngDevMode ? [{ debugName: "alt" }] : /* istanbul ignore next */ []));
    /** Tamanho do avatar. @default 'medium' */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** Contraste de cor (usado no anel de progresso). @default 'dark' */
    contrast = input('dark', ...(ngDevMode ? [{ debugName: "contrast" }] : /* istanbul ignore next */ []));
    /** Anel de progresso (0–100). @default 0 */
    percentage = input(0, ...(ngDevMode ? [{ debugName: "percentage" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarImageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: AvatarImageComponent, isStandalone: true, selector: "creamy-kit-avatar-image", inputs: { src: { classPropertyName: "src", publicName: "src", isSignal: true, isRequired: true, transformFunction: null }, alt: { classPropertyName: "alt", publicName: "alt", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, contrast: { classPropertyName: "contrast", publicName: "contrast", isSignal: true, isRequired: false, transformFunction: null }, percentage: { classPropertyName: "percentage", publicName: "percentage", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <creamy-kit-avatar-shell
      transparent
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      <img [src]="src()" [alt]="alt()" />
    </creamy-kit-avatar-shell>
  `, isInline: true, dependencies: [{ kind: "component", type: AvatarShellComponent, selector: "creamy-kit-avatar-shell", inputs: ["size", "contrast", "percentage", "transparent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarImageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'creamy-kit-avatar-image',
                    standalone: true,
                    imports: [AvatarShellComponent],
                    template: `
    <creamy-kit-avatar-shell
      transparent
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      <img [src]="src()" [alt]="alt()" />
    </creamy-kit-avatar-shell>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { src: [{ type: i0.Input, args: [{ isSignal: true, alias: "src", required: true }] }], alt: [{ type: i0.Input, args: [{ isSignal: true, alias: "alt", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], contrast: [{ type: i0.Input, args: [{ isSignal: true, alias: "contrast", required: false }] }], percentage: [{ type: i0.Input, args: [{ isSignal: true, alias: "percentage", required: false }] }] } });

/**
 * Header de busca: barra de busca (`kit-search`) com microfone, precedida por
 * um botão de voltar ou um avatar.
 *
 * ```html
 * <creamy-kit-header-search placeholder="Buscar" avatarSrc="foto.jpg" />
 * ```
 */
class HeaderSearchComponent extends HeaderBase {
    /** Exibe o botão de voltar à esquerda. */
    back = input(false, { ...(ngDevMode ? { debugName: "back" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Placeholder da busca. */
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    /** URL do avatar (exibido quando não há botão de voltar). */
    avatarSrc = input('', ...(ngDevMode ? [{ debugName: "avatarSrc" }] : /* istanbul ignore next */ []));
    /** Emitido ao clicar em voltar. */
    backClick = output();
    /** Emitido ao clicar no avatar. */
    avatarClick = output();
    /** Emitido ao clicar no microfone. */
    micClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderSearchComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: HeaderSearchComponent, isStandalone: true, selector: "creamy-kit-header-search", inputs: { back: { classPropertyName: "back", publicName: "back", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, avatarSrc: { classPropertyName: "avatarSrc", publicName: "avatarSrc", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { backClick: "backClick", avatarClick: "avatarClick", micClick: "micClick" }, usesInheritance: true, ngImport: i0, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    @if (back()) {\n      <button type=\"button\" class=\"header__back\" aria-label=\"Voltar\" (click)=\"backClick.emit()\">\n        <creamy-kit-icon name=\"arrow_left\" [size]=\"20\" color=\"currentColor\" ariaLabel=\"\" />\n      </button>\n    } @else if (avatarSrc()) {\n      <creamy-kit-avatar-image\n        class=\"header__avatar\"\n        [src]=\"avatarSrc()\"\n        alt=\"Perfil\"\n        size=\"large\"\n        (click)=\"avatarClick.emit()\"\n      />\n    }\n\n    <creamy-kit-search class=\"header__search\" [placeholder]=\"placeholder()\">\n      <creamy-kit-icon\n        iconRight\n        name=\"microphone_base\"\n        [size]=\"24\"\n        color=\"currentColor\"\n        ariaLabel=\"Microfone\"\n        (click)=\"micClick.emit()\"\n      />\n    </creamy-kit-search>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__avatar{flex:0 0 auto;cursor:pointer}.header__search{flex:1 1 auto;min-width:0}\n"], dependencies: [{ kind: "component", type: AvatarImageComponent, selector: "creamy-kit-avatar-image", inputs: ["src", "alt", "size", "contrast", "percentage"] }, { kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }, { kind: "component", type: SearchComponent, selector: "creamy-kit-search", inputs: ["variant", "placeholder", "small", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-header-search', standalone: true, imports: [AvatarImageComponent, IconComponent, SearchComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    @if (back()) {\n      <button type=\"button\" class=\"header__back\" aria-label=\"Voltar\" (click)=\"backClick.emit()\">\n        <creamy-kit-icon name=\"arrow_left\" [size]=\"20\" color=\"currentColor\" ariaLabel=\"\" />\n      </button>\n    } @else if (avatarSrc()) {\n      <creamy-kit-avatar-image\n        class=\"header__avatar\"\n        [src]=\"avatarSrc()\"\n        alt=\"Perfil\"\n        size=\"large\"\n        (click)=\"avatarClick.emit()\"\n      />\n    }\n\n    <creamy-kit-search class=\"header__search\" [placeholder]=\"placeholder()\">\n      <creamy-kit-icon\n        iconRight\n        name=\"microphone_base\"\n        [size]=\"24\"\n        color=\"currentColor\"\n        ariaLabel=\"Microfone\"\n        (click)=\"micClick.emit()\"\n      />\n    </creamy-kit-search>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__avatar{flex:0 0 auto;cursor:pointer}.header__search{flex:1 1 auto;min-width:0}\n"] }]
        }], propDecorators: { back: [{ type: i0.Input, args: [{ isSignal: true, alias: "back", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], avatarSrc: [{ type: i0.Input, args: [{ isSignal: true, alias: "avatarSrc", required: false }] }], backClick: [{ type: i0.Output, args: ["backClick"] }], avatarClick: [{ type: i0.Output, args: ["avatarClick"] }], micClick: [{ type: i0.Output, args: ["micClick"] }] } });

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
class HeaderTitleComponent extends HeaderBase {
    /** Exibe o botão de voltar à esquerda. */
    back = input(false, { ...(ngDevMode ? { debugName: "back" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Título exibido. */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** Emitido ao clicar em voltar. */
    backClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderTitleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: HeaderTitleComponent, isStandalone: true, selector: "creamy-kit-header-title", inputs: { back: { classPropertyName: "back", publicName: "back", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { backClick: "backClick" }, usesInheritance: true, ngImport: i0, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    @if (back()) {\n      <button type=\"button\" class=\"header__back\" aria-label=\"Voltar\" (click)=\"backClick.emit()\">\n        <creamy-kit-icon name=\"arrow_left\" [size]=\"20\" color=\"currentColor\" ariaLabel=\"\" />\n      </button>\n    }\n\n    <span class=\"header__title\">{{ title() }}</span>\n\n    <div class=\"header__actions\"><ng-content select=\"[actions]\" /></div>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__title{flex:1 1 auto;min-width:0;font-size:18px;font-weight:500;color:var(--kit-header-fg)}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-header-title', standalone: true, imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    @if (back()) {\n      <button type=\"button\" class=\"header__back\" aria-label=\"Voltar\" (click)=\"backClick.emit()\">\n        <creamy-kit-icon name=\"arrow_left\" [size]=\"20\" color=\"currentColor\" ariaLabel=\"\" />\n      </button>\n    }\n\n    <span class=\"header__title\">{{ title() }}</span>\n\n    <div class=\"header__actions\"><ng-content select=\"[actions]\" /></div>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__title{flex:1 1 auto;min-width:0;font-size:18px;font-weight:500;color:var(--kit-header-fg)}\n"] }]
        }], propDecorators: { back: [{ type: i0.Input, args: [{ isSignal: true, alias: "back", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], backClick: [{ type: i0.Output, args: ["backClick"] }] } });

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
class HeaderLargeTitleComponent extends HeaderBase {
    /** Exibe o botão de voltar à esquerda. */
    back = input(false, { ...(ngDevMode ? { debugName: "back" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    /** Título grande. */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** "Small title" (overline) exibido acima do título grande. */
    subtitle = input('', ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
    /** Emitido ao clicar em voltar. */
    backClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderLargeTitleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: HeaderLargeTitleComponent, isStandalone: true, selector: "creamy-kit-header-large-title", inputs: { back: { classPropertyName: "back", publicName: "back", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, subtitle: { classPropertyName: "subtitle", publicName: "subtitle", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { backClick: "backClick" }, usesInheritance: true, ngImport: i0, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    @if (back()) {\n      <button type=\"button\" class=\"header__back\" aria-label=\"Voltar\" (click)=\"backClick.emit()\">\n        <creamy-kit-icon name=\"arrow_left\" [size]=\"20\" color=\"currentColor\" ariaLabel=\"\" />\n      </button>\n    }\n\n    <span class=\"header__spacer\"></span>\n\n    <div class=\"header__actions\"><ng-content select=\"[actions]\" /></div>\n  </div>\n\n  <div class=\"header__titles\">\n    @if (subtitle()) {\n      <span class=\"header__overline\">{{ subtitle() }}</span>\n    }\n    <span class=\"header__large\">{{ title() }}</span>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__titles{display:flex;flex-direction:column;gap:2px}.header__overline{font-size:13px;color:var(--kit-header-fg-2)}.header__large{font-size:24px;font-weight:600;color:var(--kit-header-fg)}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderLargeTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-header-large-title', standalone: true, imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    @if (back()) {\n      <button type=\"button\" class=\"header__back\" aria-label=\"Voltar\" (click)=\"backClick.emit()\">\n        <creamy-kit-icon name=\"arrow_left\" [size]=\"20\" color=\"currentColor\" ariaLabel=\"\" />\n      </button>\n    }\n\n    <span class=\"header__spacer\"></span>\n\n    <div class=\"header__actions\"><ng-content select=\"[actions]\" /></div>\n  </div>\n\n  <div class=\"header__titles\">\n    @if (subtitle()) {\n      <span class=\"header__overline\">{{ subtitle() }}</span>\n    }\n    <span class=\"header__large\">{{ title() }}</span>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__titles{display:flex;flex-direction:column;gap:2px}.header__overline{font-size:13px;color:var(--kit-header-fg-2)}.header__large{font-size:24px;font-weight:600;color:var(--kit-header-fg)}\n"] }]
        }], propDecorators: { back: [{ type: i0.Input, args: [{ isSignal: true, alias: "back", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], backClick: [{ type: i0.Output, args: ["backClick"] }] } });

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
class HeaderProfileComponent extends HeaderBase {
    /** Nome exibido. */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** Sub-texto exibido abaixo do nome. */
    subtitle = input('', ...(ngDevMode ? [{ debugName: "subtitle" }] : /* istanbul ignore next */ []));
    /** URL do avatar. */
    avatarSrc = input('', ...(ngDevMode ? [{ debugName: "avatarSrc" }] : /* istanbul ignore next */ []));
    /** Emitido ao clicar no avatar. */
    avatarClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderProfileComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: HeaderProfileComponent, isStandalone: true, selector: "creamy-kit-header-profile", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, subtitle: { classPropertyName: "subtitle", publicName: "subtitle", isSignal: true, isRequired: false, transformFunction: null }, avatarSrc: { classPropertyName: "avatarSrc", publicName: "avatarSrc", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { avatarClick: "avatarClick" }, usesInheritance: true, ngImport: i0, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    <creamy-kit-avatar-image\n      class=\"header__avatar\"\n      [src]=\"avatarSrc()\"\n      alt=\"Perfil\"\n      size=\"large\"\n      (click)=\"avatarClick.emit()\"\n    />\n\n    <div class=\"header__profile\">\n      <span class=\"header__name\">{{ title() }}</span>\n      @if (subtitle()) {\n        <span class=\"header__subtitle\">{{ subtitle() }}</span>\n      }\n    </div>\n\n    <div class=\"header__actions\"><ng-content select=\"[actions]\" /></div>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__avatar{flex:0 0 auto;cursor:pointer}.header__profile{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}.header__name{font-size:16px;font-weight:500;color:var(--kit-header-fg)}.header__subtitle{font-size:13px;color:var(--kit-header-fg-2)}\n"], dependencies: [{ kind: "component", type: AvatarImageComponent, selector: "creamy-kit-avatar-image", inputs: ["src", "alt", "size", "contrast", "percentage"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: HeaderProfileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-header-profile', standalone: true, imports: [AvatarImageComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"header\">\n  <div class=\"header__row\">\n    <creamy-kit-avatar-image\n      class=\"header__avatar\"\n      [src]=\"avatarSrc()\"\n      alt=\"Perfil\"\n      size=\"large\"\n      (click)=\"avatarClick.emit()\"\n    />\n\n    <div class=\"header__profile\">\n      <span class=\"header__name\">{{ title() }}</span>\n      @if (subtitle()) {\n        <span class=\"header__subtitle\">{{ subtitle() }}</span>\n      }\n    </div>\n\n    <div class=\"header__actions\"><ng-content select=\"[actions]\" /></div>\n  </div>\n</header>\n", styles: ["@charset \"UTF-8\";:host{display:block;width:100%}:host,:host([data-theme=brand]){--kit-header-bg: var(--primary-base);--kit-header-fg: var(--primary-contrast);--kit-header-fg-2: var(--primary-contrast)}:host([data-theme=light]){--kit-header-bg: var(--background-base);--kit-header-fg: var(--text-heading);--kit-header-fg-2: var(--text-body-2)}.header{width:100%;box-sizing:border-box;padding:12px 16px;background-color:var(--kit-header-bg);display:flex;flex-direction:column;gap:12px}.header__row{display:flex;align-items:center;gap:12px}.header__back{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;background:transparent;color:var(--kit-header-fg);cursor:pointer}.header__actions{flex:0 0 auto;display:inline-flex;align-items:center;gap:8px;color:var(--kit-header-fg)}.header__spacer{flex:1 1 auto}.header__avatar{flex:0 0 auto;cursor:pointer}.header__profile{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}.header__name{font-size:16px;font-weight:500;color:var(--kit-header-fg)}.header__subtitle{font-size:13px;color:var(--kit-header-fg-2)}\n"] }]
        }], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], subtitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], avatarSrc: [{ type: i0.Input, args: [{ isSignal: true, alias: "avatarSrc", required: false }] }], avatarClick: [{ type: i0.Output, args: ["avatarClick"] }] } });

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
class AlertComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /** Semântica de cor. @default 'information' */
    feedback = input('information', ...(ngDevMode ? [{ debugName: "feedback" }] : /* istanbul ignore next */ []));
    /** Título exibido em destaque no topo do bloco de conteúdo. */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** Texto do link de ação. Se vazio, usa o próprio `linkHref`. */
    linkText = input('', ...(ngDevMode ? [{ debugName: "linkText" }] : /* istanbul ignore next */ []));
    /** Destino (href) do link. O link só é renderizado quando definido. */
    linkHref = input('', ...(ngDevMode ? [{ debugName: "linkHref" }] : /* istanbul ignore next */ []));
    /** Emitido quando o usuário fecha o alerta. */
    closed = output();
    dismissed = signal(false, ...(ngDevMode ? [{ debugName: "dismissed" }] : /* istanbul ignore next */ []));
    dismiss() {
        this.dismissed.set(true);
        this.closed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AlertComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: AlertComponent, isStandalone: true, selector: "creamy-kit-alert", inputs: { feedback: { classPropertyName: "feedback", publicName: "feedback", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, linkText: { classPropertyName: "linkText", publicName: "linkText", isSignal: true, isRequired: false, transformFunction: null }, linkHref: { classPropertyName: "linkHref", publicName: "linkHref", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed" }, host: { attributes: { "role": "alert" }, properties: { "attr.data-feedback": "feedback()" } }, ngImport: i0, template: "@if (!dismissed()) {\n  <div class=\"alert\">\n    <span class=\"alert__icon\" aria-hidden=\"true\"></span>\n\n    <div class=\"alert__body\">\n      @if (title()) {\n        <strong class=\"alert__title\">{{ title() }}</strong>\n      }\n\n      <span class=\"alert__content\">\n        <ng-content />\n      </span>\n\n      @if (linkHref()) {\n        <a class=\"alert__link\" [href]=\"linkHref()\">\n          {{ linkText() || linkHref() }}\n        </a>\n      }\n    </div>\n\n    <button\n      type=\"button\"\n      class=\"alert__close\"\n      aria-label=\"Fechar\"\n      (click)=\"dismiss()\"\n    >\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\">\n        <path\n          d=\"M4 4l8 8M12 4l-8 8\"\n          stroke=\"currentColor\"\n          stroke-width=\"1.5\"\n          stroke-linecap=\"round\"\n        />\n      </svg>\n    </button>\n  </div>\n}\n", styles: [":host{display:block;width:100%;--kit-alert-accent: var(--feedbacks-information)}:host([data-feedback=information]){--kit-alert-accent: var(--feedbacks-information)}:host([data-feedback=success]){--kit-alert-accent: var(--feedbacks-success-variant-2)}:host([data-feedback=error]){--kit-alert-accent: var(--feedbacks-error)}.alert{display:flex;align-items:center;gap:16px;padding:16px;border-radius:25px;border:1px solid var(--kit-alert-accent);background:transparent;color:var(--text-body);font-size:.95rem;line-height:1.4;box-sizing:border-box}.alert__icon{flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:var(--kit-alert-accent)}.alert__body{flex:1 1 auto;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;gap:4px}.alert__title{font-weight:500;color:var(--text-heading-2, #484848)}.alert__content{display:block;font-weight:400;color:var(--text-heading-2)}.alert__link{font-weight:400;text-decoration:underline;cursor:pointer;color:var(--feedbacks-information)}.alert__close{flex:0 0 auto;align-self:flex-start;width:16px;height:16px;padding:0;border:none;background:transparent;color:var(--text-body-2);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.alert__close:hover{color:var(--text-body)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-alert', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'alert',
                        '[attr.data-feedback]': 'feedback()',
                    }, template: "@if (!dismissed()) {\n  <div class=\"alert\">\n    <span class=\"alert__icon\" aria-hidden=\"true\"></span>\n\n    <div class=\"alert__body\">\n      @if (title()) {\n        <strong class=\"alert__title\">{{ title() }}</strong>\n      }\n\n      <span class=\"alert__content\">\n        <ng-content />\n      </span>\n\n      @if (linkHref()) {\n        <a class=\"alert__link\" [href]=\"linkHref()\">\n          {{ linkText() || linkHref() }}\n        </a>\n      }\n    </div>\n\n    <button\n      type=\"button\"\n      class=\"alert__close\"\n      aria-label=\"Fechar\"\n      (click)=\"dismiss()\"\n    >\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\">\n        <path\n          d=\"M4 4l8 8M12 4l-8 8\"\n          stroke=\"currentColor\"\n          stroke-width=\"1.5\"\n          stroke-linecap=\"round\"\n        />\n      </svg>\n    </button>\n  </div>\n}\n", styles: [":host{display:block;width:100%;--kit-alert-accent: var(--feedbacks-information)}:host([data-feedback=information]){--kit-alert-accent: var(--feedbacks-information)}:host([data-feedback=success]){--kit-alert-accent: var(--feedbacks-success-variant-2)}:host([data-feedback=error]){--kit-alert-accent: var(--feedbacks-error)}.alert{display:flex;align-items:center;gap:16px;padding:16px;border-radius:25px;border:1px solid var(--kit-alert-accent);background:transparent;color:var(--text-body);font-size:.95rem;line-height:1.4;box-sizing:border-box}.alert__icon{flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:var(--kit-alert-accent)}.alert__body{flex:1 1 auto;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;gap:4px}.alert__title{font-weight:500;color:var(--text-heading-2, #484848)}.alert__content{display:block;font-weight:400;color:var(--text-heading-2)}.alert__link{font-weight:400;text-decoration:underline;cursor:pointer;color:var(--feedbacks-information)}.alert__close{flex:0 0 auto;align-self:flex-start;width:16px;height:16px;padding:0;border:none;background:transparent;color:var(--text-body-2);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.alert__close:hover{color:var(--text-body)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { feedback: [{ type: i0.Input, args: [{ isSignal: true, alias: "feedback", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], linkText: [{ type: i0.Input, args: [{ isSignal: true, alias: "linkText", required: false }] }], linkHref: [{ type: i0.Input, args: [{ isSignal: true, alias: "linkHref", required: false }] }], closed: [{ type: i0.Output, args: ["closed"] }] } });

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
class SnackbarComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /** Semântica de cor. @default 'information' */
    feedback = input('information', ...(ngDevMode ? [{ debugName: "feedback" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SnackbarComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: SnackbarComponent, isStandalone: true, selector: "creamy-kit-snackbar", inputs: { feedback: { classPropertyName: "feedback", publicName: "feedback", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "status" }, properties: { "attr.data-feedback": "feedback()" } }, ngImport: i0, template: "<div class=\"snackbar\">\n  <span class=\"snackbar__icon\" aria-hidden=\"true\"></span>\n  <span class=\"snackbar__content\">\n    <ng-content />\n  </span>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:auto;--kit-snackbar-bg: var(--feedbacks-information);--kit-snackbar-fg: var(--primary-contrast)}:host([data-feedback=information]){--kit-snackbar-bg: var(--feedbacks-information)}:host([data-feedback=success]){--kit-snackbar-bg: var(--feedbacks-success-variant-2)}:host([data-feedback=error]){--kit-snackbar-bg: var(--feedbacks-error)}:host([data-feedback=black]){--kit-snackbar-bg: var(--black, #000000)}:host([data-feedback=warning]){--kit-snackbar-bg: var(--feedbacks-alert);--kit-snackbar-fg: var(--text-body)}:host([data-feedback=white]){--kit-snackbar-bg: var(--white, #ffffff);--kit-snackbar-fg: var(--text-body)}.snackbar{display:flex;align-items:center;gap:.75rem;padding:.75rem 1.125rem;border-radius:16px;background:var(--kit-snackbar-bg);color:var(--kit-snackbar-fg);box-shadow:0 6px 16px #0000002e;font-size:.95rem;line-height:1.4;box-sizing:border-box}.snackbar__icon{flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:var(--kit-snackbar-fg)}.snackbar__content{display:block;font-weight:400}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SnackbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-snackbar', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'status',
                        '[attr.data-feedback]': 'feedback()',
                    }, template: "<div class=\"snackbar\">\n  <span class=\"snackbar__icon\" aria-hidden=\"true\"></span>\n  <span class=\"snackbar__content\">\n    <ng-content />\n  </span>\n</div>\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:auto;--kit-snackbar-bg: var(--feedbacks-information);--kit-snackbar-fg: var(--primary-contrast)}:host([data-feedback=information]){--kit-snackbar-bg: var(--feedbacks-information)}:host([data-feedback=success]){--kit-snackbar-bg: var(--feedbacks-success-variant-2)}:host([data-feedback=error]){--kit-snackbar-bg: var(--feedbacks-error)}:host([data-feedback=black]){--kit-snackbar-bg: var(--black, #000000)}:host([data-feedback=warning]){--kit-snackbar-bg: var(--feedbacks-alert);--kit-snackbar-fg: var(--text-body)}:host([data-feedback=white]){--kit-snackbar-bg: var(--white, #ffffff);--kit-snackbar-fg: var(--text-body)}.snackbar{display:flex;align-items:center;gap:.75rem;padding:.75rem 1.125rem;border-radius:16px;background:var(--kit-snackbar-bg);color:var(--kit-snackbar-fg);box-shadow:0 6px 16px #0000002e;font-size:.95rem;line-height:1.4;box-sizing:border-box}.snackbar__icon{flex:0 0 auto;width:20px;height:20px;border-radius:50%;background:var(--kit-snackbar-fg)}.snackbar__content{display:block;font-weight:400}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { feedback: [{ type: i0.Input, args: [{ isSignal: true, alias: "feedback", required: false }] }] } });

/**
 * Base abstrata com os inputs compartilhados pelas variações de Banner
 * (content, tag e card). Não use diretamente — estenda nas variações.
 * O tipo `BannerSize` é público.
 */
class BannerBase {
    /** Tamanho do ícone. @default 'medium' */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** Título exibido em destaque. */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** Descrição exibida abaixo do título (10px). */
    description = input('', ...(ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []));
    /** Nome do ícone (em `creamy-kit-resources/icons`, sem extensão). */
    iconName = input('', ...(ngDevMode ? [{ debugName: "iconName" }] : /* istanbul ignore next */ []));
    /** Token de cor do ícone, ex.: `--feedbacks-success-variant-2`. */
    iconColor = input('--feedbacks-information', ...(ngDevMode ? [{ debugName: "iconColor" }] : /* istanbul ignore next */ []));
    /** Estado desabilitado. @default false */
    disabled = input(false, { ...(ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), transform: booleanAttribute });
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.2.16", type: BannerBase, isStandalone: true, inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, iconName: { classPropertyName: "iconName", publicName: "iconName", isSignal: true, isRequired: false, transformFunction: null }, iconColor: { classPropertyName: "iconColor", publicName: "iconColor", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerBase, decorators: [{
            type: Directive
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }], iconName: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconName", required: false }] }], iconColor: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconColor", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

const BANNER_ICON_PX = {
    small: 16,
    medium: 24,
    large: 32,
};
/**
 * Casca (shell) compartilhada das variações de Banner.
 *
 * Uso **interno**: renderiza a faixa (ícone + título + descrição) e expõe um
 * slot `[trailing]` para o elemento à direita de cada variação.
 */
class BannerShellComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    description = input('', ...(ngDevMode ? [{ debugName: "description" }] : /* istanbul ignore next */ []));
    iconName = input('', ...(ngDevMode ? [{ debugName: "iconName" }] : /* istanbul ignore next */ []));
    iconColor = input('--feedbacks-information', ...(ngDevMode ? [{ debugName: "iconColor" }] : /* istanbul ignore next */ []));
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
    iconColorCss = computed(() => this.disabled() ? 'var(--disabled-variant)' : `var(${this.iconColor()})`, ...(ngDevMode ? [{ debugName: "iconColorCss" }] : /* istanbul ignore next */ []));
    iconSizePx = computed(() => BANNER_ICON_PX[this.size()], ...(ngDevMode ? [{ debugName: "iconSizePx" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerShellComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: BannerShellComponent, isStandalone: true, selector: "creamy-kit-banner-shell", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, iconName: { classPropertyName: "iconName", publicName: "iconName", isSignal: true, isRequired: false, transformFunction: null }, iconColor: { classPropertyName: "iconColor", publicName: "iconColor", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-size": "size()", "attr.data-disabled": "disabled() ? '' : null" } }, ngImport: i0, template: `
    <div class="banner">
      <span class="banner__icon" [style.color]="iconColorCss()">
        @if (iconName()) {
          <creamy-kit-icon [name]="iconName()" [size]="iconSizePx()" [color]="iconColorCss()" />
        } @else {
          <ng-content select="[icon]" />
        }
      </span>

      <div class="banner__body">
        @if (title()) {
          <strong class="banner__title">{{ title() }}</strong>
        }
        @if (description()) {
          <span class="banner__description">{{ description() }}</span>
        }
      </div>

      <ng-content select="[trailing]" />
    </div>
  `, isInline: true, styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.banner{display:flex;align-items:center;gap:12px;width:100%;padding:16px;border-radius:16px;background-color:var(--background-base);font-size:.95rem;line-height:1.4;box-sizing:border-box;--kit-banner-trailing: var(--text-heading-2)}.banner__icon{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center}.banner__icon svg,.banner__icon img{width:100%;height:100%;display:block}:host([data-size=small]) .banner__icon{width:16px;height:16px}:host([data-size=medium]) .banner__icon{width:24px;height:24px}:host([data-size=large]) .banner__icon{width:32px;height:32px}.banner__body{flex:1 1 auto;display:flex;flex-direction:column;gap:4px}.banner__title{font-weight:500;color:var(--text-heading-2, #484848)}.banner__description{display:block;font-weight:400;font-size:10px;color:var(--text-heading-2)}:host([data-disabled]) .banner{background-color:var(--background-variant-2);--kit-banner-trailing: var(--disabled-variant)}:host([data-disabled]) .banner__title,:host([data-disabled]) .banner__description{color:var(--disabled-variant)}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerShellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-banner-shell', standalone: true, imports: [IconComponent], template: `
    <div class="banner">
      <span class="banner__icon" [style.color]="iconColorCss()">
        @if (iconName()) {
          <creamy-kit-icon [name]="iconName()" [size]="iconSizePx()" [color]="iconColorCss()" />
        } @else {
          <ng-content select="[icon]" />
        }
      </span>

      <div class="banner__body">
        @if (title()) {
          <strong class="banner__title">{{ title() }}</strong>
        }
        @if (description()) {
          <span class="banner__description">{{ description() }}</span>
        }
      </div>

      <ng-content select="[trailing]" />
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-size]': 'size()',
                        '[attr.data-disabled]': "disabled() ? '' : null",
                    }, styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.banner{display:flex;align-items:center;gap:12px;width:100%;padding:16px;border-radius:16px;background-color:var(--background-base);font-size:.95rem;line-height:1.4;box-sizing:border-box;--kit-banner-trailing: var(--text-heading-2)}.banner__icon{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center}.banner__icon svg,.banner__icon img{width:100%;height:100%;display:block}:host([data-size=small]) .banner__icon{width:16px;height:16px}:host([data-size=medium]) .banner__icon{width:24px;height:24px}:host([data-size=large]) .banner__icon{width:32px;height:32px}.banner__body{flex:1 1 auto;display:flex;flex-direction:column;gap:4px}.banner__title{font-weight:500;color:var(--text-heading-2, #484848)}.banner__description{display:block;font-weight:400;font-size:10px;color:var(--text-heading-2)}:host([data-disabled]) .banner{background-color:var(--background-variant-2);--kit-banner-trailing: var(--disabled-variant)}:host([data-disabled]) .banner__title,:host([data-disabled]) .banner__description{color:var(--disabled-variant)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: false }] }], iconName: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconName", required: false }] }], iconColor: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconColor", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] } });

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
class BannerComponent extends BannerBase {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: BannerComponent, isStandalone: true, selector: "creamy-kit-banner", usesInheritance: true, ngImport: i0, template: `
    <creamy-kit-banner-shell
      [size]="size()"
      [title]="title()"
      [description]="description()"
      [iconName]="iconName()"
      [iconColor]="iconColor()"
      [disabled]="disabled()"
    >
      <span trailing class="banner__chevron" aria-hidden="true"></span>
    </creamy-kit-banner-shell>
  `, isInline: true, styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.banner__chevron{display:inline-block;flex:0 0 auto;width:16px;height:16px;background-color:currentColor;-webkit-mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;color:var(--kit-banner-trailing)}\n"], dependencies: [{ kind: "component", type: BannerShellComponent, selector: "creamy-kit-banner-shell", inputs: ["size", "title", "description", "iconName", "iconColor", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-banner', standalone: true, imports: [BannerShellComponent], template: `
    <creamy-kit-banner-shell
      [size]="size()"
      [title]="title()"
      [description]="description()"
      [iconName]="iconName()"
      [iconColor]="iconColor()"
      [disabled]="disabled()"
    >
      <span trailing class="banner__chevron" aria-hidden="true"></span>
    </creamy-kit-banner-shell>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["@charset \"UTF-8\";:host{display:block;width:100%}.banner__chevron{display:inline-block;flex:0 0 auto;width:16px;height:16px;background-color:currentColor;-webkit-mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;mask:url(https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main/icons/arrow_right.svg) no-repeat center/contain;color:var(--kit-banner-trailing)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }] });

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
class BannerTagComponent extends BannerBase {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /** Valor exibido à direita, no topo. */
    tagValue = input('', ...(ngDevMode ? [{ debugName: "tagValue" }] : /* istanbul ignore next */ []));
    /** Label exibida à direita, abaixo do valor. */
    tagLabel = input('', ...(ngDevMode ? [{ debugName: "tagLabel" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerTagComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: BannerTagComponent, isStandalone: true, selector: "creamy-kit-banner-tag", inputs: { tagValue: { classPropertyName: "tagValue", publicName: "tagValue", isSignal: true, isRequired: false, transformFunction: null }, tagLabel: { classPropertyName: "tagLabel", publicName: "tagLabel", isSignal: true, isRequired: false, transformFunction: null } }, usesInheritance: true, ngImport: i0, template: `
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
    </creamy-kit-banner-shell>
  `, isInline: true, styles: [":host{display:block;width:100%}.banner__tag{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;text-align:right;gap:2px}.banner__tag-value{height:16px;display:inline-flex;align-items:center;font-size:.75rem;color:var(--feedbacks-alert-contrast)}.banner__tag-label{font-size:10px;line-height:1;color:var(--text-body-2)}\n"], dependencies: [{ kind: "component", type: BannerShellComponent, selector: "creamy-kit-banner-shell", inputs: ["size", "title", "description", "iconName", "iconColor", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerTagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-banner-tag', standalone: true, imports: [BannerShellComponent], template: `
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
    </creamy-kit-banner-shell>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block;width:100%}.banner__tag{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;text-align:right;gap:2px}.banner__tag-value{height:16px;display:inline-flex;align-items:center;font-size:.75rem;color:var(--feedbacks-alert-contrast)}.banner__tag-label{font-size:10px;line-height:1;color:var(--text-body-2)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { tagValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagValue", required: false }] }], tagLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagLabel", required: false }] }] } });

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
class BannerCardComponent extends BannerBase {
    themeService;
    constructor(themeService) {
        super();
        this.themeService = themeService;
    }
    /** Nome do ícone à direita (em `creamy-kit-resources/icons`, sem extensão). */
    trailingIconName = input('', ...(ngDevMode ? [{ debugName: "trailingIconName" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerCardComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: BannerCardComponent, isStandalone: true, selector: "creamy-kit-banner-card", inputs: { trailingIconName: { classPropertyName: "trailingIconName", publicName: "trailingIconName", isSignal: true, isRequired: false, transformFunction: null } }, usesInheritance: true, ngImport: i0, template: `
    <creamy-kit-banner-shell
      [size]="size()"
      [title]="title()"
      [description]="description()"
      [iconName]="iconName()"
      [iconColor]="iconColor()"
      [disabled]="disabled()"
    >
      @if (trailingIconName()) {
        <span trailing class="banner__trailing">
          <creamy-kit-icon [name]="trailingIconName()" [size]="20" color="currentColor" />
        </span>
      }
    </creamy-kit-banner-shell>
  `, isInline: true, styles: [":host{display:block;width:100%}.banner__trailing{flex:0 0 auto;display:inline-flex;align-items:center;color:var(--kit-banner-trailing)}\n"], dependencies: [{ kind: "component", type: BannerShellComponent, selector: "creamy-kit-banner-shell", inputs: ["size", "title", "description", "iconName", "iconColor", "disabled"] }, { kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BannerCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-banner-card', standalone: true, imports: [BannerShellComponent, IconComponent], template: `
    <creamy-kit-banner-shell
      [size]="size()"
      [title]="title()"
      [description]="description()"
      [iconName]="iconName()"
      [iconColor]="iconColor()"
      [disabled]="disabled()"
    >
      @if (trailingIconName()) {
        <span trailing class="banner__trailing">
          <creamy-kit-icon [name]="trailingIconName()" [size]="20" color="currentColor" />
        </span>
      }
    </creamy-kit-banner-shell>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block;width:100%}.banner__trailing{flex:0 0 auto;display:inline-flex;align-items:center;color:var(--kit-banner-trailing)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { trailingIconName: [{ type: i0.Input, args: [{ isSignal: true, alias: "trailingIconName", required: false }] }] } });

/**
 * Tamanho (px) do ícone central por size (18% da caixa, maior respiro de ~5-6px).
 */
const ICON_PX$1 = {
    xsmall: 3,
    small: 4,
    medium: 6,
    large: 12,
    xlarge: 24,
};
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
class LoadingComponent {
    icon = input('circle_variant', ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    variant = input('primary', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    showIcon = input(true, ...(ngDevMode ? [{ debugName: "showIcon" }] : /* istanbul ignore next */ []));
    ariaLabel = input('Carregando', ...(ngDevMode ? [{ debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
    /** Tamanho (px) do ícone central conforme o `size`. */
    iconPx = computed(() => ICON_PX$1[this.size()], ...(ngDevMode ? [{ debugName: "iconPx" }] : /* istanbul ignore next */ []));
    /** Classes do host (`kit-loading` + modificadores de size/variant). */
    hostClass = computed(() => `kit-loading kit-loading--${this.size()} kit-loading--${this.variant()}`, ...(ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: LoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: LoadingComponent, isStandalone: true, selector: "creamy-kit-loading", inputs: { icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, showIcon: { classPropertyName: "showIcon", publicName: "showIcon", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "status", "aria-live": "polite" }, properties: { "attr.aria-label": "ariaLabel()", "class": "hostClass()" } }, ngImport: i0, template: "<svg\n  class=\"kit-loading__spokes\"\n  viewBox=\"0 0 20 20\"\n  fill=\"none\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n  aria-hidden=\"true\"\n>\n  <!-- 8 tra\u00E7os em sentido hor\u00E1rio a partir do topo (N) -->\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 0\" d=\"M10 3V6.01778\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 1\" d=\"M14.9467 5.05334L12.8156 7.18446\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 2\" d=\"M13.9822 10H17\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 3\" d=\"M12.8156 12.8156L14.9467 14.9467\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 4\" d=\"M10 13.9822V17\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 5\" d=\"M7.18446 12.8156L5.05334 14.9467\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 6\" d=\"M3 10H6.01778\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 7\" d=\"M5.05334 5.05334L7.18446 7.18446\" />\n</svg>\n\n@if (showIcon()) {\n  <creamy-kit-icon class=\"kit-loading__icon\" [name]=\"icon()\" [size]=\"iconPx()\" />\n}\n", styles: ["@charset \"UTF-8\";:host{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;line-height:0;vertical-align:middle;--kit-loading-duration: 1s;--kit-loading-min-opacity: .18}:host.kit-loading--xsmall{width:16px;height:16px}:host.kit-loading--small{width:24px;height:24px}:host.kit-loading--medium{width:32px;height:32px}:host.kit-loading--large{width:64px;height:64px}:host.kit-loading--xlarge{width:128px;height:128px}:host.kit-loading--primary{color:var(--primary-base, #128cfe)}:host.kit-loading--neutral{color:var(--neutral-base, #484848)}:host.kit-loading--on-brand{color:var(--white, #ffffff)}.kit-loading__spokes{position:absolute;inset:0;margin:auto;width:70%;height:70%;display:block;overflow:visible}.kit-loading__spoke{stroke:currentColor;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;opacity:var(--kit-loading-min-opacity);animation:kit-loading-comet var(--kit-loading-duration) linear infinite;animation-delay:calc((var(--spoke) - 8) * var(--kit-loading-duration) / 8)}.kit-loading__icon{position:relative;z-index:1}@keyframes kit-loading-comet{0%{opacity:1}to{opacity:var(--kit-loading-min-opacity)}}@media(prefers-reduced-motion:reduce){.kit-loading__spoke{animation-duration:2.4s}}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-loading', standalone: true, imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'status',
                        'aria-live': 'polite',
                        '[attr.aria-label]': 'ariaLabel()',
                        '[class]': 'hostClass()',
                    }, template: "<svg\n  class=\"kit-loading__spokes\"\n  viewBox=\"0 0 20 20\"\n  fill=\"none\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n  aria-hidden=\"true\"\n>\n  <!-- 8 tra\u00E7os em sentido hor\u00E1rio a partir do topo (N) -->\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 0\" d=\"M10 3V6.01778\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 1\" d=\"M14.9467 5.05334L12.8156 7.18446\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 2\" d=\"M13.9822 10H17\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 3\" d=\"M12.8156 12.8156L14.9467 14.9467\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 4\" d=\"M10 13.9822V17\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 5\" d=\"M7.18446 12.8156L5.05334 14.9467\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 6\" d=\"M3 10H6.01778\" />\n  <path class=\"kit-loading__spoke\" style=\"--spoke: 7\" d=\"M5.05334 5.05334L7.18446 7.18446\" />\n</svg>\n\n@if (showIcon()) {\n  <creamy-kit-icon class=\"kit-loading__icon\" [name]=\"icon()\" [size]=\"iconPx()\" />\n}\n", styles: ["@charset \"UTF-8\";:host{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;line-height:0;vertical-align:middle;--kit-loading-duration: 1s;--kit-loading-min-opacity: .18}:host.kit-loading--xsmall{width:16px;height:16px}:host.kit-loading--small{width:24px;height:24px}:host.kit-loading--medium{width:32px;height:32px}:host.kit-loading--large{width:64px;height:64px}:host.kit-loading--xlarge{width:128px;height:128px}:host.kit-loading--primary{color:var(--primary-base, #128cfe)}:host.kit-loading--neutral{color:var(--neutral-base, #484848)}:host.kit-loading--on-brand{color:var(--white, #ffffff)}.kit-loading__spokes{position:absolute;inset:0;margin:auto;width:70%;height:70%;display:block;overflow:visible}.kit-loading__spoke{stroke:currentColor;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;opacity:var(--kit-loading-min-opacity);animation:kit-loading-comet var(--kit-loading-duration) linear infinite;animation-delay:calc((var(--spoke) - 8) * var(--kit-loading-duration) / 8)}.kit-loading__icon{position:relative;z-index:1}@keyframes kit-loading-comet{0%{opacity:1}to{opacity:var(--kit-loading-min-opacity)}}@media(prefers-reduced-motion:reduce){.kit-loading__spoke{animation-duration:2.4s}}\n"] }]
        }], propDecorators: { icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], showIcon: [{ type: i0.Input, args: [{ isSignal: true, alias: "showIcon", required: false }] }], ariaLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }] } });

/**
 * Componente de Progress do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
class ProgressComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ProgressComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: ProgressComponent, isStandalone: true, selector: "creamy-kit-progress", ngImport: i0, template: "<p>progress works!</p>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-progress', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p>progress works!</p>\n" }]
        }] });

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
class TooltipComponent {
    text = input('', ...(ngDevMode ? [{ debugName: "text" }] : /* istanbul ignore next */ []));
    icon = input(...(ngDevMode ? [undefined, { debugName: "icon" }] : /* istanbul ignore next */ []));
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
    /** Classes do host (`kit-tooltip` + modificador de variante). */
    hostClass = computed(() => `kit-tooltip kit-tooltip--${this.variant()}`, ...(ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: TooltipComponent, isStandalone: true, selector: "creamy-kit-tooltip", inputs: { text: { classPropertyName: "text", publicName: "text", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class": "hostClass()" } }, ngImport: i0, template: "<div class=\"kit-tooltip__content\">\n  @if (icon()) {\n    <creamy-kit-icon\n      [name]=\"icon()!\"\n      [size]=\"20\"\n      class=\"kit-tooltip__icon\"\n    />\n  }\n  <span class=\"kit-tooltip__text\">{{ text() }}</span>\n</div>\n", styles: ["@charset \"UTF-8\";:host{--kit-tooltip-bg: var(--background-variant, #f2f2f4);--kit-tooltip-fg: var(--text-heading-2, #484848);--kit-tooltip-bg-contrast: var(--text-heading-2, #484848);--kit-tooltip-fg-contrast: var(--action-neutral-base, #f0f0f0);display:inline-flex;align-items:center;justify-content:center;width:fit-content;height:44px;padding:0 8px;border-radius:22px;box-sizing:border-box;background:var(--kit-tooltip-bg);color:var(--kit-tooltip-fg)}:host.kit-tooltip--default{background:var(--kit-tooltip-bg);color:var(--kit-tooltip-fg)}:host.kit-tooltip--contrast{background:var(--kit-tooltip-bg-contrast);color:var(--kit-tooltip-fg-contrast)}.kit-tooltip__content{display:flex;align-items:center;gap:8px}.kit-tooltip__icon{flex-shrink:0;width:20px;height:20px}.kit-tooltip__text{font-size:.75rem;font-weight:500;color:currentColor;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-tooltip', standalone: true, imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': 'hostClass()',
                    }, template: "<div class=\"kit-tooltip__content\">\n  @if (icon()) {\n    <creamy-kit-icon\n      [name]=\"icon()!\"\n      [size]=\"20\"\n      class=\"kit-tooltip__icon\"\n    />\n  }\n  <span class=\"kit-tooltip__text\">{{ text() }}</span>\n</div>\n", styles: ["@charset \"UTF-8\";:host{--kit-tooltip-bg: var(--background-variant, #f2f2f4);--kit-tooltip-fg: var(--text-heading-2, #484848);--kit-tooltip-bg-contrast: var(--text-heading-2, #484848);--kit-tooltip-fg-contrast: var(--action-neutral-base, #f0f0f0);display:inline-flex;align-items:center;justify-content:center;width:fit-content;height:44px;padding:0 8px;border-radius:22px;box-sizing:border-box;background:var(--kit-tooltip-bg);color:var(--kit-tooltip-fg)}:host.kit-tooltip--default{background:var(--kit-tooltip-bg);color:var(--kit-tooltip-fg)}:host.kit-tooltip--contrast{background:var(--kit-tooltip-bg-contrast);color:var(--kit-tooltip-fg-contrast)}.kit-tooltip__content{display:flex;align-items:center;gap:8px}.kit-tooltip__icon{flex-shrink:0;width:20px;height:20px}.kit-tooltip__text{font-size:.75rem;font-weight:500;color:currentColor;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n"] }]
        }], propDecorators: { text: [{ type: i0.Input, args: [{ isSignal: true, alias: "text", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }] } });

/**
 * Componente de Modal do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
class ModalComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: ModalComponent, isStandalone: true, selector: "creamy-kit-modal", ngImport: i0, template: "<p>modal works!</p>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-modal', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p>modal works!</p>\n" }]
        }] });

/**
 * Componente de Sheets (bottom sheet) do Creamy Kit.
 *
 * ⚠️ Em construção (WIP) — ainda sem implementação. A API pública (inputs,
 * snippet de uso) será documentada quando o componente for implementado.
 */
class SheetsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SheetsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: SheetsComponent, isStandalone: true, selector: "creamy-kit-sheets", ngImport: i0, template: "<p>sheets works!</p>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: SheetsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-sheets', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p>sheets works!</p>\n" }]
        }] });

/** Tamanho do ícone (px) para cada tamanho de avatar. */
const ICON_PX = {
    small: 14,
    medium: 18,
    large: 28,
};
/**
 * Avatar com ícone.
 *
 * ```html
 * <creamy-kit-avatar-icon name="user_base" contrast="dark" size="medium" />
 * ```
 */
class AvatarIconComponent {
    /** Nome do ícone (arquivo em `creamy-kit-resources/icons`, sem extensão). */
    name = input.required(...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    /** Tamanho do avatar. @default 'medium' */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** Contraste de cor. @default 'dark' */
    contrast = input('dark', ...(ngDevMode ? [{ debugName: "contrast" }] : /* istanbul ignore next */ []));
    /** Anel de progresso (0–100). @default 0 */
    percentage = input(0, ...(ngDevMode ? [{ debugName: "percentage" }] : /* istanbul ignore next */ []));
    iconPx = computed(() => ICON_PX[this.size()], ...(ngDevMode ? [{ debugName: "iconPx" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: AvatarIconComponent, isStandalone: true, selector: "creamy-kit-avatar-icon", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, contrast: { classPropertyName: "contrast", publicName: "contrast", isSignal: true, isRequired: false, transformFunction: null }, percentage: { classPropertyName: "percentage", publicName: "percentage", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <creamy-kit-avatar-shell
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      <creamy-kit-icon [name]="name()" [size]="iconPx()" color="currentColor" />
    </creamy-kit-avatar-shell>
  `, isInline: true, dependencies: [{ kind: "component", type: AvatarShellComponent, selector: "creamy-kit-avatar-shell", inputs: ["size", "contrast", "percentage", "transparent"] }, { kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarIconComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'creamy-kit-avatar-icon',
                    standalone: true,
                    imports: [AvatarShellComponent, IconComponent],
                    template: `
    <creamy-kit-avatar-shell
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      <creamy-kit-icon [name]="name()" [size]="iconPx()" color="currentColor" />
    </creamy-kit-avatar-shell>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], contrast: [{ type: i0.Input, args: [{ isSignal: true, alias: "contrast", required: false }] }], percentage: [{ type: i0.Input, args: [{ isSignal: true, alias: "percentage", required: false }] }] } });

/**
 * Avatar com iniciais (texto).
 *
 * ```html
 * <creamy-kit-avatar-text text="LM" size="large" contrast="variant" />
 * ```
 */
class AvatarTextComponent {
    /** Iniciais exibidas (ex.: "LM"). */
    text = input('', ...(ngDevMode ? [{ debugName: "text" }] : /* istanbul ignore next */ []));
    /** Tamanho do avatar. @default 'medium' */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** Contraste de cor. @default 'dark' */
    contrast = input('dark', ...(ngDevMode ? [{ debugName: "contrast" }] : /* istanbul ignore next */ []));
    /** Anel de progresso (0–100). @default 0 */
    percentage = input(0, ...(ngDevMode ? [{ debugName: "percentage" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarTextComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: AvatarTextComponent, isStandalone: true, selector: "creamy-kit-avatar-text", inputs: { text: { classPropertyName: "text", publicName: "text", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, contrast: { classPropertyName: "contrast", publicName: "contrast", isSignal: true, isRequired: false, transformFunction: null }, percentage: { classPropertyName: "percentage", publicName: "percentage", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <creamy-kit-avatar-shell
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      {{ text() }}
    </creamy-kit-avatar-shell>
  `, isInline: true, dependencies: [{ kind: "component", type: AvatarShellComponent, selector: "creamy-kit-avatar-shell", inputs: ["size", "contrast", "percentage", "transparent"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: AvatarTextComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'creamy-kit-avatar-text',
                    standalone: true,
                    imports: [AvatarShellComponent],
                    template: `
    <creamy-kit-avatar-shell
      [size]="size()"
      [contrast]="contrast()"
      [percentage]="percentage()"
    >
      {{ text() }}
    </creamy-kit-avatar-shell>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { text: [{ type: i0.Input, args: [{ isSignal: true, alias: "text", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], contrast: [{ type: i0.Input, args: [{ isSignal: true, alias: "contrast", required: false }] }], percentage: [{ type: i0.Input, args: [{ isSignal: true, alias: "percentage", required: false }] }] } });

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
class CardComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CardComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: CardComponent, isStandalone: true, selector: "creamy-kit-card", ngImport: i0, template: "<div class=\"card\">\n  <ng-content />\n</div>\n", styles: [":host{display:block;width:100%}.card{width:100%;box-sizing:border-box;padding:20px 24px;border-radius:24px;border:1px solid var(--border-medium);background-color:var(--background-base)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-card', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"card\">\n  <ng-content />\n</div>\n", styles: [":host{display:block;width:100%}.card{width:100%;box-sizing:border-box;padding:20px 24px;border-radius:24px;border:1px solid var(--border-medium);background-color:var(--background-base)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }] });

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
class ListComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ListComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.16", type: ListComponent, isStandalone: true, selector: "creamy-kit-list", ngImport: i0, template: `<div class="list"><ng-content /></div>`, isInline: true, styles: [":host{display:block;width:100%}.list{display:flex;flex-direction:column;width:100%}.list ::ng-deep>*+*{border-top:1px solid var(--border-soft)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-list', standalone: true, imports: [], template: `<div class="list"><ng-content /></div>`, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block;width:100%}.list{display:flex;flex-direction:column;width:100%}.list ::ng-deep>*+*{border-top:1px solid var(--border-soft)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }] });

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
class ImageComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /**
     * Tamanho da imagem.
     * @default 'medium'
     */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** URL (path) da imagem. */
    path = input('', ...(ngDevMode ? [{ debugName: "path" }] : /* istanbul ignore next */ []));
    /** Texto alternativo (opcional). */
    alt = input('', ...(ngDevMode ? [{ debugName: "alt" }] : /* istanbul ignore next */ []));
    /** Falhou ao carregar? */
    errored = signal(false, ...(ngDevMode ? [{ debugName: "errored" }] : /* istanbul ignore next */ []));
    onError() {
        this.errored.set(true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ImageComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: ImageComponent, isStandalone: true, selector: "creamy-kit-image", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, path: { classPropertyName: "path", publicName: "path", isSignal: true, isRequired: false, transformFunction: null }, alt: { classPropertyName: "alt", publicName: "alt", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-size": "size()", "attr.data-error": "errored() ? '' : null" } }, ngImport: i0, template: "<div class=\"image\">\n  @if (path() && !errored()) {\n    <img [src]=\"path()\" [alt]=\"alt()\" (error)=\"onError()\" />\n  }\n</div>\n", styles: [":host{display:inline-block}.image{display:block;box-sizing:border-box;overflow:hidden;background-color:var(--background-base)}.image img{width:100%;height:100%;object-fit:cover;display:block}:host([data-size=xxsmall]) .image{width:90px;height:90px;border-radius:24px}:host([data-size=xsmall]) .image{width:140px;height:140px;border-radius:40px}:host([data-size=small]) .image{width:321px;height:256px;border-radius:40px}:host([data-size=medium]) .image{width:340px;height:256px;border-radius:40px}:host([data-size=large]) .image{width:355px;height:256px;border-radius:40px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ImageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-image', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-size]': 'size()',
                        '[attr.data-error]': "errored() ? '' : null",
                    }, template: "<div class=\"image\">\n  @if (path() && !errored()) {\n    <img [src]=\"path()\" [alt]=\"alt()\" (error)=\"onError()\" />\n  }\n</div>\n", styles: [":host{display:inline-block}.image{display:block;box-sizing:border-box;overflow:hidden;background-color:var(--background-base)}.image img{width:100%;height:100%;object-fit:cover;display:block}:host([data-size=xxsmall]) .image{width:90px;height:90px;border-radius:24px}:host([data-size=xsmall]) .image{width:140px;height:140px;border-radius:40px}:host([data-size=small]) .image{width:321px;height:256px;border-radius:40px}:host([data-size=medium]) .image{width:340px;height:256px;border-radius:40px}:host([data-size=large]) .image{width:355px;height:256px;border-radius:40px}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], path: [{ type: i0.Input, args: [{ isSignal: true, alias: "path", required: false }] }], alt: [{ type: i0.Input, args: [{ isSignal: true, alias: "alt", required: false }] }] } });

/**
 * Componente de Tag do Creamy Kit.
 *
 * Pequena etiqueta (pill) com o conteúdo projetado via `<ng-content>`.
 *
 * ```html
 * <creamy-kit-tag color="success">Pago</creamy-kit-tag>
 * ```
 */
class TagComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /** Cor semântica. @default 'neutral' */
    color = input('neutral', ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TagComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: TagComponent, isStandalone: true, selector: "creamy-kit-tag", inputs: { color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-color": "color()" } }, ngImport: i0, template: `<span class="tag"><ng-content /></span>`, isInline: true, styles: [":host{display:inline-flex;--kit-tag-bg: var(--feedbacks-neutral);--kit-tag-fg: var(--feedbacks-neutral-contrast)}:host([data-color=primary]){--kit-tag-bg: var(--primary-base);--kit-tag-fg: var(--primary-contrast)}:host([data-color=success]){--kit-tag-bg: var(--feedbacks-success-variant-2);--kit-tag-fg: var(--feedbacks-success-contrast)}:host([data-color=error]){--kit-tag-bg: var(--feedbacks-error);--kit-tag-fg: var(--feedbacks-error-contrast)}:host([data-color=alert]){--kit-tag-bg: var(--feedbacks-alert);--kit-tag-fg: var(--feedbacks-alert-contrast)}.tag{display:inline-flex;align-items:center;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:500;line-height:1.4;background:var(--kit-tag-bg);color:var(--kit-tag-fg)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-tag', standalone: true, imports: [], template: `<span class="tag"><ng-content /></span>`, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-color]': 'color()',
                    }, styles: [":host{display:inline-flex;--kit-tag-bg: var(--feedbacks-neutral);--kit-tag-fg: var(--feedbacks-neutral-contrast)}:host([data-color=primary]){--kit-tag-bg: var(--primary-base);--kit-tag-fg: var(--primary-contrast)}:host([data-color=success]){--kit-tag-bg: var(--feedbacks-success-variant-2);--kit-tag-fg: var(--feedbacks-success-contrast)}:host([data-color=error]){--kit-tag-bg: var(--feedbacks-error);--kit-tag-fg: var(--feedbacks-error-contrast)}:host([data-color=alert]){--kit-tag-bg: var(--feedbacks-alert);--kit-tag-fg: var(--feedbacks-alert-contrast)}.tag{display:inline-flex;align-items:center;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:500;line-height:1.4;background:var(--kit-tag-bg);color:var(--kit-tag-fg)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }] } });

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
class ProductCardComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /** URL da imagem do produto. */
    imagePath = input('', ...(ngDevMode ? [{ debugName: "imagePath" }] : /* istanbul ignore next */ []));
    /** Título do produto. */
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** Preço exibido. */
    price = input('', ...(ngDevMode ? [{ debugName: "price" }] : /* istanbul ignore next */ []));
    /** Texto da tag (canto da imagem). Quando vazio, a tag não é exibida. */
    tagText = input('', ...(ngDevMode ? [{ debugName: "tagText" }] : /* istanbul ignore next */ []));
    /** Cor da tag. @default 'primary' */
    tagColor = input('primary', ...(ngDevMode ? [{ debugName: "tagColor" }] : /* istanbul ignore next */ []));
    /** Texto do botão. Quando vazio, o botão não é exibido. */
    buttonText = input('', ...(ngDevMode ? [{ debugName: "buttonText" }] : /* istanbul ignore next */ []));
    /** Emitido ao clicar no botão. */
    action = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ProductCardComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.16", type: ProductCardComponent, isStandalone: true, selector: "creamy-kit-product-card", inputs: { imagePath: { classPropertyName: "imagePath", publicName: "imagePath", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, price: { classPropertyName: "price", publicName: "price", isSignal: true, isRequired: false, transformFunction: null }, tagText: { classPropertyName: "tagText", publicName: "tagText", isSignal: true, isRequired: false, transformFunction: null }, tagColor: { classPropertyName: "tagColor", publicName: "tagColor", isSignal: true, isRequired: false, transformFunction: null }, buttonText: { classPropertyName: "buttonText", publicName: "buttonText", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { action: "action" }, ngImport: i0, template: `
    <div class="product-card">
      <div class="product-card__media">
        <creamy-kit-image size="small" [path]="imagePath()" [alt]="title()" />
        @if (tagText()) {
          <creamy-kit-tag class="product-card__tag" [color]="tagColor()">{{ tagText() }}</creamy-kit-tag>
        }
      </div>

      <div class="product-card__body">
        <span class="product-card__title">{{ title() }}</span>
        <span class="product-card__price">{{ price() }}</span>
      </div>

      @if (buttonText()) {
        <creamy-kit-button (click)="action.emit()">{{ buttonText() }}</creamy-kit-button>
      }
    </div>
  `, isInline: true, styles: [":host{display:inline-flex}.product-card{display:flex;flex-direction:column;gap:12px;padding:12px;border-radius:24px;background:var(--background-base);box-sizing:border-box}.product-card__media{position:relative;display:inline-flex}.product-card__tag{position:absolute;top:8px;left:8px}.product-card__body{display:flex;flex-direction:column;gap:2px}.product-card__title{font-size:.95rem;font-weight:500;color:var(--text-heading)}.product-card__price{font-size:1rem;font-weight:600;color:var(--text-highlight)}\n"], dependencies: [{ kind: "component", type: ButtonComponent, selector: "creamy-kit-button", inputs: ["appearance", "contrast"] }, { kind: "component", type: ImageComponent, selector: "creamy-kit-image", inputs: ["size", "path", "alt"] }, { kind: "component", type: TagComponent, selector: "creamy-kit-tag", inputs: ["color"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ProductCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-product-card', standalone: true, imports: [ButtonComponent, ImageComponent, TagComponent], template: `
    <div class="product-card">
      <div class="product-card__media">
        <creamy-kit-image size="small" [path]="imagePath()" [alt]="title()" />
        @if (tagText()) {
          <creamy-kit-tag class="product-card__tag" [color]="tagColor()">{{ tagText() }}</creamy-kit-tag>
        }
      </div>

      <div class="product-card__body">
        <span class="product-card__title">{{ title() }}</span>
        <span class="product-card__price">{{ price() }}</span>
      </div>

      @if (buttonText()) {
        <creamy-kit-button (click)="action.emit()">{{ buttonText() }}</creamy-kit-button>
      }
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:inline-flex}.product-card{display:flex;flex-direction:column;gap:12px;padding:12px;border-radius:24px;background:var(--background-base);box-sizing:border-box}.product-card__media{position:relative;display:inline-flex}.product-card__tag{position:absolute;top:8px;left:8px}.product-card__body{display:flex;flex-direction:column;gap:2px}.product-card__title{font-size:.95rem;font-weight:500;color:var(--text-heading)}.product-card__price{font-size:1rem;font-weight:600;color:var(--text-highlight)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { imagePath: [{ type: i0.Input, args: [{ isSignal: true, alias: "imagePath", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], price: [{ type: i0.Input, args: [{ isSignal: true, alias: "price", required: false }] }], tagText: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagText", required: false }] }], tagColor: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagColor", required: false }] }], buttonText: [{ type: i0.Input, args: [{ isSignal: true, alias: "buttonText", required: false }] }], action: [{ type: i0.Output, args: ["action"] }] } });

/**
 * Componente de Shortcut (atalho) do Creamy Kit.
 *
 * Botão com um ícone em destaque e um rótulo abaixo. Reutiliza `kit-icon`.
 *
 * ```html
 * <creamy-kit-shortcut iconName="wallet_base" label="Carteira" (pressed)="abrir()" />
 * ```
 */
class ShortcutComponent {
    /** Nome do ícone (em `creamy-kit-resources/icons`, sem extensão). */
    iconName = input.required(...(ngDevMode ? [{ debugName: "iconName" }] : /* istanbul ignore next */ []));
    /** Rótulo exibido abaixo do ícone. */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    /** Emitido ao clicar no atalho. */
    pressed = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ShortcutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: ShortcutComponent, isStandalone: true, selector: "creamy-kit-shortcut", inputs: { iconName: { classPropertyName: "iconName", publicName: "iconName", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { pressed: "pressed" }, ngImport: i0, template: `
    <button type="button" class="shortcut" (click)="pressed.emit()">
      <span class="shortcut__icon">
        <creamy-kit-icon [name]="iconName()" [size]="24" color="currentColor" />
      </span>
      <span class="shortcut__label">{{ label() }}</span>
    </button>
  `, isInline: true, styles: [":host{display:inline-flex}.shortcut{display:inline-flex;flex-direction:column;align-items:center;gap:6px;padding:0;border:none;background:transparent;cursor:pointer;color:var(--text-body)}.shortcut__icon{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:var(--background-variant);color:var(--primary-base)}.shortcut__label{font-size:.75rem;font-weight:400;color:var(--text-body-2)}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "creamy-kit-icon", inputs: ["name", "size", "color", "ariaLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: ShortcutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-shortcut', standalone: true, imports: [IconComponent], template: `
    <button type="button" class="shortcut" (click)="pressed.emit()">
      <span class="shortcut__icon">
        <creamy-kit-icon [name]="iconName()" [size]="24" color="currentColor" />
      </span>
      <span class="shortcut__label">{{ label() }}</span>
    </button>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:inline-flex}.shortcut{display:inline-flex;flex-direction:column;align-items:center;gap:6px;padding:0;border:none;background:transparent;cursor:pointer;color:var(--text-body)}.shortcut__icon{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;background:var(--background-variant);color:var(--primary-base)}.shortcut__label{font-size:.75rem;font-weight:400;color:var(--text-body-2)}\n"] }]
        }], propDecorators: { iconName: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconName", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], pressed: [{ type: i0.Output, args: ["pressed"] }] } });

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
class TextComponent {
    /** Tipo de tipografia. */
    type = input.required(...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    /** Cor: 'default' (Text/heading), 'on-brand' (Action/primary/contrast), 'variant' (Action/primary/base). */
    color = input('default', ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    /** Tamanho (depende do type). */
    size = input('default', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    /** Se true, weight 500 (para body e label). */
    bold = input(false, ...(ngDevMode ? [{ debugName: "bold" }] : /* istanbul ignore next */ []));
    /** Se true, underline (para label). */
    underline = input(false, ...(ngDevMode ? [{ debugName: "underline" }] : /* istanbul ignore next */ []));
    /** Classes CSS do host. */
    hostClass = computed(() => {
        const type = this.type();
        const color = this.color();
        const size = this.size();
        const bold = this.bold();
        const underline = this.underline();
        let classes = `text text--${type}`;
        if (type === 'section') {
            classes += ` text--size-${size}`;
        }
        else {
            if (color && color !== 'default') {
                classes += ` text--color-${color}`;
            }
            classes += ` text--size-${size}`;
        }
        if ((type === 'body' || type === 'label') && bold) {
            classes += ' text--bold';
        }
        if (type === 'label' && underline) {
            classes += ' text--underline';
        }
        return classes;
    }, ...(ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TextComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: TextComponent, isStandalone: true, selector: "creamy-kit-text", inputs: { type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: true, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, bold: { classPropertyName: "bold", publicName: "bold", isSignal: true, isRequired: false, transformFunction: null }, underline: { classPropertyName: "underline", publicName: "underline", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class": "hostClass()" } }, ngImport: i0, template: `<span [class]="hostClass()"><ng-content /></span>`, isInline: true, styles: [".text{display:inline;line-height:1.5;color:var(--text-heading, #2a2a2a)}.text--color-on-brand{color:var(--action-primary-contrast, #ffffff)}.text--color-variant{color:var(--action-primary-base, #128cfe)}.text--title{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:700}.text--title.text--size-small{font-size:16px}.text--title.text--size-default{font-size:24px}.text--title.text--size-large{font-size:40px}.text--subtitle{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:36px;font-weight:700}.text--section{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:600;color:var(--text-heading, #2a2a2a)}.text--section.text--size-small{font-size:16px}.text--section.text--size-default{font-size:20px}.text--body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:400;color:var(--text-heading, #2a2a2a)}.text--body.text--size-small{font-size:14px}.text--body.text--size-default{font-size:16px}.text--body.text--size-large{font-size:18px}.text--body.text--bold{font-weight:500;color:var(--text-body-2, #6f6f6f)}.text--body.text--color-on-brand,.text--body.text--color-on-brand.text--bold{color:var(--action-primary-contrast, #ffffff)}.text--body.text--color-variant,.text--body.text--color-variant.text--bold{color:var(--action-primary-base, #128cfe)}.text--label{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:400}.text--label.text--size-xxsmall{font-size:10px}.text--label.text--size-xsmall{font-size:11px}.text--label.text--size-small{font-size:14px}.text--label.text--size-default{font-size:16px}.text--label.text--size-large{font-size:20px}.text--label.text--bold{font-weight:500}.text--label.text--underline{text-decoration:underline}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TextComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-text', standalone: true, template: `<span [class]="hostClass()"><ng-content /></span>`, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': 'hostClass()',
                    }, styles: [".text{display:inline;line-height:1.5;color:var(--text-heading, #2a2a2a)}.text--color-on-brand{color:var(--action-primary-contrast, #ffffff)}.text--color-variant{color:var(--action-primary-base, #128cfe)}.text--title{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:700}.text--title.text--size-small{font-size:16px}.text--title.text--size-default{font-size:24px}.text--title.text--size-large{font-size:40px}.text--subtitle{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:36px;font-weight:700}.text--section{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:600;color:var(--text-heading, #2a2a2a)}.text--section.text--size-small{font-size:16px}.text--section.text--size-default{font-size:20px}.text--body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:400;color:var(--text-heading, #2a2a2a)}.text--body.text--size-small{font-size:14px}.text--body.text--size-default{font-size:16px}.text--body.text--size-large{font-size:18px}.text--body.text--bold{font-weight:500;color:var(--text-body-2, #6f6f6f)}.text--body.text--color-on-brand,.text--body.text--color-on-brand.text--bold{color:var(--action-primary-contrast, #ffffff)}.text--body.text--color-variant,.text--body.text--color-variant.text--bold{color:var(--action-primary-base, #128cfe)}.text--label{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-weight:400}.text--label.text--size-xxsmall{font-size:10px}.text--label.text--size-xsmall{font-size:11px}.text--label.text--size-small{font-size:14px}.text--label.text--size-default{font-size:16px}.text--label.text--size-large{font-size:20px}.text--label.text--bold{font-weight:500}.text--label.text--underline{text-decoration:underline}\n"] }]
        }], propDecorators: { type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: true }] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], bold: [{ type: i0.Input, args: [{ isSignal: true, alias: "bold", required: false }] }], underline: [{ type: i0.Input, args: [{ isSignal: true, alias: "underline", required: false }] }] } });

/**
 * Componente de Text Link do Creamy Kit.
 *
 * Link de texto sublinhado, com o rótulo projetado via `<ng-content>`.
 *
 * ```html
 * <creamy-kit-text-link href="/termos">Termos de uso</creamy-kit-text-link>
 * ```
 */
class TextLinkComponent {
    themeService;
    constructor(themeService) {
        this.themeService = themeService;
    }
    /** Destino do link. */
    href = input('', ...(ngDevMode ? [{ debugName: "href" }] : /* istanbul ignore next */ []));
    /** Alvo do link. @default '_self' */
    target = input('_self', ...(ngDevMode ? [{ debugName: "target" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TextLinkComponent, deps: [{ token: ThemeService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: TextLinkComponent, isStandalone: true, selector: "creamy-kit-text-link", inputs: { href: { classPropertyName: "href", publicName: "href", isSignal: true, isRequired: false, transformFunction: null }, target: { classPropertyName: "target", publicName: "target", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <a
      class="text-link"
      [href]="href()"
      [target]="target()"
      [attr.rel]="target() === '_blank' ? 'noopener noreferrer' : null"
    >
      <ng-content />
    </a>
  `, isInline: true, styles: [":host{display:inline}.text-link{color:var(--text-link);font-weight:400;text-decoration:underline;cursor:pointer}.text-link:hover{color:var(--text-highlight)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: TextLinkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-text-link', standalone: true, imports: [], template: `
    <a
      class="text-link"
      [href]="href()"
      [target]="target()"
      [attr.rel]="target() === '_blank' ? 'noopener noreferrer' : null"
    >
      <ng-content />
    </a>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:inline}.text-link{color:var(--text-link);font-weight:400;text-decoration:underline;cursor:pointer}.text-link:hover{color:var(--text-highlight)}\n"] }]
        }], ctorParameters: () => [{ type: ThemeService }], propDecorators: { href: [{ type: i0.Input, args: [{ isSignal: true, alias: "href", required: false }] }], target: [{ type: i0.Input, args: [{ isSignal: true, alias: "target", required: false }] }] } });

/**
 * Componente de Brand do Creamy Kit.
 *
 * Exibe um logo do `creamy-kit-resources/brands` com a altura informada.
 *
 * ```html
 * <creamy-kit-brand name="creamy" [height]="32" />
 * ```
 */
class BrandComponent {
    /** Nome do arquivo do logo (em `brands/`, sem extensão). */
    name = input.required(...(ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
    /** Altura do logo em pixels. @default 24 */
    height = input(24, ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    /** Texto alternativo. Default = `name`. */
    alt = input('', ...(ngDevMode ? [{ debugName: "alt" }] : /* istanbul ignore next */ []));
    /** Extensão do arquivo. @default 'svg' */
    ext = input('svg', ...(ngDevMode ? [{ debugName: "ext" }] : /* istanbul ignore next */ []));
    resources = inject(CREAMY_KIT_RESOURCES);
    src = computed(() => `${this.resources.brandsBaseUrl}/${this.name()}.${this.ext()}`, ...(ngDevMode ? [{ debugName: "src" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: BrandComponent, isStandalone: true, selector: "creamy-kit-brand", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, alt: { classPropertyName: "alt", publicName: "alt", isSignal: true, isRequired: false, transformFunction: null }, ext: { classPropertyName: "ext", publicName: "ext", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <img class="brand" [src]="src()" [alt]="alt() || name()" [style.height.px]="height()" />
  `, isInline: true, styles: [":host{display:inline-flex}.brand{display:block;width:auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-kit-brand', standalone: true, imports: [], template: `
    <img class="brand" [src]="src()" [alt]="alt() || name()" [style.height.px]="height()" />
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:inline-flex}.brand{display:block;width:auto}\n"] }]
        }], propDecorators: { name: [{ type: i0.Input, args: [{ isSignal: true, alias: "name", required: true }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }], alt: [{ type: i0.Input, args: [{ isSignal: true, alias: "alt", required: false }] }], ext: [{ type: i0.Input, args: [{ isSignal: true, alias: "ext", required: false }] }] } });

/** Converte um nome de marca em slug de arquivo (`Banco Inter` → `banco_inter`). */
function brandSlug(name) {
    return name.toLowerCase().trim().replace(/\s+/g, '_');
}
/**
 * Monta a URL de um asset de brand.
 *
 * @param base     base URL dos brands (de `CreamyKitResources.brandsBaseUrl`)
 * @param name     nome da marca (será convertido em slug)
 * @param kind     formato: `square` | `horizontal` | `cardholder`
 * @param size     tamanho (omitido para `cardholder`, que não tem variação)
 */
function buildBrandUrl(base, name, kind, size) {
    const suffix = size ? `${kind}_${size}` : kind;
    return `${base}/${brandSlug(name)}_${suffix}.svg`;
}

/**
 * Logo de marca no formato quadrado (1:1) do Creamy Kit.
 *
 * Carrega `{brand}_square_{size}.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-square brandName="creamy" size="large" />
 * ```
 */
class BrandSquareComponent {
    /** Nome da marca (arquivo em `brands/`, sem extensão). */
    brandName = input.required(...(ngDevMode ? [{ debugName: "brandName" }] : /* istanbul ignore next */ []));
    /** Tamanho do logo. @default 'medium' */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    resources = inject(CREAMY_KIT_RESOURCES);
    /** URL final do SVG, derivada de `brandName` + `size`. */
    brandUrl = computed(() => buildBrandUrl(this.resources.brandsBaseUrl, this.brandName(), 'square', this.size()), ...(ngDevMode ? [{ debugName: "brandUrl" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandSquareComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: BrandSquareComponent, isStandalone: true, selector: "creamy-brand-square", inputs: { brandName: { classPropertyName: "brandName", publicName: "brandName", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <div class="brand-square" [class]="'brand-square--' + size()">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-square__image"
        loading="lazy"
      />
    </div>
  `, isInline: true, styles: [".brand-square{display:inline-block}.brand-square--small{width:64px;height:64px}.brand-square--medium{width:128px;height:128px}.brand-square--large{width:256px;height:256px}.brand-square__image{width:100%;height:100%;object-fit:contain;display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandSquareComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-brand-square', standalone: true, template: `
    <div class="brand-square" [class]="'brand-square--' + size()">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-square__image"
        loading="lazy"
      />
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".brand-square{display:inline-block}.brand-square--small{width:64px;height:64px}.brand-square--medium{width:128px;height:128px}.brand-square--large{width:256px;height:256px}.brand-square__image{width:100%;height:100%;object-fit:contain;display:block}\n"] }]
        }], propDecorators: { brandName: [{ type: i0.Input, args: [{ isSignal: true, alias: "brandName", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

/**
 * Logo de marca no formato horizontal (logo + wordmark) do Creamy Kit.
 *
 * Carrega `{brand}_horizontal_{size}.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-horizontal brandName="creamy" size="medium" />
 * ```
 */
class BrandHorizontalComponent {
    /** Nome da marca (arquivo em `brands/`, sem extensão). */
    brandName = input.required(...(ngDevMode ? [{ debugName: "brandName" }] : /* istanbul ignore next */ []));
    /** Tamanho do logo. @default 'medium' */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    resources = inject(CREAMY_KIT_RESOURCES);
    /** URL final do SVG, derivada de `brandName` + `size`. */
    brandUrl = computed(() => buildBrandUrl(this.resources.brandsBaseUrl, this.brandName(), 'horizontal', this.size()), ...(ngDevMode ? [{ debugName: "brandUrl" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandHorizontalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: BrandHorizontalComponent, isStandalone: true, selector: "creamy-brand-horizontal", inputs: { brandName: { classPropertyName: "brandName", publicName: "brandName", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <div class="brand-horizontal" [class]="'brand-horizontal--' + size()">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-horizontal__image"
        loading="lazy"
      />
    </div>
  `, isInline: true, styles: [".brand-horizontal{display:inline-block}.brand-horizontal--small{width:128px;height:40px}.brand-horizontal--medium{width:256px;height:80px}.brand-horizontal--large{width:512px;height:160px}.brand-horizontal__image{width:100%;height:100%;object-fit:contain;display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandHorizontalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-brand-horizontal', standalone: true, template: `
    <div class="brand-horizontal" [class]="'brand-horizontal--' + size()">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-horizontal__image"
        loading="lazy"
      />
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".brand-horizontal{display:inline-block}.brand-horizontal--small{width:128px;height:40px}.brand-horizontal--medium{width:256px;height:80px}.brand-horizontal--large{width:512px;height:160px}.brand-horizontal__image{width:100%;height:100%;object-fit:contain;display:block}\n"] }]
        }], propDecorators: { brandName: [{ type: i0.Input, args: [{ isSignal: true, alias: "brandName", required: true }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }] } });

/**
 * Logo de marca no formato cardholder (selo para cartões) do Creamy Kit.
 *
 * Carrega `{brand}_cardholder.svg` do `creamy-kit-resources/brands`.
 *
 * ```html
 * <creamy-brand-cardholder brandName="creamy" />
 * ```
 */
class BrandCardholderComponent {
    /** Nome da marca (arquivo em `brands/`, sem extensão). */
    brandName = input.required(...(ngDevMode ? [{ debugName: "brandName" }] : /* istanbul ignore next */ []));
    resources = inject(CREAMY_KIT_RESOURCES);
    /** URL final do SVG, derivada de `brandName`. */
    brandUrl = computed(() => buildBrandUrl(this.resources.brandsBaseUrl, this.brandName(), 'cardholder'), ...(ngDevMode ? [{ debugName: "brandUrl" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandCardholderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.16", type: BrandCardholderComponent, isStandalone: true, selector: "creamy-brand-cardholder", inputs: { brandName: { classPropertyName: "brandName", publicName: "brandName", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: `
    <div class="brand-cardholder">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-cardholder__image"
        loading="lazy"
      />
    </div>
  `, isInline: true, styles: [".brand-cardholder{display:inline-block;width:360px;height:226px}.brand-cardholder__image{width:100%;height:100%;object-fit:contain;display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.16", ngImport: i0, type: BrandCardholderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'creamy-brand-cardholder', standalone: true, template: `
    <div class="brand-cardholder">
      <img
        [src]="brandUrl()"
        [alt]="brandName()"
        class="brand-cardholder__image"
        loading="lazy"
      />
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".brand-cardholder{display:inline-block;width:360px;height:226px}.brand-cardholder__image{width:100%;height:100%;object-fit:contain;display:block}\n"] }]
        }], propDecorators: { brandName: [{ type: i0.Input, args: [{ isSignal: true, alias: "brandName", required: true }] }] } });

/*
 * Creamy Kit — API pública.
 * Componentes organizados por categoria. As variações estruturais de cada
 * componente são exportadas como componentes próprios.
 */
// core / configuração

/**
 * Generated bundle index. Do not edit.
 */

export { AlertComponent, AvatarIconComponent, AvatarImageComponent, AvatarTextComponent, BannerBase, BannerCardComponent, BannerComponent, BannerTagComponent, BaseValueAccessor, BrandCardholderComponent, BrandComponent, BrandHorizontalComponent, BrandSquareComponent, BreadcrumbComponent, ButtonComponent, CREAMY_KIT_RESOURCES, CREAMY_KIT_RESOURCES_DEFAULTS, CalendarComponent, CardComponent, CheckboxComponent, CodeComponent, DatePickerComponent, DividerComponent, DropdownComponent, FieldErrorIconComponent, HeaderBase, HeaderLargeTitleComponent, HeaderProfileComponent, HeaderSearchComponent, HeaderTitleComponent, IconComponent, ImageComponent, InputComponent, ListComponent, LoadingComponent, ModalComponent, MultiDropdownComponent, PaginationComponent, PasswordComponent, ProductCardComponent, ProgressComponent, RadioComponent, SearchComponent, SheetsComponent, ShortcutComponent, SnackbarComponent, SwitchComponent, TabBarComponent, TabBarItemComponent, TabsComponent, TagComponent, TextComponent, TextLinkComponent, TextboxComponent, TooltipComponent, provideCreamyKitResources };
//# sourceMappingURL=creamy-kit.mjs.map
