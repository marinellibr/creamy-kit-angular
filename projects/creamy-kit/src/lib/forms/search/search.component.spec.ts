import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
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

  it('should have default small false', () => {
    expect(component.small()).toBe(false);
  });

  it('should have default disabled false', () => {
    expect(component.disabled()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Host bindings — data-variant
  // ---------------------------------------------------------------------------

  it('should set data-variant attribute to "default" by default', () => {
    expect(nativeEl.getAttribute('data-variant')).toBe('default');
  });

  it('should update data-variant attribute to "on-brand"', () => {
    fixture.componentRef.setInput('variant', 'on-brand');
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-variant')).toBe('on-brand');
  });

  // ---------------------------------------------------------------------------
  // Host bindings — data-small
  // ---------------------------------------------------------------------------

  it('should not have data-small attribute when small is false', () => {
    expect(nativeEl.getAttribute('data-small')).toBeNull();
  });

  it('should have data-small attribute (empty string) when small is true', () => {
    fixture.componentRef.setInput('small', true);
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-small')).toBe('');
  });

  it('should remove data-small attribute when small is reset to false', () => {
    fixture.componentRef.setInput('small', true);
    fixture.detectChanges();
    fixture.componentRef.setInput('small', false);
    fixture.detectChanges();
    expect(nativeEl.getAttribute('data-small')).toBeNull();
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

  it('isDisabled() should be true when either source is disabled', () => {
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
  // focused signal defaults
  // ---------------------------------------------------------------------------

  it('focused signal should be false by default', () => {
    expect(component['focused']()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Template rendering
  // ---------------------------------------------------------------------------

  it('should render an input.search__input', () => {
    const input = nativeEl.querySelector('input.search__input');
    expect(input).not.toBeNull();
  });

  it('should bind placeholder to input', () => {
    fixture.componentRef.setInput('placeholder', 'Search here…');
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    expect(input.placeholder).toBe('Search here…');
  });

  it('should disable input when isDisabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should show left icon when not focused', () => {
    const icon = nativeEl.querySelector('.search__icon--left');
    expect(icon).not.toBeNull();
  });

  it('should hide left icon when focused', () => {
    component['focused'].set(true);
    fixture.detectChanges();
    const icon = nativeEl.querySelector('.search__icon--left');
    expect(icon).toBeNull();
  });

  it('should show clear button when focused', () => {
    component['focused'].set(true);
    fixture.detectChanges();
    const clearBtn = nativeEl.querySelector('button.search__clear');
    expect(clearBtn).not.toBeNull();
  });

  it('should not show clear button when not focused', () => {
    const clearBtn = nativeEl.querySelector('button.search__clear');
    expect(clearBtn).toBeNull();
  });

  it('should show right icon slot when not focused', () => {
    const rightIcon = nativeEl.querySelector('.search__icon--right');
    expect(rightIcon).not.toBeNull();
  });

  // ---------------------------------------------------------------------------
  // onFocus
  // ---------------------------------------------------------------------------

  it('onFocus should set focused to true', () => {
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    expect(component['focused']()).toBe(true);
  });

  it('onFocus should show the clear button', () => {
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    const clearBtn = nativeEl.querySelector('button.search__clear');
    expect(clearBtn).not.toBeNull();
  });

  // ---------------------------------------------------------------------------
  // onBlur
  // ---------------------------------------------------------------------------

  it('onBlur should set focused to false', () => {
    component['focused'].set(true);
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));
    expect(component['focused']()).toBe(false);
  });

  it('onBlur should call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('onBlur should not call onChange', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));

    expect(onChange).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // onInput
  // ---------------------------------------------------------------------------

  it('onInput should update value signal', () => {
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.value = 'angular';
    input.dispatchEvent(new Event('input'));
    expect(component['value']()).toBe('angular');
  });

  it('onInput should call onChange with new value', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.value = 'query';
    input.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('query');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('onInput should not call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    input.value = 'text';
    input.dispatchEvent(new Event('input'));

    expect(onTouched).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // clear()
  // ---------------------------------------------------------------------------

  it('clear() should set value to empty string when not disabled', () => {
    component['value'].set('some query');
    component['clear']();
    expect(component['value']()).toBe('');
  });

  it('clear() should call onChange with empty string when not disabled', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    component['value'].set('query');
    component['clear']();
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('clear() should do nothing when disabled via input', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component['value'].set('keep this');
    component['clear']();
    expect(component['value']()).toBe('keep this');
  });

  it('clear() should do nothing when disabled via setDisabledState', () => {
    component.setDisabledState(true);
    component['value'].set('keep this');
    component['clear']();
    expect(component['value']()).toBe('keep this');
  });

  it('clear() should not call onChange when disabled', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component['clear']();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clicking clear button should clear the value', () => {
    component['value'].set('some text');
    component['focused'].set(true);
    fixture.detectChanges();

    const clearBtn = nativeEl.querySelector('button.search__clear') as HTMLButtonElement;
    clearBtn.click();
    expect(component['value']()).toBe('');
  });

  // ---------------------------------------------------------------------------
  // writeValue
  // ---------------------------------------------------------------------------

  it('writeValue should update the internal value signal', () => {
    component.writeValue('search term');
    expect(component['value']()).toBe('search term');
  });

  it('writeValue(null) should set value to empty string', () => {
    component.writeValue(null as any);
    expect(component['value']()).toBe('');
  });

  it('writeValue should reflect value in input element', () => {
    component.writeValue('hello');
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    expect(input.value).toBe('hello');
  });

  it('writeValue with empty string should clear the input', () => {
    component.writeValue('initial');
    fixture.detectChanges();
    component.writeValue('');
    fixture.detectChanges();
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor — registerOnChange / registerOnTouched
  // ---------------------------------------------------------------------------

  it('registerOnChange should replace the onChange handler', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    component.registerOnChange(fn1);
    component.registerOnChange(fn2);

    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
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

    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
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
    const input = nativeEl.querySelector('input.search__input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('provides itself as NG_VALUE_ACCESSOR via forwardRef', () => {
    const accessor = fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    expect(accessor).toBeTruthy();
  });

});