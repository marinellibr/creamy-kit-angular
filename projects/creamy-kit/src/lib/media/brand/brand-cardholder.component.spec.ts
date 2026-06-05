import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES, provideCreamyKitResources } from '../../core/resources';
import { BrandCardholderComponent } from './brand-cardholder.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BrandCardholderComponent', () => {
  let component: BrandCardholderComponent;
  let fixture: ComponentFixture<BrandCardholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandCardholderComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandCardholderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('brandName', 'visa');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('brandUrl', () => {
    it('builds a cardholder URL without a size suffix', () => {
      expect(component.brandUrl()).toBe('/test-brands/visa_cardholder.svg');
    });

    it('does not include a size segment in the URL', () => {
      expect(component.brandUrl()).not.toContain('_small');
      expect(component.brandUrl()).not.toContain('_medium');
      expect(component.brandUrl()).not.toContain('_large');
    });

    it('slugifies brand names with spaces', () => {
      fixture.componentRef.setInput('brandName', 'Banco Inter');
      expect(component.brandUrl()).toBe('/test-brands/banco_inter_cardholder.svg');
    });

    it('updates the URL when brandName changes', () => {
      fixture.componentRef.setInput('brandName', 'mastercard');
      expect(component.brandUrl()).toBe('/test-brands/mastercard_cardholder.svg');
    });

    it('applies the brandUrl to the img src attribute', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('src')).toBe('/test-brands/visa_cardholder.svg');
    });

    it('sets img alt to the brandName', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('alt')).toBe('visa');
    });
  });

  describe('custom base URL via provideCreamyKitResources', () => {
    it('uses the configured brandsBaseUrl', async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [BrandCardholderComponent],
        providers: [provideCreamyKitResources({ brandsBaseUrl: '/cdn/brands' })],
      }).compileComponents();

      const f = TestBed.createComponent(BrandCardholderComponent);
      f.componentRef.setInput('brandName', 'visa');
      expect(f.componentInstance.brandUrl()).toBe('/cdn/brands/visa_cardholder.svg');
    });
  });
});
