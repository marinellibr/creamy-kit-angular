import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent, TooltipVariant } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Creation & defaults
  // ---------------------------------------------------------------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default text to empty string', () => {
    expect(component.text()).toBe('');
  });

  it('should default icon to undefined', () => {
    expect(component.icon()).toBeUndefined();
  });

  it('should default variant to "default"', () => {
    expect(component.variant()).toBe('default');
  });

  // ---------------------------------------------------------------------------
  // hostClass computed
  // ---------------------------------------------------------------------------

  it('should compute hostClass as "kit-tooltip kit-tooltip--default" by default', () => {
    expect(component.hostClass()).toBe('kit-tooltip kit-tooltip--default');
  });

  it('should compute hostClass as "kit-tooltip kit-tooltip--contrast" when variant is "contrast"', () => {
    fixture.componentRef.setInput('variant', 'contrast');
    expect(component.hostClass()).toBe('kit-tooltip kit-tooltip--contrast');
  });

  it('should always include "kit-tooltip" in hostClass', () => {
    expect(component.hostClass()).toContain('kit-tooltip');
    fixture.componentRef.setInput('variant', 'contrast');
    expect(component.hostClass()).toContain('kit-tooltip');
  });

  // ---------------------------------------------------------------------------
  // hostClass for all variants
  // ---------------------------------------------------------------------------

  const variants: TooltipVariant[] = ['default', 'contrast'];

  variants.forEach((variant) => {
    it(`should include "kit-tooltip--${variant}" in hostClass when variant is "${variant}"`, () => {
      fixture.componentRef.setInput('variant', variant);
      expect(component.hostClass()).toContain(`kit-tooltip--${variant}`);
    });
  });

  // ---------------------------------------------------------------------------
  // Host class applied to element
  // ---------------------------------------------------------------------------

  it('should apply kit-tooltip class on host element', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-tooltip')).toBe(true);
  });

  it('should apply kit-tooltip--default class on host element by default', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-tooltip--default')).toBe(true);
  });

  it('should apply kit-tooltip--contrast class on host element when variant is "contrast"', () => {
    fixture.componentRef.setInput('variant', 'contrast');
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-tooltip--contrast')).toBe(true);
  });

  it('should remove previous variant class when variant changes', () => {
    fixture.componentRef.setInput('variant', 'contrast');
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-tooltip--default')).toBe(false);
    expect(host.classList.contains('kit-tooltip--contrast')).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Text rendering
  // ---------------------------------------------------------------------------

  it('should render .kit-tooltip__text element', () => {
    const textEl = fixture.nativeElement.querySelector('.kit-tooltip__text');
    expect(textEl).not.toBeNull();
  });

  it('should render provided text in .kit-tooltip__text', () => {
    fixture.componentRef.setInput('text', 'Copy to clipboard');
    fixture.detectChanges();
    const textEl = fixture.nativeElement.querySelector('.kit-tooltip__text');
    expect(textEl.textContent.trim()).toBe('Copy to clipboard');
  });

  it('should update text content when text input changes', () => {
    fixture.componentRef.setInput('text', 'First');
    fixture.detectChanges();
    fixture.componentRef.setInput('text', 'Second');
    fixture.detectChanges();
    const textEl = fixture.nativeElement.querySelector('.kit-tooltip__text');
    expect(textEl.textContent.trim()).toBe('Second');
  });

  it('should render empty text when text is empty string', () => {
    const textEl = fixture.nativeElement.querySelector('.kit-tooltip__text');
    expect(textEl.textContent.trim()).toBe('');
  });

  // ---------------------------------------------------------------------------
  // Icon rendering
  // ---------------------------------------------------------------------------

  it('should not render the icon element when icon is undefined', () => {
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).toBeNull();
  });

  it('should render creamy-kit-icon when icon input is set', () => {
    fixture.componentRef.setInput('icon', 'settings_base');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).not.toBeNull();
  });

  it('should render icon with kit-tooltip__icon class', () => {
    fixture.componentRef.setInput('icon', 'settings_base');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon.kit-tooltip__icon');
    expect(icon).not.toBeNull();
  });

  it('should hide icon when icon input is cleared back to undefined', () => {
    fixture.componentRef.setInput('icon', 'settings_base');
    fixture.detectChanges();
    fixture.componentRef.setInput('icon', undefined);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // Template structure
  // ---------------------------------------------------------------------------

  it('should render a .kit-tooltip__content wrapper element', () => {
    const content = fixture.nativeElement.querySelector('.kit-tooltip__content');
    expect(content).not.toBeNull();
  });

  it('should place .kit-tooltip__text inside .kit-tooltip__content', () => {
    const textEl = fixture.nativeElement.querySelector(
      '.kit-tooltip__content .kit-tooltip__text',
    );
    expect(textEl).not.toBeNull();
  });

  it('should place icon inside .kit-tooltip__content when icon is set', () => {
    fixture.componentRef.setInput('icon', 'star_base');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector(
      '.kit-tooltip__content creamy-kit-icon',
    );
    expect(icon).not.toBeNull();
  });
});
