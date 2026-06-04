/** Tamanho do brand: `small` | `medium` (padrão) | `large`. */
export type BrandSize = 'small' | 'medium' | 'large';

/** Converte um nome de marca em slug de arquivo (`Banco Inter` → `banco_inter`). */
export function brandSlug(name: string): string {
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
export function buildBrandUrl(
  base: string,
  name: string,
  kind: 'square' | 'horizontal' | 'cardholder',
  size?: BrandSize,
): string {
  const suffix = size ? `${kind}_${size}` : kind;
  return `${base}/${brandSlug(name)}_${suffix}.svg`;
}
