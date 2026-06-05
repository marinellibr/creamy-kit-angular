import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent, RadioOption } from './radio.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const OPTIONS: RadioOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
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

  it('should have default options []', () => {
    expect(component.options()).toEqual([]);
  });

  it('should have default color undefined', () => {
    expect(component.color()).toBeUndefined();
  });

  it('should have default disabled false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should have default value null (signal)', () => {
    expect(component['value']()).toBeNull();
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

  it('should render no rows when options is empty', () => {
    const rows = nativeEl.querySelectorAll('.radio__row');
    expect(rows.length).toBe(0);
  });

  it('should render one row per option', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.radio__row');
    expect(rows.length).toBe(OPTIONS.length);
  });

  it('should render option labels correctly', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const labels = nativeEl.querySelectorAll('.radio__label');
    expect(labels[0].textContent?.trim()).toBe('Option A');
    expect(labels[1].textContent?.trim()).toBe('Option B');
    expect(labels[2].textContent?.trim()).toBe('Option C');
  });

  it('should have role="radio" on each row button', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.radio__row');
    rows.forEach((row) => {
      expect(row.getAttribute('role')).toBe('radio');
    });
  });

  it('should have aria-checked="false" on all rows by default', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.radio__row');
    rows.forEach((row) => {
      expect(row.getAttribute('aria-checked')).toBe('false');
    });
  });

  it('should set aria-checked="true" on the selected option row', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    component.writeValue('b');
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.radio__row');
    expect(rows[0].getAttribute('aria-checked')).toBe('false');
    expect(rows[1].getAttribute('aria-checked')).toBe('true');
    expect(rows[2].getAttribute('aria-checked')).toBe('false');
  });

  it('should show variant icon only for the selected option', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    component.writeValue('a');
    fixture.detectChanges();
    const variants = nativeEl.querySelectorAll('.radio__icon--variant');
    expect(variants.length).toBe(1);
  });

  it('should not show variant icon when no option is selected', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const variants = nativeEl.querySelectorAll('.radio__icon--variant');
    expect(variants.length).toBe(0);
  });

  it('should apply --radio-color CSS variable when color is set', () => {
    fixture.componentRef.setInput('options', [OPTIONS[0]]);
    fixture.componentRef.setInput('color', 'var(--secondary-base)');
    fixture.detectChanges();
    const icon = nativeEl.querySelector('.radio__icon') as HTMLElement;
    expect(icon.getAttribute('style')).toContain('--radio-color');
  });

  it('should disable all row buttons when isDisabled is true', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.radio__row');
    rows.forEach((row) => {
      expect(row.disabled).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // isSelected
  // ---------------------------------------------------------------------------

  it('isSelected() should return false when value is null', () => {
    expect(component.isSelected({ label: 'A', value: 'a' })).toBe(false);
  });

  it('isSelected() should return true when option matches current value', () => {
    component.writeValue('b');
    expect(component.isSelected({ label: 'B', value: 'b' })).toBe(true);
  });

  it('isSelected() should return false when option does not match current value', () => {
    component.writeValue('a');
    expect(component.isSelected({ label: 'B', value: 'b' })).toBe(false);
  });

  it('isSelected() reads from signal', () => {
    component['value'].set('c');
    expect(component.isSelected({ label: 'C', value: 'c' })).toBe(true);
    expect(component.isSelected({ label: 'A', value: 'a' })).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // select()
  // ---------------------------------------------------------------------------

  it('select() should set the value signal to the option value', () => {
    component.select({ label: 'A', value: 'a' });
    expect(component['value']()).toBe('a');
  });

  it('select() should update selection to the new option', () => {
    component.select({ label: 'A', value: 'a' });
    component.select({ label: 'B', value: 'b' });
    expect(component['value']()).toBe('b');
  });

  it('select() should call onChange with the option value', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    component.select({ label: 'C', value: 'c' });
    expect(onChange).toHaveBeenCalledWith('c');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('select() should call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    component.select({ label: 'A', value: 'a' });
    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('select() when disabled via input should do nothing', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.select({ label: 'A', value: 'a' });
    expect(component['value']()).toBeNull();
  });

  it('select() when disabled via setDisabledState should do nothing', () => {
    component.setDisabledState(true);
    component.select({ label: 'B', value: 'b' });
    expect(component['value']()).toBeNull();
  });

  it('select() when disabled should not call onChange', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.select({ label: 'A', value: 'a' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('select() when disabled should not call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    component.setDisabledState(true);
    component.select({ label: 'A', value: 'a' });
    expect(onTouched).not.toHaveBeenCalled();
  });

  it('clicking a row button should select that option', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.radio__row');
    rows[2].click();
    expect(component['value']()).toBe('c');
  });

  it('clicking a second row should update the selection', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.radio__row');
    rows[0].click();
    rows[1].click();
    expect(component['value']()).toBe('b');
  });

  it('clicking a row updates aria-checked in DOM', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.radio__row');
    rows[0].click();
    fixture.detectChanges();
    expect(rows[0].getAttribute('aria-checked')).toBe('true');
    expect(rows[1].getAttribute('aria-checked')).toBe('false');
  });

  // ---------------------------------------------------------------------------
  // writeValue
  // ---------------------------------------------------------------------------

  it('writeValue stores the value in signal', () => {
    component.writeValue('test');
    expect(component['value']()).toBe('test');
  });

  it('writeValue(null) stores null', () => {
    component.writeValue('a');
    component.writeValue(null);
    expect(component['value']()).toBeNull();
  });

  it('writeValue should reflect in DOM after detectChanges', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    component.writeValue('b');
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.radio__row');
    expect(rows[1].getAttribute('aria-checked')).toBe('true');
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor — registerOnChange / registerOnTouched
  // ---------------------------------------------------------------------------

  it('registerOnChange should replace the onChange handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnChange(fn1);
    component.registerOnChange(fn2);
    component.select({ label: 'A', value: 'a' });
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith('a');
  });

  it('registerOnTouched should replace the onTouched handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnTouched(fn1);
    component.registerOnTouched(fn2);
    component.select({ label: 'A', value: 'a' });
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

  it('setDisabledState(true) should disable buttons in DOM', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    component.setDisabledState(true);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.radio__row');
    rows.forEach((row) => {
      expect(row.disabled).toBe(true);
    });
  });

  it('provides itself as NG_VALUE_ACCESSOR via forwardRef', () => {
    const accessor = fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    expect(accessor).toBeTruthy();
  });
});
