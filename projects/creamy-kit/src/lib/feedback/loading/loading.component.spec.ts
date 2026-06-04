import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size as medium', () => {
    expect(component.size()).toBe('medium');
  });

  it('should have default variant as primary', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should default the center icon to circle_variant', () => {
    expect(component.icon()).toBe('circle_variant');
  });

  it('should accept custom size', () => {
    fixture.componentRef.setInput('size', 'large');
    expect(component.size()).toBe('large');
  });

  it('should accept custom variant', () => {
    fixture.componentRef.setInput('variant', 'neutral');
    expect(component.variant()).toBe('neutral');
  });

  it('should map size to the center icon px', () => {
    fixture.componentRef.setInput('size', 'large');
    expect(component.iconPx()).toBe(12);
    fixture.componentRef.setInput('size', 'xsmall');
    expect(component.iconPx()).toBe(3);
    fixture.componentRef.setInput('size', 'xlarge');
    expect(component.iconPx()).toBe(24);
  });

  it('should render 8 spokes', () => {
    const spokes = fixture.nativeElement.querySelectorAll('.kit-loading__spoke');
    expect(spokes.length).toBe(8);
  });

  it('should render the center icon by default', () => {
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).toBeTruthy();
  });

  it('should hide the center icon when showIcon is false', () => {
    fixture.componentRef.setInput('showIcon', false);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('creamy-kit-icon');
    expect(icon).toBeFalsy();
  });

  it('should apply size and variant classes on the host', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.componentRef.setInput('variant', 'on-brand');
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.classList.contains('kit-loading--small')).toBeTruthy();
    expect(host.classList.contains('kit-loading--on-brand')).toBeTruthy();
  });
});
