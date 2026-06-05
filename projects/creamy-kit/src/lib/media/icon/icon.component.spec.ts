import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { IconComponent } from './icon.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'arrow_right');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('maskImageUrl', () => {
    it('builds the mask image URL from the name input', () => {
      expect(component.maskImageUrl()).toBe('url("/test-icons/arrow_right.svg")');
    });

    it('updates the mask image URL when name changes', () => {
      fixture.componentRef.setInput('name', 'lock_base');
      expect(component.maskImageUrl()).toBe('url("/test-icons/lock_base.svg")');
    });

    it('applies maskImageUrl to the span mask-image style', () => {
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.maskImage).toBe('url("/test-icons/arrow_right.svg")');
    });
  });

  describe('aria-label', () => {
    it('defaults aria-label to the icon name when ariaLabel is not set', () => {
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.getAttribute('aria-label')).toBe('arrow_right');
    });

    it('uses the custom ariaLabel when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Go right');
      fixture.detectChanges();
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.getAttribute('aria-label')).toBe('Go right');
    });

    it('reverts to the name when ariaLabel is set back to undefined', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom label');
      fixture.detectChanges();
      fixture.componentRef.setInput('ariaLabel', undefined);
      fixture.detectChanges();
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.getAttribute('aria-label')).toBe('arrow_right');
    });
  });

  describe('size', () => {
    it('applies the default size of 24px to width and height', () => {
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.width).toBe('24px');
      expect(span.style.height).toBe('24px');
    });

    it('applies a custom size to the span dimensions', () => {
      fixture.componentRef.setInput('size', 32);
      fixture.detectChanges();
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.width).toBe('32px');
      expect(span.style.height).toBe('32px');
    });
  });

  describe('color', () => {
    it('applies the default color "currentColor" as background-color', () => {
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.backgroundColor.toLowerCase()).toBe('currentcolor');
    });

    it('applies a custom color to the span background-color', () => {
      fixture.componentRef.setInput('color', 'red');
      fixture.detectChanges();
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.backgroundColor).toBe('red');
    });
  });

  describe('role', () => {
    it('sets role="img" on the span', () => {
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.getAttribute('role')).toBe('img');
    });
  });
});
