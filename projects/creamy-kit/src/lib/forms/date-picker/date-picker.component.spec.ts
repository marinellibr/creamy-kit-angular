import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ButtonComponent } from '../../actions/button/button.component';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent, FormsModule, CalendarComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
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
    it('does not set data-disabled by default', () => {
      expect(el.hasAttribute('data-disabled')).toBe(false);
    });

    it('sets data-disabled as empty string when disabled input is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(el.getAttribute('data-disabled')).toBe('');
    });

    it('sets data-disabled when form disables the control', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(el.getAttribute('data-disabled')).toBe('');
    });
  });

  // ---------------------------------------------------------------------------
  // Template structure
  // ---------------------------------------------------------------------------

  describe('template', () => {
    it('has a .datepicker__close button', () => {
      expect(el.querySelector('.datepicker__close')).not.toBeNull();
    });

    it('clicking .datepicker__close calls onClose', () => {
      const spy = jest.spyOn(component as any, 'onClose');
      const closeBtn = el.querySelector('.datepicker__close') as HTMLButtonElement;
      closeBtn.click();
      expect(spy).toHaveBeenCalled();
    });

    it('displays the title from input', () => {
      fixture.componentRef.setInput('title', 'Pick a date');
      fixture.detectChanges();
      const titleEl = el.querySelector('.datepicker__title');
      expect(titleEl!.textContent!.trim()).toBe('Pick a date');
    });

    it('does not show .datepicker__desc when description is empty', () => {
      expect(el.querySelector('.datepicker__desc')).toBeNull();
    });

    it('shows .datepicker__desc when description is set', () => {
      fixture.componentRef.setInput('description', 'Choose carefully');
      fixture.detectChanges();
      const descEl = el.querySelector('.datepicker__desc');
      expect(descEl).not.toBeNull();
      expect(descEl!.textContent!.trim()).toBe('Choose carefully');
    });

    it('renders a creamy-kit-calendar child', () => {
      expect(el.querySelector('creamy-kit-calendar')).not.toBeNull();
    });

    it('renders confirm and cancel buttons in .datepicker__actions', () => {
      const actions = el.querySelector('.datepicker__actions');
      expect(actions).not.toBeNull();
      const buttons = actions!.querySelectorAll('creamy-kit-button');
      expect(buttons.length).toBe(2);
    });

    it('confirm button text matches confirmLabel input', () => {
      fixture.componentRef.setInput('confirmLabel', 'Save');
      fixture.detectChanges();
      const actions = el.querySelector('.datepicker__actions')!;
      const firstBtn = actions.querySelectorAll('creamy-kit-button')[0];
      expect(firstBtn.textContent!.trim()).toBe('Save');
    });

    it('cancel button text matches cancelLabel input', () => {
      fixture.componentRef.setInput('cancelLabel', 'Dismiss');
      fixture.detectChanges();
      const actions = el.querySelector('.datepicker__actions')!;
      const secondBtn = actions.querySelectorAll('creamy-kit-button')[1];
      expect(secondBtn.textContent!.trim()).toBe('Dismiss');
    });

    it('clicking confirm button calls onConfirm', () => {
      const spy = jest.spyOn(component as any, 'onConfirm');
      const actions = el.querySelector('.datepicker__actions')!;
      const confirmBtn = actions.querySelectorAll('creamy-kit-button')[0] as HTMLElement;
      confirmBtn.click();
      expect(spy).toHaveBeenCalled();
    });

    it('clicking cancel button calls onCancel', () => {
      const spy = jest.spyOn(component as any, 'onCancel');
      const actions = el.querySelector('.datepicker__actions')!;
      const cancelBtn = actions.querySelectorAll('creamy-kit-button')[1] as HTMLElement;
      cancelBtn.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // onCalendarChange()
  // ---------------------------------------------------------------------------

  describe('onCalendarChange()', () => {
    it('updates the selected signal with the given date', () => {
      const date = new Date(2025, 5, 10);
      (component as any).onCalendarChange(date);
      expect((component as any).selected()).toEqual(date);
    });

    it('sets selected to null when null is passed', () => {
      (component as any).selected.set(new Date(2025, 0, 1));
      (component as any).onCalendarChange(null);
      expect((component as any).selected()).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  // onConfirm()
  // ---------------------------------------------------------------------------

  describe('onConfirm()', () => {
    it('calls onChange with the current selected value', () => {
      const onChange = jest.fn();
      component.registerOnChange(onChange);
      const date = new Date(2025, 5, 10);
      (component as any).selected.set(date);
      (component as any).onConfirm();
      expect(onChange).toHaveBeenCalledWith(date);
    });

    it('calls onTouched', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      (component as any).onConfirm();
      expect(onTouched).toHaveBeenCalled();
    });

    it('emits confirm output with the selected date', () => {
      const emitted: (Date | null)[] = [];
      component.confirm.subscribe((v) => emitted.push(v));
      const date = new Date(2025, 5, 10);
      (component as any).selected.set(date);
      (component as any).onConfirm();
      expect(emitted).toHaveLength(1);
      expect(emitted[0]).toEqual(date);
    });

    it('emits confirm with null when no date is selected', () => {
      const emitted: (Date | null)[] = [];
      component.confirm.subscribe((v) => emitted.push(v));
      (component as any).selected.set(null);
      (component as any).onConfirm();
      expect(emitted[0]).toBeNull();
    });

    it('does nothing when disabled via input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const onChange = jest.fn();
      component.registerOnChange(onChange);
      const emitted: (Date | null)[] = [];
      component.confirm.subscribe((v) => emitted.push(v));
      (component as any).onConfirm();
      expect(onChange).not.toHaveBeenCalled();
      expect(emitted).toHaveLength(0);
    });

    it('does nothing when disabled via form', () => {
      component.setDisabledState(true);
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      const emitted: (Date | null)[] = [];
      component.confirm.subscribe((v) => emitted.push(v));
      (component as any).onConfirm();
      expect(onTouched).not.toHaveBeenCalled();
      expect(emitted).toHaveLength(0);
    });
  });

  // ---------------------------------------------------------------------------
  // onCancel()
  // ---------------------------------------------------------------------------

  describe('onCancel()', () => {
    it('emits the cancel output', () => {
      let emitted = false;
      component.cancel.subscribe(() => { emitted = true; });
      (component as any).onCancel();
      expect(emitted).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // onClose()
  // ---------------------------------------------------------------------------

  describe('onClose()', () => {
    it('emits the closed output', () => {
      let emitted = false;
      component.closed.subscribe(() => { emitted = true; });
      (component as any).onClose();
      expect(emitted).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // writeValue()
  // ---------------------------------------------------------------------------

  describe('writeValue()', () => {
    it('sets selected to the given Date', () => {
      const date = new Date(2025, 3, 20);
      component.writeValue(date);
      const selected: Date | null = (component as any).selected();
      expect(selected).not.toBeNull();
      expect(selected!.getFullYear()).toBe(2025);
      expect(selected!.getMonth()).toBe(3);
      expect(selected!.getDate()).toBe(20);
    });

    it('sets selected to null when null is passed', () => {
      component.writeValue(new Date(2025, 0, 1));
      component.writeValue(null as any);
      expect((component as any).selected()).toBeNull();
    });

    it('sets selected to null when undefined is passed', () => {
      component.writeValue(undefined as any);
      expect((component as any).selected()).toBeNull();
    });

    it('parses a valid ISO date string', () => {
      component.writeValue('2025-06-15' as any);
      const selected: Date | null = (component as any).selected();
      expect(selected).not.toBeNull();
      expect(selected!.getFullYear()).toBe(2025);
    });

    it('sets selected to null when an invalid string is passed', () => {
      component.writeValue('not-a-date' as any);
      expect((component as any).selected()).toBeNull();
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