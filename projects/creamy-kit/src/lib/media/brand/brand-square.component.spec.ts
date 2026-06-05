import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES, provideCreamyKitResources } from '../../core/resources';
import { BrandSquareComponent } from './brand-square.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BrandSquareComponent', () => {
  let component: BrandSquareComponent;
  let fixture: ComponentFixture<BrandSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandSquareComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandSquareComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('brandName', 'visa');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('brandUrl', () => {
    it('builds a square URL with default size (medium)', () => {
      expect(component.brandUrl()).toBe('/test-brands/visa_square_medium.svg');
    });

    it('reflects the size in the file name', () => {
      fixture.componentRef.setInput('size', 'large');
      expect(component.brandUrl()).toBe('/test-brands/visa_square_large.svg');
    });

    it('reflects small size in the file name', () => {
      fixture.componentRef.setInput('size', 'small');
      expect(component.brandUrl()).toBe('/test-brands/visa_square_small.svg');
    });

    it('slugifies brand names with spaces', () => {
      fixture.componentRef.setInput('brandName', 'Banco Inter');
      expect(component.brandUrl()).toBe('/test-brands/banco_inter_square_medium.svg');
    });

    it('applies the brandUrl to the img src attribute', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('src')).toBe('/test-brands/visa_square_medium.svg');
    });

    it('sets img alt to the brandName', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('alt')).toBe('visa');
    });
  });

  describe('size class on wrapper div', () => {
    it('applies the default brand-square--medium class', () => {
      const div: HTMLDivElement = fixture.nativeElement.querySelector('.brand-square');
      expect(div.classList.contains('brand-square--medium')).toBe(true);
    });

    it('applies brand-square--small class when size is small', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      const div: HTMLDivElement = fixture.nativeElement.querySelector('.brand-square');
      expect(div.classList.contains('brand-square--small')).toBe(true);
    });

    it('applies brand-square--large class when size is large', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const div: HTMLDivElement = fixture.nativeElement.querySelector('.brand-square');
      expect(div.classList.contains('brand-square--large')).toBe(true);
    });
  });

  describe('custom base URL via provideCreamyKitResources', () => {
    it('uses the configured brandsBaseUrl', async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [BrandSquareComponent],
        providers: [provideCreamyKitResources({ brandsBaseUrl: '/assets/brands' })],
      }).compileComponents();

      const f = TestBed.createComponent(BrandSquareComponent);
      f.componentRef.setInput('brandName', 'visa');
      expect(f.componentInstance.brandUrl()).toBe('/assets/brands/visa_square_medium.svg');
    });
  });
});
