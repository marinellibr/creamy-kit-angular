import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ButtonComponent] }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults: appearance=solid, contrast=default', () => {
    expect(component.appearance()).toBe('solid');
    expect(component.contrast()).toBe('default');
  });

  it('sets data-appearance host attribute', () => {
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-appearance')).toBe('outline');
  });

  it('sets data-contrast host attribute', () => {
    fixture.componentRef.setInput('contrast', 'on-brand');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-contrast')).toBe('on-brand');
  });
});
