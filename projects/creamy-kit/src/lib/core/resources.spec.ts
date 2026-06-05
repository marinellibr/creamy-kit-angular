import { TestBed } from '@angular/core/testing';
import {
  CREAMY_KIT_RESOURCES,
  CREAMY_KIT_RESOURCES_DEFAULTS,
  provideCreamyKitResources,
} from './resources';
import { buildBrandUrl, brandSlug } from '../media/brand/brand.util';

describe('CREAMY_KIT_RESOURCES', () => {
  it('aponta para o GitHub raw por padrão (sem configuração)', () => {
    TestBed.configureTestingModule({});
    const res = TestBed.inject(CREAMY_KIT_RESOURCES);
    expect(res).toBe(CREAMY_KIT_RESOURCES_DEFAULTS);
    expect(res.iconsBaseUrl).toContain('creamy-kit-resources');
    expect(res.iconsBaseUrl.endsWith('/icons')).toBe(true);
    expect(res.brandsBaseUrl.endsWith('/brands')).toBe(true);
  });

  it('provideCreamyKitResources sobrescreve só o que foi passado', () => {
    TestBed.configureTestingModule({
      providers: [provideCreamyKitResources({ iconsBaseUrl: '/assets/icons' })],
    });
    const res = TestBed.inject(CREAMY_KIT_RESOURCES);
    expect(res.iconsBaseUrl).toBe('/assets/icons');
    expect(res.brandsBaseUrl).toBe(CREAMY_KIT_RESOURCES_DEFAULTS.brandsBaseUrl);
  });

  it('provideCreamyKitResources sobrescreve brandsBaseUrl', () => {
    TestBed.configureTestingModule({
      providers: [provideCreamyKitResources({ brandsBaseUrl: '/assets/brands' })],
    });
    const res = TestBed.inject(CREAMY_KIT_RESOURCES);
    expect(res.brandsBaseUrl).toBe('/assets/brands');
    expect(res.iconsBaseUrl).toBe(CREAMY_KIT_RESOURCES_DEFAULTS.iconsBaseUrl);
  });
});

describe('brand.util', () => {
  it('brandSlug normaliza espaços e caixa', () => {
    expect(brandSlug('Banco Inter')).toBe('banco_inter');
    expect(brandSlug('  VISA  ')).toBe('visa');
  });

  it('brandSlug handles single lowercase word', () => {
    expect(brandSlug('creamy')).toBe('creamy');
  });

  it('buildBrandUrl monta square/horizontal com size', () => {
    expect(buildBrandUrl('/b', 'visa', 'square', 'large')).toBe('/b/visa_square_large.svg');
    expect(buildBrandUrl('/b', 'Visa', 'horizontal', 'small')).toBe('/b/visa_horizontal_small.svg');
  });

  it('buildBrandUrl monta cardholder sem size', () => {
    expect(buildBrandUrl('/b', 'visa', 'cardholder')).toBe('/b/visa_cardholder.svg');
  });

  it('buildBrandUrl slugifica o nome', () => {
    expect(buildBrandUrl('/b', 'Banco Inter', 'square', 'large')).toBe('/b/banco_inter_square_large.svg');
  });
});
