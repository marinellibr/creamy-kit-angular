import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES, provideCreamyKitResources } from '../../core/resources';
import { BrandHorizontalComponent } from './brand-horizontal.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BrandHorizontalComponent', () => {
  let component: BrandHorizontalComponent;
  let fixture: ComponentFixture<BrandHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandHorizontalComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandHorizontalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('brandName', 'visa');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('brandUrl', () => {
    it('builds a horizontal URL with default size (medium)', () => {
      expect(component.brandUrl()).toBe('/test-brands/visa_horizontal_medium.svg');
    });

    it('reflects the size in the file name', () => {
      fixture.componentRef.setInput('size', 'small');
      expect(component.brandUrl()).toBe('/test-brands/visa_horizontal_small.svg');
    });

    it('reflects large size in the file name', () => {
      fixture.componentRef.setInput('size', 'large');
      expect(component.brandUrl()).toBe('/test-brands/visa_horizontal_large.svg');
    });

    it('slugifies brand names with spaces', () => {
      fixture.componentRef.setInput('brandName', 'Banco Inter');
      expect(component.brandUrl()).toBe('/test-brands/banco_inter_horizontal_medium.svg');
    });

    it('applies the brandUrl to the img src attribute', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('src')).toBe('/test-brands/visa_horizontal_medium.svg');
    });

    it('sets img alt to the brandName', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('alt')).toBe('visa');
    });
  });

  describe('size class on wrapper div', () => {
    it('applies the default brand-horizontal--medium class', () => {
      const div: HTMLDivElement = fixture.nativeElement.querySelector('.brand-horizontal');
      expect(div.classList.contains('brand-horizontal--medium')).toBe(true);
    });

    it('applies brand-horizontal--small class when size is small', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      const div: HTMLDivElement = fixture.nativeElement.querySelector('.brand-horizontal');
      expect(div.classList.contains('brand-horizontal--small')).toBe(true);
    });

    it('applies brand-horizontal--large class when size is large', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const div: HTMLDivElement = fixture.nativeElement.querySelector('.brand-horizontal');
      expect(div.classList.contains('brand-horizontal--large')).toBe(true);
    });
  });

  describe('custom base URL via provideCreamyKitResources', () => {
    it('uses the configured brandsBaseUrl', async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [BrandHorizontalComponent],
        providers: [provideCreamyKitResources({ brandsBaseUrl: '/cdn/brands' })],
      }).compileComponents();

      const f = TestBed.createComponent(BrandHorizontalComponent);
      f.componentRef.setInput('brandName', 'visa');
      expect(f.componentInstance.brandUrl()).toBe('/cdn/brands/visa_horizontal_medium.svg');
    });
  });
});
