import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InputComponent] }).compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('has correct defaults', () => {
    expect(component.variant()).toBe('default');
    expect(component.type()).toBe('text');
    expect(component.placeholder()).toBe('');
    expect(component.title()).toBe('');
    expect(component.helper()).toBe('');
    expect(component.disabled()).toBe(false);
    expect(component.error()).toBe(false);
  });

  it('sets data-variant host attribute', () => {
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('default');
  });

  it('sets data-error host attribute when error=true', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.hasAttribute('data-error')).toBe(true);
  });

  it('does not set data-error host attribute when error=false', () => {
    expect(fixture.nativeElement.hasAttribute('data-error')).toBe(false);
  });

  it('sets data-disabled host attribute when disabled=true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.hasAttribute('data-disabled')).toBe(true);
  });

  it('writeValue updates the displayed value', () => {
    component.writeValue('hello');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('hello');
  });

  it('writeValue with null/undefined sets empty string', () => {
    component.writeValue(null as unknown as string);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('');
  });

  it('onInput emits value via onChange', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'typed';
    input.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('typed');
  });

  it('onBlur calls onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));
    expect(onTouched).toHaveBeenCalled();
  });

  it('setDisabledState disables the input', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.hasAttribute('data-disabled')).toBe(true);
  });

  it('title renders span.field__title when set', () => {
    fixture.componentRef.setInput('title', 'Email');
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.field__title');
    expect(span?.textContent?.trim()).toBe('Email');
  });

  it('helper renders span.field__helper when set', () => {
    fixture.componentRef.setInput('helper', 'Texto de ajuda');
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.field__helper');
    expect(span).toBeTruthy();
  });

  it('error icon visible inside helper when error=true', () => {
    fixture.componentRef.setInput('helper', 'Erro');
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.field__helper-icon');
    expect(icon).toBeTruthy();
  });
});
