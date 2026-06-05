import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { BannerShellComponent } from './banner-shell.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BannerShellComponent', () => {
  let component: BannerShellComponent;
  let fixture: ComponentFixture<BannerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerShellComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title', () => {
    it('renders title in strong.banner__title when title is set', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('strong.banner__title');
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe('Test Title');
    });

    it('does not render strong.banner__title when title is empty', () => {
      fixture.componentRef.setInput('title', '');
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('strong.banner__title');
      expect(el).toBeNull();
    });
  });

  describe('description', () => {
    it('renders description in span.banner__description when description is set', () => {
      fixture.componentRef.setInput('description', 'Test description');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('span.banner__description');
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe('Test description');
    });

    it('does not render span.banner__description when description is empty', () => {
      fixture.componentRef.setInput('description', '');
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('span.banner__description');
      expect(el).toBeNull();
    });
  });

  describe('data-disabled host attribute', () => {
    it('sets data-disabled="" when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-disabled')).toBe('');
    });

    it('removes data-disabled when disabled is false', () => {
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-disabled')).toBeNull();
    });
  });

  describe('data-size host attribute', () => {
    it('sets data-size to "medium" by default', () => {
      expect(fixture.nativeElement.getAttribute('data-size')).toBe('medium');
    });

    it('sets data-size to "small"', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-size')).toBe('small');
    });

    it('sets data-size to "large"', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-size')).toBe('large');
    });
  });

  describe('iconColorCss', () => {
    it('returns var(--disabled-variant) when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const comp = component as unknown as { iconColorCss: () => string };
      expect(comp.iconColorCss()).toBe('var(--disabled-variant)');
    });

    it('returns var(iconColor) when disabled is false', () => {
      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('iconColor', '--feedbacks-information');
      fixture.detectChanges();
      const comp = component as unknown as { iconColorCss: () => string };
      expect(comp.iconColorCss()).toBe('var(--feedbacks-information)');
    });

    it('uses a custom iconColor token', () => {
      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('iconColor', '--feedbacks-success-variant-2');
      fixture.detectChanges();
      const comp = component as unknown as { iconColorCss: () => string };
      expect(comp.iconColorCss()).toBe('var(--feedbacks-success-variant-2)');
    });
  });

  describe('iconSizePx', () => {
    it('returns 16 for size small', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      const comp = component as unknown as { iconSizePx: () => number };
      expect(comp.iconSizePx()).toBe(16);
    });

    it('returns 24 for size medium', () => {
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();
      const comp = component as unknown as { iconSizePx: () => number };
      expect(comp.iconSizePx()).toBe(24);
    });

    it('returns 32 for size large', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const comp = component as unknown as { iconSizePx: () => number };
      expect(comp.iconSizePx()).toBe(32);
    });
  });
});
