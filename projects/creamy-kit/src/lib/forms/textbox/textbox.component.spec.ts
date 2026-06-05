import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextboxComponent } from './textbox.component';

describe('TextboxComponent', () => {
  let component: TextboxComponent;
  let fixture: ComponentFixture<TextboxComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextboxComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Creation
  // ---------------------------------------------------------------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Default input values
  // ---------------------------------------------------------------------------

  it('should have default variant "default"', () => {
    expect(component.variant()).toBe('default');
  });

  it('should have default placeholder ""', () => {
    expect(component.placeholder()).toBe('');
  });

  it('should have default title ""', () => {
    expect(component.title()).toBe('');
  });

  it('should have default helper ""', () => {
    expect(component.helper()).toBe('');
  });

  it('should have default maxLength null', () => {
    expect(component.maxLength()).toBeNull();
  });

  it('should have default disabled false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should have default error false', () => {
    expect(component.error()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Host bindings — data-variant
  // ---------------------------------------------------------------------------

  it('should set data-variant attribute to "default" by default', () => {
    expect(nativeEl.getAttribute('data-variant')).toBe('default');
  });

  it('should update data-variant attribute when variant input changes', () => {
    fixture.componentRef.setInput('variant', 'on-brand');
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-variant')).toBe('on-brand');
  });

  // ---------------------------------------------------------------------------
  // Host bindings — data-error
  // ---------------------------------------------------------------------------

  it('should not have data-error attribute when error is false', () => {
    expect(nativeEl.getAttribute('data-error')).toBeNull();
  });

  it('should have data-error attribute (empty string) when error is true', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-error')).toBe('');
  });

  it('should remove data-error attribute when error is reset to false', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    fixture.componentRef.setInput('error', false);
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-error')).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // Host bindings — data-disabled
  // ---------------------------------------------------------------------------

  it('should not have data-disabled attribute by default', () => {
    expect(nativeEl.getAttribute('data-disabled')).toBeNull();
  });

  it('should have data-disabled attribute when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-disabled')).toBe('');
  });

  it('should have data-disabled attribute when setDisabledState(true) is called', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-disabled')).toBe('');
  });

  it('should remove data-disabled attribute when setDisabledState(false) is called', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    component.setDisabledState(false);
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-disabled')).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // isDisabled computed
  // ---------------------------------------------------------------------------

  it('isDisabled() should be false by default', () => {
    expect(component['isDisabled']()).toBe(false);
  });

  it('isDisabled() should be true when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component['isDisabled']()).toBe(true);
  });

  it('isDisabled() should be true when setDisabledState(true)', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(component['isDisabled']()).toBe(true);
  });

  it('isDisabled() should be true when either disabled input or form disabled', () => {
    fixture.componentRef.setInput('disabled', false);
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(component['isDisabled']()).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // hasFooter computed
  // ---------------------------------------------------------------------------

  it('hasFooter() should be false when helper is empty and maxLength is null', () => {
    expect(component['hasFooter']()).toBe(false);
  });

  it('hasFooter() should be true when helper is set', () => {
    fixture.componentRef.setInput('helper', 'Some helper text');
    fixture.detectChanges();
    expect(component['hasFooter']()).toBe(true);
  });

  it('hasFooter() should be true when maxLength is set', () => {
    fixture.componentRef.setInput('maxLength', 100);
    fixture.detectChanges();
    expect(component['hasFooter']()).toBe(true);
  });

  it('hasFooter() should be true when both helper and maxLength are set', () => {
    fixture.componentRef.setInput('helper', 'Helper');
    fixture.componentRef.setInput('maxLength', 200);
    fixture.detectChanges();
    expect(component['hasFooter']()).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Template rendering — title
  // ---------------------------------------------------------------------------

  it('should not render title element when title is empty', () => {
    const titleEl = nativeEl.querySelector('.textbox__title');
    expect(titleEl).toBeNull();
  });

  it('should render title element when title is set', () => {
    fixture.componentRef.setInput('title', 'My Title');
    fixture.detectChanges();
    const titleEl = nativeEl.querySelector('.textbox__title');
    expect(titleEl).not.toBeNull();
    expect(titleEl!.textContent).toBe('My Title');
  });

  // ---------------------------------------------------------------------------
  // Template rendering — textarea
  // ---------------------------------------------------------------------------

  it('should render a textarea.textbox__input', () => {
    const textarea = nativeEl.querySelector('textarea.textbox__input');
    expect(textarea).not.toBeNull();
  });

  it('should bind placeholder to textarea', () => {
    fixture.componentRef.setInput('placeholder', 'Type here…');
    fixture.detectChanges();
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    expect(textarea.placeholder).toBe('Type here…');
  });

  it('should bind maxlength attribute to textarea when maxLength is set', () => {
    fixture.componentRef.setInput('maxLength', 50);
    fixture.detectChanges();
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    expect(textarea.getAttribute('maxlength')).toBe('50');
  });

  it('should not set maxlength attribute when maxLength is null', () => {
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    expect(textarea.getAttribute('maxlength')).toBeNull();
  });

  it('should disable textarea when isDisabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Template rendering — helper
  // ---------------------------------------------------------------------------

  it('should not render footer when hasFooter is false', () => {
    const footer = nativeEl.querySelector('.textbox__footer');
    expect(footer).toBeNull();
  });

  it('should render helper text when helper is set', () => {
    fixture.componentRef.setInput('helper', 'Help text');
    fixture.detectChanges();
    const helper = nativeEl.querySelector('.textbox__helper');
    expect(helper).not.toBeNull();
    expect(helper!.textContent?.trim()).toBe('Help text');
  });

  it('should render counter when maxLength is set', () => {
    fixture.componentRef.setInput('maxLength', 100);
    fixture.detectChanges();
    const counter = nativeEl.querySelector('.textbox__counter');
    expect(counter).not.toBeNull();
    expect(counter!.textContent?.trim()).toBe('0/100');
  });

  it('should render error icon in helper when both error and helper are set', () => {
    fixture.componentRef.setInput('error', true);
    fixture.componentRef.setInput('helper', 'Error occurred');
    fixture.detectChanges();
    const icon = nativeEl.querySelector('.textbox__helper-icon');
    expect(icon).not.toBeNull();
  });

  it('should not render error icon in helper when error is false', () => {
    fixture.componentRef.setInput('helper', 'Some help');
    fixture.detectChanges();
    const icon = nativeEl.querySelector('.textbox__helper-icon');
    expect(icon).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // writeValue
  // ---------------------------------------------------------------------------

  it('writeValue should update the internal value signal', () => {
    component.writeValue('hello');
    expect(component['value']()).toBe('hello');
  });

  it('writeValue(null) should set value to empty string', () => {
    component.writeValue(null as any);
    expect(component['value']()).toBe('');
  });

  it('writeValue should reflect value in textarea', () => {
    component.writeValue('test content');
    fixture.detectChanges();
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    expect(textarea.value).toBe('test content');
  });

  it('writeValue with empty string should clear the textarea', () => {
    component.writeValue('initial');
    fixture.detectChanges();
    component.writeValue('');
    fixture.detectChanges();
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    expect(textarea.value).toBe('');
  });

  // ---------------------------------------------------------------------------
  // onInput
  // ---------------------------------------------------------------------------

  it('onInput should update value signal', () => {
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.value = 'new text';
    textarea.dispatchEvent(new Event('input'));
    expect(component['value']()).toBe('new text');
  });

  it('onInput should call onChange with new value', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.value = 'typed value';
    textarea.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('typed value');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('onInput should not call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.value = 'some text';
    textarea.dispatchEvent(new Event('input'));

    expect(onTouched).not.toHaveBeenCalled();
  });

  it('counter updates after onInput', () => {
    fixture.componentRef.setInput('maxLength', 100);
    fixture.detectChanges();

    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.value = 'abc';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const counter = nativeEl.querySelector('.textbox__counter');
    expect(counter!.textContent?.trim()).toBe('3/100');
  });

  // ---------------------------------------------------------------------------
  // onBlur
  // ---------------------------------------------------------------------------

  it('onBlur should call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.dispatchEvent(new Event('blur'));

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('onBlur should not call onChange', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.dispatchEvent(new Event('blur'));

    expect(onChange).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor — registerOnChange / registerOnTouched
  // ---------------------------------------------------------------------------

  it('registerOnChange should replace the onChange handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnChange(fn1);
    component.registerOnChange(fn2);

    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.value = 'x';
    textarea.dispatchEvent(new Event('input'));

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith('x');
  });

  it('registerOnTouched should replace the onTouched handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnTouched(fn1);
    component.registerOnTouched(fn2);

    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    textarea.dispatchEvent(new Event('blur'));

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor — setDisabledState
  // ---------------------------------------------------------------------------

  it('setDisabledState(true) should set disabledByForm signal', () => {
    component.setDisabledState(true);
    expect(component['disabledByForm']()).toBe(true);
  });

  it('setDisabledState(false) should clear disabledByForm signal', () => {
    component.setDisabledState(true);
    component.setDisabledState(false);
    expect(component['disabledByForm']()).toBe(false);
  });

  it('setDisabledState(true) should disable textarea in DOM', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const textarea = nativeEl.querySelector('textarea.textbox__input') as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Interaction between disabled input and form disabled
  // ---------------------------------------------------------------------------

  it('isDisabled should remain true if only one source is disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    component.setDisabledState(false);
    fixture.detectChanges();
    expect(component['isDisabled']()).toBe(true);
  });
});
