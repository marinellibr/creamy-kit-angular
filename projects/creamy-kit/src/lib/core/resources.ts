import { InjectionToken, Provider } from '@angular/core';

/**
 * Origem dos assets visuais do Creamy Kit (ícones e brands).
 *
 * Por padrão aponta para o repositório público `creamy-kit-resources` no
 * GitHub (raw). Sobrescreva via {@link provideCreamyKitResources} para servir
 * os assets de um CDN próprio, de uma cópia empacotada (`/assets/...`) ou de
 * um ambiente offline — sem acoplar os componentes a uma URL fixa.
 */
export interface CreamyKitResources {
  /** Base URL dos ícones (sem barra final). */
  iconsBaseUrl: string;
  /** Base URL dos brands/logos (sem barra final). */
  brandsBaseUrl: string;
}

const RESOURCES_BASE =
  'https://raw.githubusercontent.com/marinellibr/creamy-kit-resources/main';

/** Configuração padrão (GitHub raw do `creamy-kit-resources`). */
export const CREAMY_KIT_RESOURCES_DEFAULTS: CreamyKitResources = {
  iconsBaseUrl: `${RESOURCES_BASE}/icons`,
  brandsBaseUrl: `${RESOURCES_BASE}/brands`,
};

/**
 * Token de DI com a origem dos assets. Tem um default `providedIn: 'root'`,
 * então os componentes funcionam sem nenhuma configuração extra.
 */
export const CREAMY_KIT_RESOURCES = new InjectionToken<CreamyKitResources>(
  'CREAMY_KIT_RESOURCES',
  { providedIn: 'root', factory: () => CREAMY_KIT_RESOURCES_DEFAULTS },
);

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
export function provideCreamyKitResources(
  config: Partial<CreamyKitResources>,
): Provider {
  return {
    provide: CREAMY_KIT_RESOURCES,
    useValue: { ...CREAMY_KIT_RESOURCES_DEFAULTS, ...config },
  };
}
