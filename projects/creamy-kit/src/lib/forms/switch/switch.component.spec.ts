import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
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

  it('should have default color "var(--primary-base, #128cfe)"', () => {
    expect(component.color()).toBe('var(--primary-base, #128cfe)');
  });

  it('should have default disabled false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should have default value false', () => {
    expect(component['value']()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // isDisabled computed
  // ---------------------------------------------------------------------------

  it('isDisabled() should be false by default', () => {
    expect(component.isDisabled()).toBe(false);
  });

  it('isDisabled() should be true when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.isDisabled()).toBe(true);
  });

  it('isDisabled() should be true when setDisabledState(true)', () => {
    component.setDisabledState(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('isDisabled() should be true when either disabled input or form disabled', () => {
    fixture.componentRef.setInput('disabled', false);
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(component.isDisabled()).toBe(true);
  });

  it('isDisabled() should remain true if only disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    component.setDisabledState(false);
    fixture.detectChanges();
    expect(component.isDisabled()).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Template rendering
  // ---------------------------------------------------------------------------

  it('should render a button.switch', () => {
    const btn = nativeEl.querySelector('button.switch');
    expect(btn).not.toBeNull();
  });

  it('should have role="switch" on the button', () => {
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.getAttribute('role')).toBe('switch');
  });

  it('should have aria-checked="false" by default', () => {
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.getAttribute('aria-checked')).toBe('false');
  });

  it('should have aria-checked="true" when value is true', () => {
    component.writeValue(true);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.getAttribute('aria-checked')).toBe('true');
  });

  it('should not have switch--on class when value is false', () => {
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.classList.contains('switch--on')).toBe(false);
  });

  it('should have switch--on class when value is true', () => {
    component.writeValue(true);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.classList.contains('switch--on')).toBe(true);
  });

  it('should remove switch--on class when value becomes false', () => {
    component.writeValue(true);
    fixture.detectChanges();
    component.writeValue(false);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.classList.contains('switch--on')).toBe(false);
  });

  it('should apply custom color via --switch-color CSS variable', () => {
    fixture.componentRef.setInput('color', 'var(--secondary-base)');
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch') as HTMLButtonElement;
    expect(btn.getAttribute('style')).toContain('--switch-color');
  });

  it('should set aria-disabled="false" by default', () => {
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.getAttribute('aria-disabled')).toBe('false');
  });

  it('should set aria-disabled="true" when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.getAttribute('aria-disabled')).toBe('true');
  });

  it('should disable the button when isDisabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('should render a .switch__thumb inside the button', () => {
    const thumb = nativeEl.querySelector('.switch__thumb');
    expect(thumb).not.toBeNull();
  });

  // ---------------------------------------------------------------------------
  // toggle()
  // ---------------------------------------------------------------------------

  it('toggle() should flip value from false to true', () => {
    expect(component['value']()).toBe(false);
    component.toggle();
    expect(component['value']()).toBe(true);
  });

  it('toggle() should flip value from true to false', () => {
    component.writeValue(true);
    component.toggle();
    expect(component['value']()).toBe(false);
  });

  it('toggle() should call onChange with new value', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    component.toggle();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggle() should call onChange with false on second toggle', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    component.toggle();
    component.toggle();
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
  });

  it('toggle() should call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    component.toggle();
    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('toggle() should call onTouched each time it is called', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    component.toggle();
    component.toggle();
    expect(onTouched).toHaveBeenCalledTimes(2);
  });

  it('toggle() should do nothing when disabled via input', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(component['value']()).toBe(false);
  });

  it('toggle() should do nothing when disabled via setDisabledState', () => {
    component.setDisabledState(true);
    component.toggle();
    expect(component['value']()).toBe(false);
  });

  it('toggle() should not call onChange when disabled', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('toggle() should not call onTouched when disabled', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    component.setDisabledState(true);
    component.toggle();
    expect(onTouched).not.toHaveBeenCalled();
  });

  it('clicking button should toggle the value', () => {
    const btn = nativeEl.querySelector('button.switch') as HTMLButtonElement;
    btn.click();
    expect(component['value']()).toBe(true);
    btn.click();
    expect(component['value']()).toBe(false);
  });

  it('clicking button updates aria-checked', () => {
    const btn = nativeEl.querySelector('button.switch') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    expect(btn.getAttribute('aria-checked')).toBe('true');
  });

  // ---------------------------------------------------------------------------
  // writeValue
  // ---------------------------------------------------------------------------

  it('writeValue(true) should set value to true', () => {
    component.writeValue(true);
    expect(component['value']()).toBe(true);
  });

  it('writeValue(false) should set value to false', () => {
    component.writeValue(true);
    component.writeValue(false);
    expect(component['value']()).toBe(false);
  });

  it('writeValue(null) should set value to false', () => {
    component.writeValue(true);
    component.writeValue(null as any);
    expect(component['value']()).toBe(false);
  });

  it('writeValue should reflect in DOM (OnPush)', () => {
    component.writeValue(true);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch');
    expect(btn!.classList.contains('switch--on')).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor — registerOnChange / registerOnTouched
  // ---------------------------------------------------------------------------

  it('registerOnChange should replace the onChange handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnChange(fn1);
    component.registerOnChange(fn2);
    component.toggle();
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith(true);
  });

  it('registerOnTouched should replace the onTouched handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnTouched(fn1);
    component.registerOnTouched(fn2);
    component.toggle();
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

  it('setDisabledState(true) should disable button in DOM', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const btn = nativeEl.querySelector('button.switch') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });
});
