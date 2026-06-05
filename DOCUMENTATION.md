# Creamy Kit — Documentação

> Biblioteca de componentes Angular para o design system Creamy Kit.  
> Angular 18 · Standalone Components · Signals · OnPush

---

## Índice

1. [Instalação e configuração](#1-instalação-e-configuração)
2. [Theming (tokens CSS)](#2-theming-tokens-css)
3. [Componentes de Ação](#3-componentes-de-ação)
4. [Formulários](#4-formulários)
5. [Navegação](#5-navegação)
6. [Feedback](#6-feedback)
7. [Data Display](#7-data-display)
8. [Overlays](#8-overlays)
9. [Mídia](#9-mídia)
10. [Tipografia](#10-tipografia)
11. [Layout](#11-layout)
12. [Referência de tokens de design](#12-referência-de-tokens-de-design)

---

## 1. Instalação e configuração

### Configurando a origem dos assets

Os ícones e logos são carregados de uma URL base configurável. Por padrão, o kit aponta para o repositório público `creamy-kit-resources` no GitHub.

Para servir os assets do seu próprio servidor (CDN, `/assets/`, etc.):

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideCreamyKitResources } from 'creamy-kit';

bootstrapApplication(AppComponent, {
  providers: [
    provideCreamyKitResources({
      iconsBaseUrl: '/assets/icons',   // pasta local com os SVGs
      brandsBaseUrl: '/assets/brands',
    }),
  ],
});
```

Se não configurar nada, o kit usa o GitHub raw como fallback — funciona em desenvolvimento.

---

## 2. Theming (tokens CSS)

O `ThemeService` é injetado automaticamente pelo primeiro componente usado e injeta um bloco de CSS custom properties no `<head>`. Você não precisa fazer nada.

Sobrescreva os tokens no seu CSS global para customizar o tema:

```css
:root {
  --primary-base:     #128cfe;
  --primary-variant:  #00bfff;
  --primary-contrast: #f9f9fa;

  --text-heading-2:   #484848;
  --background-base:  #ffffff;

  --feedbacks-error:  #e53935;
  --feedbacks-success:#2e7d32;
}
```

Todos os componentes consomem os tokens via `var(--token, #fallback)` — se você não definir o token, o fallback é aplicado automaticamente.

---

## 3. Componentes de Ação

### Button

Botão padrão da interface.

```html
<!-- Sólido (padrão) -->
<creamy-kit-button>Salvar</creamy-kit-button>

<!-- Outline -->
<creamy-kit-button appearance="outline">Cancelar</creamy-kit-button>

<!-- Sobre superfície da marca -->
<creamy-kit-button contrast="on-brand">Comprar</creamy-kit-button>

<!-- Outline + on-brand -->
<creamy-kit-button appearance="outline" contrast="on-brand">Ver mais</creamy-kit-button>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `appearance` | `'solid' \| 'outline'` | `'solid'` | Estilo visual |
| `contrast` | `'default' \| 'on-brand'` | `'default'` | Contexto de cor |

---

## 4. Formulários

Todos os campos implementam `ControlValueAccessor` e funcionam com `[(ngModel)]` e Reactive Forms.

### Input

Campo de texto de linha única.

```html
<creamy-kit-input
  title="E-mail"
  placeholder="seu@email.com"
  helper="Nunca compartilhamos seu e-mail"
  [(ngModel)]="email"
>
  <!-- ícone opcional -->
  <svg icon>…</svg>
</creamy-kit-input>

<!-- Estado de erro -->
<creamy-kit-input
  title="E-mail"
  helper="E-mail inválido"
  [error]="true"
  [(ngModel)]="email"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `'default'` | `'default'` | Variação visual |
| `type` | `string` | `'text'` | Tipo do `<input>` nativo |
| `title` | `string` | `''` | Label acima do campo |
| `placeholder` | `string` | `''` | Placeholder |
| `helper` | `string` | `''` | Texto de ajuda abaixo |
| `error` | `boolean` | `false` | Estado de erro |
| `disabled` | `boolean` | `false` | Desabilita o campo |

---

### Textbox

Textarea multi-linha com contador de caracteres opcional.

```html
<creamy-kit-textbox
  title="Comentário"
  placeholder="Escreva aqui…"
  helper="Seja objetivo"
  [maxLength]="280"
  [(ngModel)]="comentario"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `title` | `string` | `''` | Label |
| `placeholder` | `string` | `''` | Placeholder |
| `helper` | `string` | `''` | Texto de ajuda |
| `maxLength` | `number \| null` | `null` | Limite de caracteres (exibe contador) |
| `error` | `boolean` | `false` | Estado de erro |
| `disabled` | `boolean` | `false` | Desabilita |
| `variant` | `'default' \| 'on-brand'` | `'default'` | Variação de cor |

---

### Password

Input de senha com botão de exibir/esconder.

```html
<creamy-kit-password
  title="Senha"
  placeholder="Mínimo 8 caracteres"
  helper="Use letras maiúsculas e números"
  [(ngModel)]="senha"
/>
```

Mesmos inputs do `Input` (sem `type`).

---

### Search

Barra de busca com ícone de lupa e botão de limpar.

```html
<creamy-kit-search
  placeholder="Buscar produto…"
  [(ngModel)]="busca"
>
  <!-- ícone customizado à direita (em repouso) -->
  <svg iconRight>…</svg>
</creamy-kit-search>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `'default' \| 'on-brand'` | `'default'` | Variação |
| `placeholder` | `string` | `''` | Placeholder |
| `small` | `boolean` | `false` | Versão compacta (40px) |
| `disabled` | `boolean` | `false` | Desabilita |

---

### Dropdown

Select de opção única com menu flutuante.

```html
<creamy-kit-dropdown
  title="Estado"
  placeholder="Selecione…"
  [options]="estados"
  [(ngModel)]="estadoSelecionado"
/>
```

```ts
estados = [
  { label: 'São Paulo', value: 'SP' },
  { label: 'Rio de Janeiro', value: 'RJ' },
];
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `options` | `{ label: string; value: string }[]` | `[]` | Opções do menu |
| `title` | `string` | `''` | Label |
| `placeholder` | `string` | `''` | Texto quando nada selecionado |
| `helper` | `string` | `''` | Texto de ajuda |
| `error` | `boolean` | `false` | Estado de erro |
| `disabled` | `boolean` | `false` | Desabilita |

---

### MultiDropdown

Select de múltipla seleção.

```html
<creamy-kit-multidropdown
  title="Categorias"
  placeholder="Selecione…"
  [options]="categorias"
  [(ngModel)]="categoriasSelecionadas"
/>
```

Mesma API do `Dropdown`. O valor é `string[]`.

---

### Checkbox

Grupo de checkboxes.

```html
<creamy-kit-checkbox
  [options]="opcoes"
  [divider]="true"
  [(ngModel)]="selecionados"
/>
```

```ts
opcoes: CheckboxOption[] = [
  { label: 'Receber novidades', value: 'news' },
  { label: 'Receber promoções', value: 'promo' },
];
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `options` | `CheckboxOption[]` | `[]` | Lista de opções |
| `divider` | `boolean` | `true` | Separador entre itens |
| `disabled` | `boolean` | `false` | Desabilita tudo |

O valor é `string[]` com os `value` das opções marcadas.

---

### Radio

Grupo de radio buttons — seleção única.

```html
<creamy-kit-radio
  [options]="formasPagamento"
  [(ngModel)]="formaSelecionada"
/>

<!-- Com cor personalizada -->
<creamy-kit-radio
  [options]="formasPagamento"
  color="var(--secondary-base)"
  [(ngModel)]="formaSelecionada"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `options` | `RadioOption[]` | `[]` | Lista de opções |
| `color` | `string \| undefined` | `undefined` | Cor do ícone (token CSS ou valor direto) |
| `disabled` | `boolean` | `false` | Desabilita |

O valor é `string` com o `value` da opção selecionada.

---

### Switch

Toggle on/off.

```html
<creamy-kit-switch [(ngModel)]="notificacoesAtivas" />

<!-- Com cor personalizada -->
<creamy-kit-switch
  color="var(--secondary-base)"
  [(ngModel)]="modoEscuro"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `color` | `string \| undefined` | `undefined` | Cor quando ativo |
| `disabled` | `boolean` | `false` | Desabilita |

O valor é `boolean`.

---

### Code (OTP)

Campo de código de verificação (OTP / PIN).

```html
<!-- 6 dígitos (padrão) -->
<creamy-kit-code [(ngModel)]="codigo" />

<!-- 4 dígitos -->
<creamy-kit-code [length]="4" [(ngModel)]="pin" />
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `length` | `number` | `6` | Quantidade de dígitos |
| `disabled` | `boolean` | `false` | Desabilita |

O valor é `string` com o código completo (ex: `"123456"`).

---

### Calendar

Calendário mensal com seleção de data.

```html
<creamy-kit-calendar
  footerLabel="Data selecionada"
  footerValue="auto"
  [(ngModel)]="dataSelecionada"
  (dateChange)="onData($event)"
/>

<!-- Com locale customizado -->
<creamy-kit-calendar locale="en-US" [(ngModel)]="data" />
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `footerLabel` | `string` | `''` | Título do rodapé |
| `footerValue` | `string` | `''` | `''` oculta · `'auto'` formata data · outro texto é exibido |
| `bare` | `boolean` | `false` | Remove borda/radius (para embutir em outro container) |
| `disabled` | `boolean` | `false` | Desabilita navegação e seleção |
| `locale` | `string` | `'pt-BR'` | Locale BCP 47 para formatação de meses |

| Output | Tipo | Descrição |
|---|---|---|
| `dateChange` | `Date` | Emitido ao selecionar um dia |

O valor CVA é `Date | null`.

---

### DatePicker

Input de data com calendário flutuante.

```html
<creamy-kit-date-picker
  placeholder="DD/MM/AAAA"
  [(ngModel)]="data"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `placeholder` | `string` | `''` | Placeholder |
| `disabled` | `boolean` | `false` | Desabilita |

---

## 5. Navegação

### TabBar

Barra de navegação inferior com abas.

```html
<creamy-kit-tab-bar
  ariaLabel="Navegação principal"
  [(ngModel)]="abaSelecionada"
>
  <creamy-kit-tab-bar-item icon="home_base"     label="Início"  value="home"    />
  <creamy-kit-tab-bar-item icon="search_variant" label="Buscar"  value="search"  />
  <creamy-kit-tab-bar-item icon="user_base"      label="Perfil"  value="profile" />
</creamy-kit-tab-bar>
```

**TabBar inputs:**

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `ariaLabel` | `string` | `'Navegação'` | Rótulo acessível do `<nav>` |
| `disabled` | `boolean` | `false` | Desabilita toda a barra |

**TabBarItem inputs:**

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `icon` | `string` | obrigatório | Nome do ícone SVG |
| `value` | `string` | obrigatório | Identificador da aba |
| `label` | `string \| undefined` | `undefined` | Label abaixo do ícone |

---

### Tabs

Abas horizontais de navegação.

```html
<creamy-kit-tabs
  [tabs]="abas"
  [(ngModel)]="abaAtiva"
/>
```

```ts
abas = [
  { label: 'Todos', value: 'all' },
  { label: 'Ativos', value: 'active' },
  { label: 'Arquivados', value: 'archived' },
];
```

---

### Breadcrumb

Rastro de navegação hierárquica.

```html
<creamy-kit-breadcrumb
  [items]="migalhas"
  (itemClick)="navegar($event)"
/>
```

```ts
migalhas = [
  { label: 'Início', value: '/' },
  { label: 'Produtos', value: '/produtos' },
  { label: 'Detalhes', value: null }, // último item (sem link)
];
```

---

### Pagination

Controle de paginação.

```html
<creamy-kit-pagination
  [total]="200"
  [pageSize]="20"
  [(ngModel)]="paginaAtual"
/>
```

---

### Headers

Quatro variações de cabeçalho de tela:

```html
<!-- Título simples com botão de voltar -->
<creamy-kit-header-title
  title="Meu Perfil"
  (backClick)="voltar()"
/>

<!-- Título grande (tela inicial) -->
<creamy-kit-header-large-title
  title="Olá, Luiz"
  subtitle="Bem-vindo de volta"
/>

<!-- Com busca e microfone -->
<creamy-kit-header-search
  title="Buscar"
  (backClick)="voltar()"
  (micClick)="ativarVoz()"
/>

<!-- Com avatar de perfil -->
<creamy-kit-header-profile
  title="Home"
  avatarSrc="foto.jpg"
  (avatarClick)="irParaPerfil()"
/>
```

---

## 6. Feedback

### Alert

Caixa de aviso inline com botão de fechar.

```html
<creamy-kit-alert
  feedback="success"
  title="Pedido confirmado!"
  linkText="Ver pedido"
  linkHref="/pedidos/123"
  (closed)="onFechar()"
>
  Seu pedido foi processado e será enviado em até 2 dias úteis.
</creamy-kit-alert>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `feedback` | `'information' \| 'success' \| 'error'` | `'information'` | Cor semântica |
| `title` | `string` | `''` | Título em destaque |
| `linkText` | `string` | `''` | Texto do link |
| `linkHref` | `string` | `''` | Destino do link (link só aparece quando definido) |

| Output | Tipo | Descrição |
|---|---|---|
| `closed` | `void` | Emitido ao fechar o alerta |

---

### Snackbar

Notificação compacta (toast). Geralmente posicionada com CSS absoluto/fixo.

```html
<creamy-kit-snackbar feedback="error">
  Não foi possível salvar as alterações.
</creamy-kit-snackbar>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `feedback` | `'information' \| 'success' \| 'error' \| 'warning' \| 'black' \| 'white'` | `'information'` | Cor semântica |

---

### Banner

Faixa informativa com ícone, título e descrição. Três variações:

```html
<!-- Simples -->
<creamy-kit-banner
  iconName="lock_base"
  iconColor="--feedbacks-information"
  title="Conta verificada"
  description="Sua conta está protegida."
/>

<!-- Com tag de ação -->
<creamy-kit-banner-tag
  iconName="microphone_base"
  title="Microfone ativo"
  tagLabel="Pausar"
  (tagClick)="pausar()"
/>

<!-- Com chevron (navegação) -->
<creamy-kit-banner-card
  iconName="settings_base"
  title="Configurações"
  description="Gerencie sua conta"
  trailingIconName="arrow_right"
  (click)="irParaConfig()"
/>
```

| Input comum | Tipo | Padrão | Descrição |
|---|---|---|---|
| `iconName` | `string` | `''` | Nome do ícone principal |
| `iconColor` | `string` | `'--feedbacks-information'` | Token CSS da cor do ícone |
| `title` | `string` | `''` | Título |
| `description` | `string` | `''` | Descrição |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho |
| `disabled` | `boolean` | `false` | Estado desabilitado |

---

### Loading

Spinner animado com ícone central opcional.

```html
<!-- Padrão -->
<creamy-kit-loading />

<!-- Grande, sem ícone -->
<creamy-kit-loading size="large" [showIcon]="false" />

<!-- Sobre fundo colorido -->
<creamy-kit-loading variant="on-brand" />

<!-- Com ícone customizado -->
<creamy-kit-loading icon="lock_base" size="large" variant="neutral" />
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `icon` | `string` | `'circle_variant'` | Ícone central |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Tamanho |
| `variant` | `'primary' \| 'neutral' \| 'on-brand'` | `'primary'` | Cor |
| `showIcon` | `boolean` | `true` | Exibe o ícone central |
| `ariaLabel` | `string` | `'Carregando'` | Rótulo acessível |

---

### Progress

Barra de progresso.

```html
<creamy-kit-progress [value]="75" />
```

---

### Tooltip

Rótulo informativo compacto, com largura ajustada ao conteúdo.

```html
<creamy-kit-tooltip text="Copiar link" />

<creamy-kit-tooltip
  text="Configurações avançadas"
  icon="settings_base"
  variant="contrast"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `text` | `string` | `''` | Texto exibido |
| `icon` | `string \| undefined` | `undefined` | Ícone à esquerda do texto |
| `variant` | `'default' \| 'contrast'` | `'default'` | Estilo (fundo neutro ou escuro) |

---

## 7. Data Display

### Avatar

Três variações: ícone, imagem e texto.

```html
<!-- Com ícone -->
<creamy-kit-avatar-icon
  name="user_base"
  size="large"
  contrast="dark"
  [percentage]="80"
/>

<!-- Com imagem (src e alt são obrigatórios) -->
<creamy-kit-avatar-image
  src="https://example.com/foto.jpg"
  alt="Foto de Luiz"
  size="medium"
/>

<!-- Com iniciais -->
<creamy-kit-avatar-text
  text="LM"
  size="small"
  contrast="light"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho |
| `contrast` | `'dark' \| 'light'` | `'dark'` | Contraste de cor |
| `percentage` | `number` | `0` | Anel de progresso (0–100) |

---

### Card

Container genérico com sombra e radius.

```html
<creamy-kit-card>
  <p>Conteúdo projetado via ng-content.</p>
</creamy-kit-card>
```

---

### List

Lista de itens.

```html
<creamy-kit-list [items]="itens" />
```

---

### Product Card

Cartão de produto com imagem, nome e preço.

```html
<creamy-kit-product-card
  imageSrc="produto.jpg"
  name="Tênis Running"
  price="R$ 299,90"
/>
```

---

### Shortcut

Botão de atalho com ícone e label (ambos obrigatórios).

```html
<creamy-kit-shortcut
  iconName="wallet_base"
  label="Carteira"
  (pressed)="abrirCarteira()"
/>
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `iconName` | `string` | obrigatório | Nome do ícone |
| `label` | `string` | obrigatório | Texto abaixo do ícone |

| Output | Tipo | Descrição |
|---|---|---|
| `pressed` | `void` | Emitido ao clicar |

---

### Tag

Etiqueta de status ou categoria.

```html
<creamy-kit-tag>Novo</creamy-kit-tag>
<creamy-kit-tag variant="outline">Pendente</creamy-kit-tag>
```

---

## 8. Overlays

### Modal

Diálogo modal com título, conteúdo e ações.

```html
<creamy-kit-modal
  title="Confirmar exclusão"
  [visible]="modalAberto"
  (closed)="modalAberto = false"
>
  Tem certeza que deseja excluir este item?

  <ng-container actions>
    <creamy-kit-button appearance="outline" (click)="cancelar()">Cancelar</creamy-kit-button>
    <creamy-kit-button (click)="confirmar()">Excluir</creamy-kit-button>
  </ng-container>
</creamy-kit-modal>
```

---

### Sheets

Painel deslizante inferior (bottom sheet).

```html
<creamy-kit-sheets
  [visible]="sheetsAberto"
  (closed)="sheetsAberto = false"
>
  <p>Conteúdo do painel.</p>
</creamy-kit-sheets>
```

---

## 9. Mídia

### Icon

Renderiza um ícone SVG do `creamy-kit-resources` via CSS `mask-image`.

```html
<creamy-kit-icon name="home_base" />
<creamy-kit-icon name="lock_base" [size]="32" color="var(--primary-base)" />
<creamy-kit-icon name="search_variant" [size]="16" color="#ed339c" />
```

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `name` | `string` | obrigatório | Nome do arquivo SVG (sem `.svg`) |
| `size` | `number` | `24` | Largura e altura em px |
| `color` | `string` | `'currentColor'` | Cor CSS (token, hex, rgb ou `currentColor`) |
| `ariaLabel` | `string \| undefined` | `undefined` | Rótulo acessível (padrão: `name`) |

---

### Image

Imagem com fallback e tratamento de erro.

```html
<creamy-kit-image src="foto.jpg" alt="Descrição" />
```

---

### Brand / Logos

Quatro variações para exibir a marca Creamy:

```html
<creamy-kit-brand />                     <!-- logo padrão -->
<creamy-kit-brand-square />              <!-- versão quadrada -->
<creamy-kit-brand-horizontal />          <!-- versão horizontal -->
<creamy-kit-brand-cardholder name="visa" /> <!-- bandeira de cartão -->
```

---

## 10. Tipografia

### Text

Componente de texto com variações de estilo.

```html
<creamy-kit-text variant="heading-1">Título principal</creamy-kit-text>
<creamy-kit-text variant="body">Parágrafo normal.</creamy-kit-text>
<creamy-kit-text variant="caption">Legenda pequena</creamy-kit-text>
```

---

### Text Link

Link inline estilizado.

```html
<creamy-kit-text-link href="/termos">Termos de uso</creamy-kit-text-link>
```

---

## 11. Layout

### Divider

Separador horizontal.

```html
<creamy-kit-divider />
```

---

## 12. Referência de tokens de design

| Token | Valor padrão | Uso |
|---|---|---|
| `--primary-base` | `#128cfe` | Cor principal (botões, seleção) |
| `--primary-variant` | `#00bfff` | Variante da cor principal |
| `--primary-contrast` | `#f9f9fa` | Texto sobre fundo primário |
| `--text-heading-2` | `#484848` | Texto de títulos |
| `--background-base` | `#ffffff` | Fundo padrão |
| `--background-variant` | `#f2f2f4` | Fundo alternativo |
| `--action-neutral-base` | `#f0f0f0` | Ações neutras |
| `--feedbacks-error` | `#e53935` | Erro |
| `--feedbacks-success` | `#2e7d32` | Sucesso |
| `--feedbacks-information` | `#128cfe` | Informação |
| `--feedbacks-alert` | `#f9a825` | Alerta/aviso |
| `--disabled-variant` | `#bdbdbd` | Elementos desabilitados |
| `--white` | `#ffffff` | Branco puro |
| `--black` | `#000000` | Preto puro |

---

## Padrões de uso com formulários reativos

```ts
// component.ts
form = new FormGroup({
  email:    new FormControl('', [Validators.required, Validators.email]),
  senha:    new FormControl('', Validators.minLength(8)),
  estado:   new FormControl(null),
  aceito:   new FormControl([]),
});
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <creamy-kit-input
    title="E-mail"
    formControlName="email"
    [error]="form.controls.email.invalid && form.controls.email.touched"
    helper="E-mail inválido"
  />

  <creamy-kit-password
    title="Senha"
    formControlName="senha"
  />

  <creamy-kit-dropdown
    title="Estado"
    [options]="estados"
    formControlName="estado"
  />

  <creamy-kit-checkbox
    [options]="termosOpcoes"
    formControlName="aceito"
  />
</form>
```

---

## Acessibilidade

- Todos os campos de formulário usam `<label>` associado ao `<input>` via `for`/`id`.
- Componentes interativos têm `aria-label`, `aria-checked`, `aria-expanded` e `role` corretos.
- `AlertComponent` usa `role="alert"` (leitura automática por screen readers).
- `LoadingComponent` usa `role="status"` com `aria-live="polite"`.
- `TabBarComponent` usa `role="tablist"` com `ariaLabel` configurável.
- `IconComponent` usa `role="img"` com `aria-label` derivado do nome do ícone.
