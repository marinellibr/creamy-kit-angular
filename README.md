# Creamy Kit — Angular

Biblioteca de componentes do **Creamy Kit** (design system) para Angular 18+.
Componentes _standalone_, com tema via CSS custom properties e ícones
consumidos do repositório de recursos
[`creamy-kit-resources`](https://github.com/marinellibr/creamy-kit-resources).

- **Lib:** `projects/creamy-kit` — publicada como pacote `creamy-kit`.
- **Showcase / documentação viva:** projeto separado
  [`creamy-design-system`](https://github.com/marinellibr/creamy-design-system)
  (consome esta lib e roda no GitHub Pages).

> Angular **18.2** · componentes standalone · `ChangeDetectionStrategy.OnPush`.

---

## Instalação

A lib ainda **não está publicada no npm**; é consumida a partir do build local
(`dist/creamy-kit`). Num projeto irmão, referencie via caminho relativo:

```jsonc
// package.json do consumidor
{
  "dependencies": {
    "creamy-kit": "file:../creamy-kit-angular/dist/creamy-kit"
  }
}
```

Gere o `dist` antes de instalar:

```bash
npm install
npm run build            # ng build creamy-kit  →  dist/creamy-kit
```

**peerDependencies:** `@angular/common` e `@angular/core` `^18.2.0`.

---

## Uso

Os componentes são _standalone_ — importe direto no `imports` do seu componente:

```ts
import { Component } from '@angular/core';
import { ButtonComponent, IconComponent } from 'creamy-kit';

@Component({
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  template: `
    <kit-button appearance="solid">Salvar</kit-button>
    <kit-icon name="check_base" [size]="20" color="var(--primary-base)" />
  `,
})
export class ExampleComponent {}
```

### Estilos / tema

Importe os tokens e fontes uma vez (ex.: em `styles.scss` do app):

```scss
@import 'creamy-kit/styles';
```

O tema é controlado por CSS custom properties (`--primary-base`,
`--feedbacks-error`, `--text-body`, etc.) definidas em
`projects/creamy-kit/src/styles`.

---

## Ícones (`kit-icon`)

Os SVGs vêm direto do
[`creamy-kit-resources`](https://github.com/marinellibr/creamy-kit-resources)
(raw URL do GitHub), aplicados como `mask-image` e pintados via
`background-color` — então qualquer ícone acompanha a cor passada.

```html
<kit-icon name="arrow_right" />
<kit-icon name="lock_base" [size]="32" color="var(--primary-base)" />
<kit-icon name="search_variant" [size]="16" color="#ed339c" />
```

| Input       | Tipo     | Default          | Descrição                                            |
| ----------- | -------- | ---------------- | ---------------------------------------------------- |
| `name`      | `string` | — (obrigatório)  | Nome do arquivo SVG em `icons/`, sem extensão        |
| `size`      | `number` | `24`             | Largura = altura, em px                              |
| `color`     | `string` | `currentColor`   | Qualquer valor CSS (token `var(--…)`, hex, rgb)      |
| `ariaLabel` | `string` | `name`           | Rótulo acessível (use `""` para ícone decorativo)    |

Também há mixins SCSS em `projects/creamy-kit/src/lib/core/_icons.scss`:

```scss
@use 'core/icons' as icons;

.my-icon { @include icons.icon('arrow_right', 20px); }
```

Catálogo completo (373 ícones) no
[README do creamy-kit-resources](https://github.com/marinellibr/creamy-kit-resources#cat%C3%A1logo-de-%C3%ADcones).

---

## Componentes

Documentação interativa de cada um no
[showcase do design system](https://marinellibr.github.io/creamy-design-system/).
🚧 = ainda sem página de demonstração no showcase.

| Grupo             | Componentes |
| ----------------- | ----------- |
| Geral             | `kit-button` · `kit-card` · `kit-divider` · `kit-icon` · `kit-brand` 🚧 |
| Formulários       | `kit-input` · `kit-password` · `kit-textbox` · `kit-dropdown` · `kit-multidropdown` · `kit-search` · `kit-checkbox` · `kit-code` · `kit-calendar` · `kit-date-picker` · `kit-radio` 🚧 · `kit-switch` 🚧 |
| Feedback          | `kit-alert` · `kit-banner` · `kit-loading` 🚧 · `kit-progress` 🚧 · `kit-tooltip` 🚧 |
| Navegação         | `kit-breadcrumb` · `kit-header` · `kit-pagination` 🚧 · `kit-tab-bar` 🚧 · `kit-tabs` 🚧 |
| Exibição de dados | `kit-avatar` · `kit-image` · `kit-list` 🚧 · `kit-product-card` 🚧 · `kit-shortcut` 🚧 · `kit-tag` 🚧 |
| Overlays          | `kit-modal` 🚧 · `kit-sheets` 🚧 |
| Tipografia        | `kit-text-link` 🚧 |

Todos são exportados por `creamy-kit` (ver `projects/creamy-kit/src/public-api.ts`).

---

## Desenvolvimento

```bash
npm install
npm run build      # builda a lib  → dist/creamy-kit
npm run watch      # rebuild em watch (útil junto do showcase)
npm test           # testes (Karma)
```

A lib vive em `projects/creamy-kit/`. Cada componente fica em
`src/lib/<nome>/` e é re-exportado em `src/public-api.ts`.

---

## Repositórios relacionados

- [`creamy-kit-resources`](https://github.com/marinellibr/creamy-kit-resources) — ícones e assets (SVG).
- [`creamy-design-system`](https://github.com/marinellibr/creamy-design-system) — showcase/documentação (consome esta lib).
