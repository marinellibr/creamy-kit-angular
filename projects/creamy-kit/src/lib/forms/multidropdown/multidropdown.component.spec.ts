import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiDropdownComponent } from './multidropdown.component';
import { DropdownOption } from '../dropdown/dropdown.component';

const OPTIONS: DropdownOption[] = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
];

describe('MultiDropdownComponent', () => {
  let component: MultiDropdownComponent;
  let fixture: ComponentFixture<MultiDropdownComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiDropdownComponent);
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

    it('does not set data-disabled by default', () => {
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
    it('does not show .multidropdown__title when title is empty', () => {
      expect(el.querySelector('.multidropdown__title')).toBeNull();
    });

    it('shows .multidropdown__title span when title is set', () => {
      fixture.componentRef.setInput('title', 'My Tags');
      fixture.detectChanges();
      const titleEl = el.querySelector('.multidropdown__title');
      expect(titleEl).not.toBeNull();
      expect(titleEl!.textContent!.trim()).toBe('My Tags');
    });

    it('does not show .multidropdown__helper when helper is empty', () => {
      expect(el.querySelector('.multidropdown__helper')).toBeNull();
    });

    it('shows .multidropdown__helper span when helper is set', () => {
      fixture.componentRef.setInput('helper', 'Choose tags');
      fixture.detectChanges();
      const helperEl = el.querySelector('.multidropdown__helper');
      expect(helperEl).not.toBeNull();
      expect(helperEl!.textContent!.trim()).toBe('Choose tags');
    });

    it('does not show .multidropdown__menu when closed', () => {
      expect(el.querySelector('.multidropdown__menu')).toBeNull();
    });

    it('shows ul.multidropdown__menu when open', () => {
      (component as any).open.set(true);
      fixture.detectChanges();
      expect(el.querySelector('ul.multidropdown__menu')).not.toBeNull();
    });

    it('renders options as li.multidropdown__option items', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      (component as any).open.set(true);
      fixture.detectChanges();
      const items = el.querySelectorAll('li.multidropdown__option');
      expect(items.length).toBe(OPTIONS.length);
    });

    it('shows placeholder when nothing selected', () => {
      fixture.componentRef.setInput('placeholder', 'Select items');
      fixture.detectChanges();
      const btn = el.querySelector('.multidropdown__control') as HTMLButtonElement;
      expect(btn.textContent).toContain('Select items');
    });

    it('shows selectedLabels in button when items are selected', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      fixture.detectChanges();
      (component as any).value.set(['alpha', 'beta']);
      fixture.detectChanges();
      const btn = el.querySelector('.multidropdown__control') as HTMLButtonElement;
      expect(btn.textContent).toContain('Alpha');
      expect(btn.textContent).toContain('Beta');
    });

    it('adds multidropdown__option--selected class to selected options', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      (component as any).open.set(true);
      (component as any).value.set(['beta']);
      fixture.detectChanges();
      const items = el.querySelectorAll('li.multidropdown__option');
      expect(items[0].classList.contains('multidropdown__option--selected')).toBe(false);
      expect(items[1].classList.contains('multidropdown__option--selected')).toBe(true);
      expect(items[2].classList.contains('multidropdown__option--selected')).toBe(false);
    });

    it('has aria-haspopup="listbox" on the control button', () => {
      const btn = el.querySelector('.multidropdown__control') as HTMLButtonElement;
      expect(btn.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('reflects open state in aria-expanded', () => {
      const btn = el.querySelector('.multidropdown__control') as HTMLButtonElement;
      expect(btn.getAttribute('aria-expanded')).toBe('false');
      (component as any).open.set(true);
      fixture.detectChanges();
      expect(btn.getAttribute('aria-expanded')).toBe('true');
    });
  });

  // ---------------------------------------------------------------------------
  // toggleMenu()
  // ---------------------------------------------------------------------------

  describe('toggleMenu()', () => {
    it('opens the menu when closed and not disabled', () => {
      (component as any).toggleMenu();
      expect((component as any).open()).toBe(true);
    });

    it('closes the menu when open and not disabled', () => {
      (component as any).open.set(true);
      (component as any).toggleMenu();
      expect((component as any).open()).toBe(false);
    });

    it('does nothing when disabled via input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      (component as any).toggleMenu();
      expect((component as any).open()).toBe(false);
    });

    it('does nothing when disabled via form', () => {
      component.setDisabledState(true);
      (component as any).toggleMenu();
      expect((component as any).open()).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // toggleOption()
  // ---------------------------------------------------------------------------

  describe('toggleOption()', () => {
    it('adds option to value array when not selected', () => {
      (component as any).toggleOption(OPTIONS[0]);
      expect((component as any).value()).toContain('alpha');
    });

    it('removes option from value array when already selected', () => {
      (component as any).value.set(['alpha', 'beta']);
      (component as any).toggleOption(OPTIONS[0]);
      expect((component as any).value()).not.toContain('alpha');
      expect((component as any).value()).toContain('beta');
    });

    it('calls onChange with updated value array', () => {
      const onChange = jest.fn();
      component.registerOnChange(onChange);
      (component as any).toggleOption(OPTIONS[1]);
      expect(onChange).toHaveBeenCalledWith(['beta']);
    });

    it('does NOT call onTouched (menu stays open)', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      (component as any).toggleOption(OPTIONS[0]);
      expect(onTouched).not.toHaveBeenCalled();
    });

    it('does not close the menu after toggling an option', () => {
      (component as any).open.set(true);
      (component as any).toggleOption(OPTIONS[0]);
      expect((component as any).open()).toBe(true);
    });

    it('can select multiple options independently', () => {
      (component as any).toggleOption(OPTIONS[0]);
      (component as any).toggleOption(OPTIONS[2]);
      expect((component as any).value()).toEqual(['alpha', 'gamma']);
    });
  });

  // ---------------------------------------------------------------------------
  // isSelected()
  // ---------------------------------------------------------------------------

  describe('isSelected()', () => {
    it('returns false when value array is empty', () => {
      expect((component as any).isSelected(OPTIONS[0])).toBe(false);
    });

    it('returns true when option value is in the array', () => {
      (component as any).value.set(['alpha']);
      expect((component as any).isSelected(OPTIONS[0])).toBe(true);
    });

    it('returns false for an option not in the array', () => {
      (component as any).value.set(['alpha']);
      expect((component as any).isSelected(OPTIONS[1])).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // selectedLabels computed
  // ---------------------------------------------------------------------------

  describe('selectedLabels', () => {
    it('returns empty string when nothing is selected', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      fixture.detectChanges();
      expect((component as any).selectedLabels()).toBe('');
    });

    it('returns single label when one option is selected', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      fixture.detectChanges();
      (component as any).value.set(['beta']);
      expect((component as any).selectedLabels()).toBe('Beta');
    });

    it('returns comma-joined labels for multiple selected options', () => {
      fixture.componentRef.setInput('options', OPTIONS);
      fixture.detectChanges();
      (component as any).value.set(['alpha', 'gamma']);
      expect((component as any).selectedLabels()).toBe('Alpha, Gamma');
    });
  });

  // ---------------------------------------------------------------------------
  // writeValue()
  // ---------------------------------------------------------------------------

  describe('writeValue()', () => {
    it('sets value to the given array', () => {
      component.writeValue(['alpha', 'beta']);
      expect((component as any).value()).toEqual(['alpha', 'beta']);
    });

    it('sets value to empty array when null is passed', () => {
      component.writeValue(null as any);
      expect((component as any).value()).toEqual([]);
    });

    it('sets value to empty array when a non-array is passed', () => {
      component.writeValue('notAnArray' as any);
      expect((component as any).value()).toEqual([]);
    });

    it('sets value to empty array when undefined is passed', () => {
      component.writeValue(undefined as any);
      expect((component as any).value()).toEqual([]);
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

    it('does nothing when menu is already closed', () => {
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
});
