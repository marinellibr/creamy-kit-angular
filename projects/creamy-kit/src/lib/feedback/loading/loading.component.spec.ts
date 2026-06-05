import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent, LoadingSize, LoadingVariant } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Creation & defaults
  // ---------------------------------------------------------------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default size to "medium"', () => {
    expect(component.size()).toBe('medium');
  });

  it('should default variant to "primary"', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should default icon to "circle_variant"', () => {
    expect(component.icon()).toBe('circle_variant');
  });

  it('should default showIcon to true', () => {
    expect(component.showIcon()).toBe(true);
  });

  it('should default ariaLabel to "Carregando"', () => {
    expect(component.ariaLabel()).toBe('Carregando');
  });

  // ---------------------------------------------------------------------------
  // Host bindings
  // ---------------------------------------------------------------------------

  it('should have role="status" on the host element', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('role')).toBe('status');
  });

  it('should have aria-live="polite" on the host element', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('aria-live')).toBe('polite');
  });

  it('should set aria-label="Carregando" on host by default', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('aria-label')).toBe('Carregando');
  });

  it('should update aria-label when ariaLabel input changes', () => {
    fixture.componentRef.setInput('ariaLabel', 'Loading data');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-label')).toBe('Loading data');
  });

  // ---------------------------------------------------------------------------
  // hostClass computed
  // ---------------------------------------------------------------------------

  it('should compute hostClass as "kit-loading kit-loading--medium kit-loading--primary" by default', () => {
    expect(component.hostClass()).toBe(
      'kit-loading kit-loading--medium kit-loading--primary',
    );
  });

  it('should compute hostClass with custom size and variant', () => {
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('variant', 'neutral');
    expect(component.hostClass()).toBe(
      'kit-loading kit-loading--large kit-loading--neutral',
    );
  });

  it('should apply kit-loading class on host', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-loading')).toBe(true);
  });

  it('should apply size modifier class on host', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-loading--medium')).toBe(true);
  });

  it('should apply variant modifier class on host', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-loading--primary')).toBe(true);
  });

  it('should update size modifier class when size input changes', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-loading--small')).toBe(true);
    expect(host.classList.contains('kit-loading--medium')).toBe(false);
  });

  it('should update variant modifier class when variant input changes', () => {
    fixture.componentRef.setInput('variant', 'on-brand');
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-loading--on-brand')).toBe(true);
    expect(host.classList.contains('kit-loading--primary')).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // hostClass for all size values
  // ---------------------------------------------------------------------------

  const sizes: LoadingSize[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

  sizes.forEach((size) => {
    it(`should include "kit-loading--${size}" in hostClass when size is "${size}"`, () => {
      fixture.componentRef.setInput('size', size);
      expect(component.hostClass()).toContain(`kit-loading--${size}`);
    });
  });

  // ---------------------------------------------------------------------------
  // hostClass for all variant values
  // ---------------------------------------------------------------------------

  const variants: LoadingVariant[] = ['primary', 'neutral', 'on-brand'];

  variants.forEach((variant) => {
    it(`should include "kit-loading--${variant}" in hostClass when variant is "${variant}"`, () => {
      fixture.componentRef.setInput('variant', variant);
      expect(component.hostClass()).toContain(`kit-loading--${variant}`);
    });
  });

  // ---------------------------------------------------------------------------
  // iconPx computed
  // ---------------------------------------------------------------------------

  it('should compute iconPx=6 for size "medium" (default)', () => {
    expect(component.iconPx()).toBe(6);
  });

  it('should compute iconPx=3 for size "xsmall"', () => {
    fixture.componentRef.setInput('size', 'xsmall');
    expect(component.iconPx()).toBe(3);
  });

  it('should compute iconPx=4 for size "small"', () => {
    fixture.componentRef.setInput('size', 'small');
    expect(component.iconPx()).toBe(4);
  });

  it('should compute iconPx=12 for size "large"', () => {
    fixture.componentRef.setInput('size', 'large');
    expect(component.iconPx()).toBe(12);
  });

  it('should compute iconPx=24 for size "xlarge"', () => {
    fixture.componentRef.setInput('size', 'xlarge');
    expect(component.iconPx()).toBe(24);
  });

  // ---------------------------------------------------------------------------
  // Template structure
  // ---------------------------------------------------------------------------

  it('should render 8 spokes', () => {
    const spokes = fixture.nativeElement.querySelectorAll('.kit-loading__spoke');
    expect(spokes.length).toBe(8);
  });

  it('should render the spokes SVG element', () => {
    const svg = fixture.nativeElement.querySelector('.kit-loading__spokes');
    expect(svg).not.toBeNull();
  });

  it('should render the center icon by default (showIcon=true)', () => {
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).not.toBeNull();
  });

  it('should hide the center icon when showIcon is false', () => {
    fixture.componentRef.setInput('showIcon', false);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).toBeNull();
  });

  it('should show the center icon again when showIcon is set back to true', () => {
    fixture.componentRef.setInput('showIcon', false);
    fixture.detectChanges();
    fixture.componentRef.setInput('showIcon', true);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).not.toBeNull();
  });
});
