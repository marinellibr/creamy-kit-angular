import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent, DropdownOption } from './dropdown.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const OPTIONS: DropdownOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Host bindings
  // ---------------------------------------------------------------------------

  describe('host bindings', () => {
    it('sets data-variant to "default" by default', () => {
      expect(el.getAttribute('data-variant')).toBe('default');
    });

    it('sets data-variant when input changes', () => {
      fixture.componentRef.setInput('variant', 'on-brand');
      fixture.detectChanges();
      expect(el.getAttribute('data-variant')).toBe('on-brand');
    });

    it('does not set data-open initially', () => {
      expect(el.hasAttribute('data-open')).toBe(false);
    });

    it('sets data-open as empty string when menu is open', () => {
      (component as any).open.set(true);
      fixture.detectChanges();
      expect(el.getAttribute('data-open')).toBe('');
    });

    it('does not set data-error when error is false', () => {
      expect(el.hasAttribute('data-error')).toBe(false);
    });

    it('sets data-error as empty string when error is true', () => {
      fixture.componentRef.setInput('error', true);
      fixture.detectChanges();
      expect(el.getAttribute('data-error')).toBe('');
    });

    it('does not set data-disabled when not disabled', () => {
      expect(el.hasAttribute('data-disabled')).toBe(false);
    });

    it('sets data-disabled as empty string when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(el.getAttribute('data-disabled')).toBe('');
    });
  });

  // ---------------------------------------------------------------------------
  // Template structure
  // ---------------------------------------------------------------------------

  describe('template', () => {
    it('does not show .dropdown__title when title is empty', () => {
      expect(el.querySelector('.dropdown__title')).toBeNull();
    });

    it('shows .dropdown__title span when title is set', () => {
      fixture.componentRef.setInput('title', 'My Title');
      fixture.detectChanges();
      const titleEl = el.querySelector('.dropdown__title');
      expect(titleEl).not.toBeNull();
      expect(titleEl!.textContent!.trim()).toBe('My Title');
    });

    it('does not show .dropdown__helper when helper is empty', () => {
      expect(el.querySelector('.dropdown__helper')).toBeNull();
    });

    it('shows .dropdown__helper span when helper is set', () => {
      fixture.componentRef.setInput('helper', 'Help text');
      fixture.detectChanges();
      const helperEl = el.querySelector('.dropdown__helper');
      expect(helperEl).not.toBeNull();
      expect(helperEl!.textContent!.trim()).toBe('Help text');
    });

    it('does not show .dropdown__menu when closed', () => {
      expect(el.querySelector('.dropdown__menu')).toBeNull();
    });

    it('shows .dropdown__menu ul when open', () => {
      (component as any).open.set(true);
      fixture.detectChanges();
      expect(el.querySelector('ul.dropdown__menu')).not.toBeNull();
    });

    it('renders options as li.dropdown__option items', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      (component as any).open.set(true);
      fixture.detectChanges();
      const items = el.querySelectorAll('li.dropdown__option');
      expect(items.length).toBe(OPTIONS.length);
      expect(items[0].textContent!.trim()).toBe('Option A');
      expect(items[1].textContent!.trim()).toBe('Option B');
      expect(items[2].textContent!.trim()).toBe('Option C');
    });

    it('has aria-haspopup="listbox" on the button', () => {
      const btn = el.querySelector('.dropdown__control') as HTMLButtonElement;
      expect(btn.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('reflects open state in aria-expanded', () => {
      const btn = el.querySelector('.dropdown__control') as HTMLButtonElement;
      expect(btn.getAttribute('aria-expanded')).toBe('false');
      (component as any).open.set(true);
      fixture.detectChanges();
      expect(btn.getAttribute('aria-expanded')).toBe('true');
    });

    it('clicking an option fires select()', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      (component as any).open.set(true);
      fixture.detectChanges();

      const selectSpy = jest.spyOn(component as any, 'select');
      const firstOption = el.querySelector('li.dropdown__option') as HTMLElement;
      firstOption.click();
      expect(selectSpy).toHaveBeenCalledWith(OPTIONS[0]);
    });
  });

  // ---------------------------------------------------------------------------
  // toggle()
  // ---------------------------------------------------------------------------

  describe('toggle()', () => {
    it('opens the menu when closed and not disabled', () => {
      (component as any).toggle();
      expect((component as any).open()).toBe(true);
    });

    it('closes the menu when open and not disabled', () => {
      (component as any).open.set(true);
      (component as any).toggle();
      expect((component as any).open()).toBe(false);
    });

    it('does nothing when disabled via input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      (component as any).toggle();
      expect((component as any).open()).toBe(false);
    });

    it('does nothing when disabled via form', () => {
      component.setDisabledState(true);
      (component as any).toggle();
      expect((component as any).open()).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // select()
  // ---------------------------------------------------------------------------

  describe('select()', () => {
    it('sets the value to the option value', () => {
      (component as any).select(OPTIONS[1]);
      expect((component as any).value()).toBe('b');
    });

    it('closes the menu after selection', () => {
      (component as any).open.set(true);
      (component as any).select(OPTIONS[0]);
      expect((component as any).open()).toBe(false);
    });

    it('calls onChange with the selected value', () => {
      const onChange = jest.fn();
      component.registerOnChange(onChange);
      (component as any).select(OPTIONS[0]);
      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('calls onTouched after selection', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      (component as any).select(OPTIONS[0]);
      expect(onTouched).toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // selectedLabel computed
  // ---------------------------------------------------------------------------

  describe('selectedLabel', () => {
    it('returns empty string when nothing is selected', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      fixture.detectChanges();
      expect((component as any).selectedLabel()).toBe('');
    });

    it('returns the label of the selected option', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      fixture.detectChanges();
      (component as any).value.set('b');
      expect((component as any).selectedLabel()).toBe('Option B');
    });

    it('returns empty string when selected value does not match any option', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      fixture.detectChanges();
      (component as any).value.set('z');
      expect((component as any).selectedLabel()).toBe('');
    });
  });

  // ---------------------------------------------------------------------------
  // writeValue()
  // ---------------------------------------------------------------------------

  describe('writeValue()', () => {
    it('sets value to the given string', () => {
      component.writeValue('b');
      expect((component as any).value()).toBe('b');
    });

    it('sets value to empty string when null is passed', () => {
      component.writeValue(null as any);
      expect((component as any).value()).toBe('');
    });

    it('sets value to empty string when undefined is passed', () => {
      component.writeValue(undefined as any);
      expect((component as any).value()).toBe('');
    });
  });

  // ---------------------------------------------------------------------------
  // onDocumentClick()
  // ---------------------------------------------------------------------------

  describe('onDocumentClick()', () => {
    it('closes the menu when open and click is outside the component', () => {
      (component as any).open.set(true);
      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: outsideEl });
      (component as any).onDocumentClick(event);
      expect((component as any).open()).toBe(false);
      document.body.removeChild(outsideEl);
    });

    it('calls onTouched when closing via outside click', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      (component as any).open.set(true);
      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: outsideEl });
      (component as any).onDocumentClick(event);
      expect(onTouched).toHaveBeenCalled();
      document.body.removeChild(outsideEl);
    });

    it('does not close the menu when click is inside the component', () => {
      (component as any).open.set(true);
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: el });
      (component as any).onDocumentClick(event);
      expect((component as any).open()).toBe(true);
    });

    it('does nothing when menu is closed', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: outsideEl });
      (component as any).onDocumentClick(event);
      expect((component as any).open()).toBe(false);
      expect(onTouched).not.toHaveBeenCalled();
      document.body.removeChild(outsideEl);
    });
  });

  // ---------------------------------------------------------------------------
  // isDisabled computed
  // ---------------------------------------------------------------------------

  describe('isDisabled', () => {
    it('is false by default', () => {
      expect((component as any).isDisabled()).toBe(false);
    });

    it('is true when disabled input is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect((component as any).isDisabled()).toBe(true);
    });

    it('is true when form disables the control', () => {
      component.setDisabledState(true);
      expect((component as any).isDisabled()).toBe(true);
    });
  });

  it('provides itself as NG_VALUE_ACCESSOR via forwardRef', () => {
    const accessor = fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    expect(accessor).toBeTruthy();
  });

});