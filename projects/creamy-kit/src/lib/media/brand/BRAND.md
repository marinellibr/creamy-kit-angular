# Brand Components

Componentes para exibir logos e marcas do Creamy Kit.

## Componentes Disponíveis

### BrandSquareComponent
Exibe logos em formato quadrado com tamanhos predefinidos.

```html
<creamy-brand-square brandName="visa" size="medium" />
```

**Inputs:**
- `brandName` (string, obrigatório): Nome da marca (ex: 'visa', 'mastercard', 'pix')
- `size` ('small' | 'medium' | 'large'): Tamanho do logo (padrão: 'medium')

**Tamanhos:**
- small: 64px × 64px
- medium: 128px × 128px
- large: 256px × 256px

### BrandHorizontalComponent
Exibe logos em formato horizontal com tamanhos predefinidos.

```html
<creamy-brand-horizontal brandName="mastercard" size="large" />
```

**Inputs:**
- `brandName` (string, obrigatório): Nome da marca
- `size` ('small' | 'medium' | 'large'): Tamanho do logo (padrão: 'medium')

**Tamanhos:**
- small: 128px × 40px
- medium: 256px × 80px
- large: 512px × 160px

### BrandCardholderComponent
Exibe logos no formato de cardholder (imagem de cartão com logo).

```html
<creamy-brand-cardholder brandName="visa" />
```

**Inputs:**
- `brandName` (string, obrigatório): Nome da marca

**Tamanho Fixo:**
- 360px × 226px

## Marcas Disponíveis

Consulte o repositório [creamy-kit-resources/brands](https://github.com/marinellibr/creamy-kit-resources/tree/main/brands) para a lista completa de marcas disponíveis:

- visa
- mastercard
- elo
- american_express (ou "american express")
- hipercard
- pagleve
- pix
- apple_pay (ou "apple pay")
- google_pay (ou "google pay")
- google_wallet (ou "google wallet")
- apple
- google
- facebook
- instagram
- whatsapp
- tiktok
- figma
- creamy_kit
- creamy_positive
- creamy_institucional
- creamy_transparent
- the_coffee
- E muitas outras...

## Exemplo de Uso

```typescript
import { Component } from '@angular/core';
import { BrandSquareComponent, BrandHorizontalComponent, BrandCardholderComponent } from '@creamy-kit';

@Component({
  selector: 'app-brands-demo',
  standalone: true,
  imports: [BrandSquareComponent, BrandHorizontalComponent, BrandCardholderComponent],
  template: `
    <div class="demo">
      <h2>Square Logos</h2>
      <creamy-brand-square brandName="visa" size="small" />
      <creamy-brand-square brandName="mastercard" size="medium" />
      <creamy-brand-square brandName="elo" size="large" />

      <h2>Horizontal Logos</h2>
      <creamy-brand-horizontal brandName="visa" size="small" />
      <creamy-brand-horizontal brandName="mastercard" size="medium" />
      <creamy-brand-horizontal brandName="pix" size="large" />

      <h2>Cardholder</h2>
      <creamy-brand-cardholder brandName="visa" />
      <creamy-brand-cardholder brandName="mastercard" />
    </div>
  `,
  styles: [`
    .demo {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 2rem;
    }

    h2 {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
    }

    creamy-brand-square,
    creamy-brand-horizontal,
    creamy-brand-cardholder {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  `]
})
export class BrandsDemoComponent {}
```

## Notas

- Os logos são carregados dinamicamente do repositório GitHub via CDN
- Nomes de marca são case-insensitive (ex: "Visa", "VISA" e "visa" são equivalentes)
- Nomes compostos com espaços são convertidos para underscores (ex: "american express" → "american_express")
- Erros de carregamento são exibidos no componente
- Os componentes são standalone e podem ser usados diretamente
