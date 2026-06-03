/**
 * Tamanhos disponíveis para os componentes de Avatar.
 *
 * - `small`: 24 × 24 px
 * - `medium`: 32 × 32 px (padrão)
 * - `large`: 48 × 48 px
 */
export type AvatarSize = 'small' | 'medium' | 'large';

/**
 * Contraste de cor (fundo + conteúdo) do Avatar.
 *
 * - `dark` (padrão): fundo `--neutral-base`, conteúdo `--primary-contrast`.
 * - `light`: fundo `--primary-contrast`, conteúdo `--neutral-base`.
 * - `variant`: fundo `--primary-base`, conteúdo `--primary-contrast`.
 * - `on-brand`: fundo `--primary-contrast`, conteúdo `--primary-base`.
 */
export type AvatarContrast = 'dark' | 'light' | 'variant' | 'on-brand';
