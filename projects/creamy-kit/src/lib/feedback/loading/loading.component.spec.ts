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

  it('should have default variant as default', () => {
    expect(component.variant()).toBe('default');
  });

  it('should accept custom size', () => {
    fixture.componentRef.setInput('size', 'large');
    expect(component.size()).toBe('large');
  });

  it('should accept custom variant', () => {
    fixture.componentRef.setInput('variant', 'subtle');
    expect(component.variant()).toBe('subtle');
  });

  it('should render spinner SVG', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should have correct CSS classes', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.componentRef.setInput('variant', 'subtle');
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.kit-loading');
    expect(element.classList.contains('kit-loading--small')).toBeTruthy();
    expect(element.classList.contains('kit-loading--subtle')).toBeTruthy();
  });
});
