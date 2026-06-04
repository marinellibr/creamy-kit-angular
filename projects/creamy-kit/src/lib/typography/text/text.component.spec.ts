import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComponent } from './text.component';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply title classes', () => {
    fixture.componentRef.setInput('type', 'title');
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('text--title')).toBe(true);
    expect(el.classList.contains('text--size-large')).toBe(true);
  });

  it('should apply color class', () => {
    fixture.componentRef.setInput('type', 'body');
    fixture.componentRef.setInput('color', 'variant');
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('text--color-variant')).toBe(true);
  });

  it('should apply bold class for body', () => {
    fixture.componentRef.setInput('type', 'body');
    fixture.componentRef.setInput('bold', true);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('text--bold')).toBe(true);
  });

  it('should apply underline class for label', () => {
    fixture.componentRef.setInput('type', 'label');
    fixture.componentRef.setInput('underline', true);
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('text--underline')).toBe(true);
  });

  it('section should not have color variant class', () => {
    fixture.componentRef.setInput('type', 'section');
    fixture.componentRef.setInput('color', 'variant');
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('span');
    expect(el.classList.contains('text--color-variant')).toBe(false);
  });
});
