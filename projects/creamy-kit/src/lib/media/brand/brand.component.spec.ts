import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { BrandComponent } from './brand.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'creamy');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('src', () => {
    it('builds the src from brandsBaseUrl and name with default svg extension', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.getAttribute('src')).toBe('/test-brands/creamy.svg');
    });

    it('updates src when name changes', () => {
      fixture.componentRef.setInput('name', 'visa');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.getAttribute('src')).toBe('/test-brands/visa.svg');
    });

    it('uses a custom extension when ext is provided', () => {
      fixture.componentRef.setInput('ext', 'png');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.getAttribute('src')).toBe('/test-brands/creamy.png');
    });
  });

  describe('alt', () => {
    it('defaults alt to the brand name when alt input is empty', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.getAttribute('alt')).toBe('creamy');
    });

    it('uses the custom alt text when provided', () => {
      fixture.componentRef.setInput('alt', 'Creamy brand logo');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.getAttribute('alt')).toBe('Creamy brand logo');
    });

    it('falls back to name when alt is reset to empty string', () => {
      fixture.componentRef.setInput('alt', 'Custom');
      fixture.detectChanges();
      fixture.componentRef.setInput('alt', '');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.getAttribute('alt')).toBe('creamy');
    });
  });

  describe('height', () => {
    it('applies the default height of 24px', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.style.height).toBe('24px');
    });

    it('applies a custom height', () => {
      fixture.componentRef.setInput('height', 48);
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img.brand');
      expect(img.style.height).toBe('48px');
    });
  });
});
