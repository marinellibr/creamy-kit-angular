import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent, CheckboxOption } from './checkbox.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const OPTIONS: CheckboxOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
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

  it('should have default divider true', () => {
    expect(component.divider()).toBe(true);
  });

  it('should have default disabled false', () => {
    expect(component.disabled()).toBe(false);
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
    const rows = nativeEl.querySelectorAll('.checkbox__row');
    expect(rows.length).toBe(0);
  });

  it('should render one row per option', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.checkbox__row');
    expect(rows.length).toBe(OPTIONS.length);
  });

  it('should render option labels correctly', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const labels = nativeEl.querySelectorAll('.checkbox__label');
    expect(labels[0].textContent?.trim()).toBe('Option A');
    expect(labels[1].textContent?.trim()).toBe('Option B');
    expect(labels[2].textContent?.trim()).toBe('Option C');
  });

  it('should have aria-checked="false" on all rows by default', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.checkbox__row');
    rows.forEach((row) => {
      expect(row.getAttribute('aria-checked')).toBe('false');
    });
  });

  it('should set aria-checked="true" on selected option', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    component.writeValue(['a']);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.checkbox__row');
    expect(rows[0].getAttribute('aria-checked')).toBe('true');
    expect(rows[1].getAttribute('aria-checked')).toBe('false');
  });

  it('should add checkbox__box--checked class on selected option box', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    component.writeValue(['b']);
    fixture.detectChanges();
    const boxes = nativeEl.querySelectorAll('.checkbox__box');
    expect(boxes[0].classList.contains('checkbox__box--checked')).toBe(false);
    expect(boxes[1].classList.contains('checkbox__box--checked')).toBe(true);
  });

  it('should render dividers when divider is true', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const dividers = nativeEl.querySelectorAll('creamy-kit-divider');
    expect(dividers.length).toBe(OPTIONS.length);
  });

  it('should not render dividers when divider is false', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.componentRef.setInput('divider', false);
    fixture.detectChanges();
    const dividers = nativeEl.querySelectorAll('creamy-kit-divider');
    expect(dividers.length).toBe(0);
  });

  it('should disable all row buttons when isDisabled is true', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.checkbox__row');
    rows.forEach((row) => {
      expect(row.disabled).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // isSelected
  // ---------------------------------------------------------------------------

  it('isSelected() should return false when value is empty array', () => {
    expect(component['isSelected']({ label: 'A', value: 'a' })).toBe(false);
  });

  it('isSelected() should return true when option value is in the array', () => {
    component.writeValue(['a', 'c']);
    expect(component['isSelected']({ label: 'A', value: 'a' })).toBe(true);
    expect(component['isSelected']({ label: 'C', value: 'c' })).toBe(true);
  });

  it('isSelected() should return false when option value is not in the array', () => {
    component.writeValue(['a']);
    expect(component['isSelected']({ label: 'B', value: 'b' })).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // toggle
  // ---------------------------------------------------------------------------

  it('toggle() should add an unselected option to the value array', () => {
    component.writeValue([]);
    component['toggle']({ label: 'A', value: 'a' });
    expect(component['value']()).toEqual(['a']);
  });

  it('toggle() should remove a selected option from the value array', () => {
    component.writeValue(['a', 'b']);
    component['toggle']({ label: 'A', value: 'a' });
    expect(component['value']()).toEqual(['b']);
  });

  it('toggle() should call onChange with the new value', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    component.writeValue([]);
    component['toggle']({ label: 'B', value: 'b' });
    expect(onChange).toHaveBeenCalledWith(['b']);
  });

  it('toggle() should call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    component['toggle']({ label: 'A', value: 'a' });
    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('toggle() should support selecting multiple options', () => {
    component.writeValue([]);
    component['toggle']({ label: 'A', value: 'a' });
    component['toggle']({ label: 'C', value: 'c' });
    expect(component['value']()).toEqual(['a', 'c']);
  });

  it('toggle() should remove only the toggled option', () => {
    component.writeValue(['a', 'b', 'c']);
    component['toggle']({ label: 'B', value: 'b' });
    expect(component['value']()).toEqual(['a', 'c']);
  });

  it('toggle() when disabled (input) should do nothing', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.writeValue([]);
    component['toggle']({ label: 'A', value: 'a' });
    expect(component['value']()).toEqual([]);
  });

  it('toggle() when disabled (setDisabledState) should do nothing', () => {
    component.setDisabledState(true);
    component.writeValue([]);
    component['toggle']({ label: 'A', value: 'a' });
    expect(component['value']()).toEqual([]);
  });

  it('toggle() when disabled should not call onChange', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component['toggle']({ label: 'A', value: 'a' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('toggle() when disabled should not call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    component.setDisabledState(true);
    component['toggle']({ label: 'A', value: 'a' });
    expect(onTouched).not.toHaveBeenCalled();
  });

  it('clicking a row button should toggle that option', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.checkbox__row');
    rows[1].click();
    expect(component['value']()).toEqual(['b']);
  });

  it('clicking the same row twice should deselect the option', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll<HTMLButtonElement>('.checkbox__row');
    rows[0].click();
    rows[0].click();
    expect(component['value']()).toEqual([]);
  });

  // ---------------------------------------------------------------------------
  // writeValue
  // ---------------------------------------------------------------------------

  it('writeValue should update the internal value signal', () => {
    component.writeValue(['a', 'b']);
    expect(component['value']()).toEqual(['a', 'b']);
  });

  it('writeValue(null) should set value to empty array', () => {
    component.writeValue(null as any);
    expect(component['value']()).toEqual([]);
  });

  it('writeValue with a non-array should set value to empty array', () => {
    component.writeValue('not-an-array' as any);
    expect(component['value']()).toEqual([]);
  });

  it('writeValue([]) should set value to empty array', () => {
    component.writeValue(['a']);
    component.writeValue([]);
    expect(component['value']()).toEqual([]);
  });

  it('writeValue should reflect selected options in the DOM', () => {
    fixture.componentRef.setInput('options', OPTIONS);
    component.writeValue(['a', 'c']);
    fixture.detectChanges();
    const rows = nativeEl.querySelectorAll('.checkbox__row');
    expect(rows[0].getAttribute('aria-checked')).toBe('true');
    expect(rows[1].getAttribute('aria-checked')).toBe('false');
    expect(rows[2].getAttribute('aria-checked')).toBe('true');
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor — registerOnChange / registerOnTouched
  // ---------------------------------------------------------------------------

  it('registerOnChange should replace the onChange handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnChange(fn1);
    component.registerOnChange(fn2);

    component['toggle']({ label: 'A', value: 'a' });

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith(['a']);
  });

  it('registerOnTouched should replace the onTouched handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnTouched(fn1);
    component.registerOnTouched(fn2);

    component['toggle']({ label: 'A', value: 'a' });

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

  it('provides itself as NG_VALUE_ACCESSOR via forwardRef', () => {
    const accessor = fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    expect(accessor).toBeTruthy();
  });

});