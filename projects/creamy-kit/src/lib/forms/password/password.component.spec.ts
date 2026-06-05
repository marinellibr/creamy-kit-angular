import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordComponent);
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

  it('should update data-variant attribute when variant input changes to "on-brand"', () => {
    fixture.componentRef.setInput('variant', 'on-brand');
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-variant')).toBe('on-brand');
  });

  // ---------------------------------------------------------------------------
  // Host bindings — data-revealed
  // ---------------------------------------------------------------------------

  it('should not have data-revealed attribute when revealed is false (default)', () => {
    expect(nativeEl.getAttribute('data-revealed')).toBeNull();
  });

  it('should have data-revealed attribute (empty string) after toggleReveal()', () => {
    component['toggleReveal']();
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-revealed')).toBe('');
  });

  it('should remove data-revealed attribute after second toggleReveal()', () => {
    component['toggleReveal']();
    fixture.detectChanges();
    component['toggleReveal']();
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-revealed')).toBeNull();
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

  it('isDisabled() should remain true if only disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    component.setDisabledState(false);
    fixture.detectChanges();
    expect(component['isDisabled']()).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Template rendering — title
  // ---------------------------------------------------------------------------

  it('should not render title element when title is empty', () => {
    const titleEl = nativeEl.querySelector('.password__title');
    expect(titleEl).toBeNull();
  });

  it('should render title element when title is set', () => {
    fixture.componentRef.setInput('title', 'Password');
    fixture.detectChanges();
    const titleEl = nativeEl.querySelector('.password__title');
    expect(titleEl).not.toBeNull();
    expect(titleEl!.textContent).toBe('Password');
  });

  // ---------------------------------------------------------------------------
  // Template rendering — input
  // ---------------------------------------------------------------------------

  it('should render an input.password__input', () => {
    const input = nativeEl.querySelector('input.password__input');
    expect(input).not.toBeNull();
  });

  it('should have type="password" by default (revealed is false)', () => {
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('should change input type to "text" when revealed is true', () => {
    component['toggleReveal']();
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  it('should bind placeholder to input', () => {
    fixture.componentRef.setInput('placeholder', 'Enter password');
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    expect(input.placeholder).toBe('Enter password');
  });

  it('should disable input when isDisabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Template rendering — toggle button
  // ---------------------------------------------------------------------------

  it('should render a toggle reveal button', () => {
    const btn = nativeEl.querySelector('button.password__toggle');
    expect(btn).not.toBeNull();
  });

  it('toggle button should have aria-label "Exibir senha" when revealed is false', () => {
    const btn = nativeEl.querySelector('button.password__toggle');
    expect(btn!.getAttribute('aria-label')).toBe('Exibir senha');
  });

  it('toggle button should have aria-label "Esconder senha" when revealed is true', () => {
    component['toggleReveal']();
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.password__toggle');
    expect(btn!.getAttribute('aria-label')).toBe('Esconder senha');
  });

  it('toggle button should be disabled when isDisabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.password__toggle') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Template rendering — helper
  // ---------------------------------------------------------------------------

  it('should not render helper element when helper is empty', () => {
    const helperEl = nativeEl.querySelector('.password__helper');
    expect(helperEl).toBeNull();
  });

  it('should render helper element when helper is set', () => {
    fixture.componentRef.setInput('helper', 'Use 8+ characters');
    fixture.detectChanges();
    const helperEl = nativeEl.querySelector('.password__helper');
    expect(helperEl).not.toBeNull();
    expect(helperEl!.textContent?.trim()).toBe('Use 8+ characters');
  });

  it('should render error icon in helper when both error and helper are set', () => {
    fixture.componentRef.setInput('error', true);
    fixture.componentRef.setInput('helper', 'Invalid password');
    fixture.detectChanges();
    const icon = nativeEl.querySelector('.password__helper-icon');
    expect(icon).not.toBeNull();
  });

  it('should not render error icon in helper when error is false', () => {
    fixture.componentRef.setInput('helper', 'Some help');
    fixture.detectChanges();
    const icon = nativeEl.querySelector('.password__helper-icon');
    expect(icon).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // toggleReveal
  // ---------------------------------------------------------------------------

  it('toggleReveal() should set revealed to true when it is false', () => {
    expect(component['revealed']()).toBe(false);
    component['toggleReveal']();
    expect(component['revealed']()).toBe(true);
  });

  it('toggleReveal() should set revealed back to false when called again', () => {
    component['toggleReveal']();
    expect(component['revealed']()).toBe(true);
    component['toggleReveal']();
    expect(component['revealed']()).toBe(false);
  });

  it('clicking toggle button should call toggleReveal and change revealed', () => {
    const btn = nativeEl.querySelector('button.password__toggle') as HTMLButtonElement;
    expect(component['revealed']()).toBe(false);
    btn.click();
    expect(component['revealed']()).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // writeValue
  // ---------------------------------------------------------------------------

  it('writeValue should update the internal value signal', () => {
    component.writeValue('mypassword');
    expect(component['value']()).toBe('mypassword');
  });

  it('writeValue(null) should set value to empty string', () => {
    component.writeValue(null as any);
    expect(component['value']()).toBe('');
  });

  it('writeValue should reflect value in input element', () => {
    component.writeValue('secret');
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    expect(input.value).toBe('secret');
  });

  it('writeValue with empty string should clear the input', () => {
    component.writeValue('initial');
    fixture.detectChanges();
    component.writeValue('');
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  // ---------------------------------------------------------------------------
  // onInput
  // ---------------------------------------------------------------------------

  it('onInput should update value signal', () => {
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    input.value = 'newpass';
    input.dispatchEvent(new Event('input'));
    expect(component['value']()).toBe('newpass');
  });

  it('onInput should call onChange with new value', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    input.value = 'typed';
    input.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('typed');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('onInput should not call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    input.value = 'something';
    input.dispatchEvent(new Event('input'));

    expect(onTouched).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // onBlur
  // ---------------------------------------------------------------------------

  it('onBlur should call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('onBlur should not call onChange', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));

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

    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    input.value = 'x';
    input.dispatchEvent(new Event('input'));

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith('x');
  });

  it('registerOnTouched should replace the onTouched handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnTouched(fn1);
    component.registerOnTouched(fn2);

    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));

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

  it('setDisabledState(true) should disable input in DOM', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.password__input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
