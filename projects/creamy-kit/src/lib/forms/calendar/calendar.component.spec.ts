import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
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
    it('does not set data-bare by default', () => {
      expect(el.hasAttribute('data-bare')).toBe(false);
    });

    it('sets data-bare as empty string when bare is true', () => {
      fixture.componentRef.setInput('bare', true);
      fixture.detectChanges();
      expect(el.getAttribute('data-bare')).toBe('');
    });

    it('does not set data-disabled by default', () => {
      expect(el.hasAttribute('data-disabled')).toBe(false);
    });

    it('sets data-disabled as empty string when disabled is true', () => {
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
    it('has a .calendar__navbtn--prev button', () => {
      expect(el.querySelector('.calendar__navbtn--prev')).not.toBeNull();
    });

    it('has a .calendar__navbtn--next button', () => {
      expect(el.querySelector('.calendar__navbtn--next')).not.toBeNull();
    });

    it('does not show footer when footerLabel and footerValue are empty', () => {
      expect(el.querySelector('.calendar__footer')).toBeNull();
    });

    it('shows footer when footerLabel is set', () => {
      fixture.componentRef.setInput('footerLabel', 'Selected');
      fixture.detectChanges();
      expect(el.querySelector('.calendar__footer')).not.toBeNull();
    });

    it('shows footer when footerValue is set to non-empty string', () => {
      fixture.componentRef.setInput('footerValue', 'some text');
      fixture.detectChanges();
      expect(el.querySelector('.calendar__footer')).not.toBeNull();
    });

    it('renders .calendar__day buttons for each day in the month', () => {
      // Pin view to February 2025 (28 days)
      (component as any).view.set(new Date(2025, 1, 1));
      fixture.detectChanges();
      const dayBtns = el.querySelectorAll('button.calendar__day');
      expect(dayBtns.length).toBe(28);
    });

    it('renders empty cells (.calendar__day--empty) for weekday offset', () => {
      // February 2025 starts on Saturday (weekday index 6)
      (component as any).view.set(new Date(2025, 1, 1));
      fixture.detectChanges();
      const emptyCells = el.querySelectorAll('.calendar__day--empty');
      expect(emptyCells.length).toBe(6);
    });

    it('marks selected day with calendar__day--selected class', () => {
      const date = new Date(2025, 0, 15);
      component.writeValue(date);
      fixture.detectChanges();
      const selectedBtns = el.querySelectorAll('.calendar__day--selected');
      expect(selectedBtns.length).toBe(1);
      expect(selectedBtns[0].textContent!.trim()).toBe('15');
    });

    it('clicking a day button calls selectDay', () => {
      const spy = jest.spyOn(component as any, 'selectDay');
      (component as any).view.set(new Date(2025, 0, 1));
      fixture.detectChanges();
      const dayBtns = el.querySelectorAll('button.calendar__day');
      (dayBtns[0] as HTMLElement).click();
      expect(spy).toHaveBeenCalledWith(1);
    });

    it('displays month label in .calendar__month', () => {
      (component as any).view.set(new Date(2025, 0, 1));
      fixture.detectChanges();
      const monthEl = el.querySelector('.calendar__month');
      expect(monthEl!.textContent!.trim()).toBe('Janeiro de 2025');
    });

    it('shows footer label in strong.calendar__footer-label when footerLabel is set', () => {
      fixture.componentRef.setInput('footerLabel', 'Data');
      fixture.componentRef.setInput('footerValue', 'some text');
      fixture.detectChanges();
      const labelEl = el.querySelector('strong.calendar__footer-label');
      expect(labelEl).not.toBeNull();
      expect(labelEl!.textContent!.trim()).toBe('Data');
    });

    it('does not show strong.calendar__footer-label when footerLabel is empty', () => {
      fixture.componentRef.setInput('footerValue', 'some text');
      fixture.detectChanges();
      expect(el.querySelector('strong.calendar__footer-label')).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  // monthLabel computed
  // ---------------------------------------------------------------------------

  describe('monthLabel', () => {
    it('returns month name in Portuguese with year for January 2025', () => {
      (component as any).view.set(new Date(2025, 0, 1));
      expect((component as any).monthLabel()).toBe('Janeiro de 2025');
    });

    it('returns month name in Portuguese with year for March 2026', () => {
      (component as any).view.set(new Date(2026, 2, 1));
      expect((component as any).monthLabel()).toBe('Março de 2026');
    });

    it('capitalizes the first letter of the month name', () => {
      (component as any).view.set(new Date(2025, 11, 1)); // December
      const label = (component as any).monthLabel() as string;
      expect(label.charAt(0)).toBe(label.charAt(0).toUpperCase());
    });
  });

  // ---------------------------------------------------------------------------
  // cells computed
  // ---------------------------------------------------------------------------

  describe('cells', () => {
    it('has leading null cells matching first weekday offset', () => {
      // January 2025: first weekday is Wednesday (3)
      (component as any).view.set(new Date(2025, 0, 1));
      const cells: (number | null)[] = (component as any).cells();
      expect(cells[0]).toBeNull();
      expect(cells[1]).toBeNull();
      expect(cells[2]).toBeNull();
      expect(cells[3]).toBe(1);
    });

    it('has total length = offset + days in month', () => {
      // February 2025: 6 offset + 28 days = 34
      (component as any).view.set(new Date(2025, 1, 1));
      const cells: (number | null)[] = (component as any).cells();
      expect(cells.length).toBe(6 + 28);
    });

    it('contains sequential day numbers after nulls', () => {
      (component as any).view.set(new Date(2025, 1, 1)); // February 2025
      const cells: (number | null)[] = (component as any).cells();
      const dayNums = cells.filter((c): c is number => c !== null);
      expect(dayNums).toEqual(Array.from({ length: 28 }, (_, i) => i + 1));
    });

    it('has zero null cells when month starts on Sunday (March 2026)', () => {
      // March 2026 starts on Sunday (weekday index 0)
      (component as any).view.set(new Date(2026, 2, 1));
      const cells: (number | null)[] = (component as any).cells();
      expect(cells[0]).toBe(1);
    });
  });

  // ---------------------------------------------------------------------------
  // prevMonth() / nextMonth()
  // ---------------------------------------------------------------------------

  describe('prevMonth()', () => {
    it('moves view to the previous month', () => {
      (component as any).view.set(new Date(2025, 3, 1)); // April 2025
      (component as any).prevMonth();
      const view: Date = (component as any).view();
      expect(view.getFullYear()).toBe(2025);
      expect(view.getMonth()).toBe(2); // March
    });

    it('wraps from January to December of previous year', () => {
      (component as any).view.set(new Date(2025, 0, 1));
      (component as any).prevMonth();
      const view: Date = (component as any).view();
      expect(view.getFullYear()).toBe(2024);
      expect(view.getMonth()).toBe(11); // December
    });

    it('does nothing when disabled via input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const before: Date = (component as any).view();
      (component as any).prevMonth();
      const after: Date = (component as any).view();
      expect(after.getTime()).toBe(before.getTime());
    });

    it('does nothing when disabled via form', () => {
      component.setDisabledState(true);
      const before: Date = (component as any).view();
      (component as any).prevMonth();
      const after: Date = (component as any).view();
      expect(after.getTime()).toBe(before.getTime());
    });

    it('fires when clicking .calendar__navbtn--prev button', () => {
      const spy = jest.spyOn(component as any, 'prevMonth');
      const btn = el.querySelector('.calendar__navbtn--prev') as HTMLButtonElement;
      btn.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('nextMonth()', () => {
    it('moves view to the next month', () => {
      (component as any).view.set(new Date(2025, 3, 1)); // April 2025
      (component as any).nextMonth();
      const view: Date = (component as any).view();
      expect(view.getFullYear()).toBe(2025);
      expect(view.getMonth()).toBe(4); // May
    });

    it('wraps from December to January of next year', () => {
      (component as any).view.set(new Date(2025, 11, 1));
      (component as any).nextMonth();
      const view: Date = (component as any).view();
      expect(view.getFullYear()).toBe(2026);
      expect(view.getMonth()).toBe(0); // January
    });

    it('does nothing when disabled via input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const before: Date = (component as any).view();
      (component as any).nextMonth();
      const after: Date = (component as any).view();
      expect(after.getTime()).toBe(before.getTime());
    });

    it('does nothing when disabled via form', () => {
      component.setDisabledState(true);
      const before: Date = (component as any).view();
      (component as any).nextMonth();
      const after: Date = (component as any).view();
      expect(after.getTime()).toBe(before.getTime());
    });

    it('fires when clicking .calendar__navbtn--next button', () => {
      const spy = jest.spyOn(component as any, 'nextMonth');
      const btn = el.querySelector('.calendar__navbtn--next') as HTMLButtonElement;
      btn.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // selectDay()
  // ---------------------------------------------------------------------------

  describe('selectDay()', () => {
    beforeEach(() => {
      (component as any).view.set(new Date(2025, 0, 1)); // January 2025
      fixture.detectChanges();
    });

    it('sets the selected signal to the constructed date', () => {
      (component as any).selectDay(15);
      const selected: Date = (component as any).selected();
      expect(selected.getFullYear()).toBe(2025);
      expect(selected.getMonth()).toBe(0);
      expect(selected.getDate()).toBe(15);
    });

    it('calls onChange with the selected date', () => {
      const onChange = jest.fn();
      component.registerOnChange(onChange);
      (component as any).selectDay(10);
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
      const called: Date = onChange.mock.calls[0][0];
      expect(called.getDate()).toBe(10);
    });

    it('calls onTouched after selecting a day', () => {
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      (component as any).selectDay(10);
      expect(onTouched).toHaveBeenCalled();
    });

    it('emits dateChange output with the selected date', () => {
      const emitted: Date[] = [];
      component.dateChange.subscribe((d) => emitted.push(d));
      (component as any).selectDay(5);
      expect(emitted.length).toBe(1);
      expect(emitted[0].getDate()).toBe(5);
    });

    it('does nothing when disabled via input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const onChange = jest.fn();
      component.registerOnChange(onChange);
      (component as any).selectDay(5);
      expect((component as any).selected()).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does nothing when disabled via form', () => {
      component.setDisabledState(true);
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);
      (component as any).selectDay(5);
      expect((component as any).selected()).toBeNull();
      expect(onTouched).not.toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // isSelected()
  // ---------------------------------------------------------------------------

  describe('isSelected()', () => {
    it('returns false when nothing is selected', () => {
      (component as any).view.set(new Date(2025, 0, 1));
      expect((component as any).isSelected(10)).toBe(false);
    });

    it('returns true when the day matches the selected date in the current view month', () => {
      const date = new Date(2025, 0, 15);
      component.writeValue(date);
      expect((component as any).isSelected(15)).toBe(true);
    });

    it('returns false for a different day in the same month', () => {
      const date = new Date(2025, 0, 15);
      component.writeValue(date);
      expect((component as any).isSelected(16)).toBe(false);
    });

    it('returns false when viewing a different month than the selected date', () => {
      const date = new Date(2025, 0, 15); // Jan 15
      component.writeValue(date);
      (component as any).view.set(new Date(2025, 1, 1)); // navigate to Feb
      expect((component as any).isSelected(15)).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // writeValue()
  // ---------------------------------------------------------------------------

  describe('writeValue()', () => {
    it('sets selected to the given Date', () => {
      const date = new Date(2025, 3, 20);
      component.writeValue(date);
      const selected: Date = (component as any).selected();
      expect(selected).not.toBeNull();
      expect(selected.getFullYear()).toBe(2025);
      expect(selected.getMonth()).toBe(3);
      expect(selected.getDate()).toBe(20);
    });

    it('sets view to start of month of the given Date', () => {
      const date = new Date(2025, 3, 20);
      component.writeValue(date);
      const view: Date = (component as any).view();
      expect(view.getFullYear()).toBe(2025);
      expect(view.getMonth()).toBe(3);
      expect(view.getDate()).toBe(1);
    });

    it('parses an ISO date string', () => {
      component.writeValue('2025-06-15' as any);
      const selected: Date = (component as any).selected();
      expect(selected).not.toBeNull();
      expect(selected!.getFullYear()).toBe(2025);
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

    it('does not crash and leaves selected unchanged when invalid string is passed', () => {
      component.writeValue(new Date(2025, 0, 1));
      const before: Date = (component as any).selected();
      component.writeValue('not-a-date' as any);
      const after: Date = (component as any).selected();
      expect(after.getTime()).toBe(before.getTime());
    });
  });

  // ---------------------------------------------------------------------------
  // footerVisible computed
  // ---------------------------------------------------------------------------

  describe('footerVisible', () => {
    it('is false when both footerLabel and footerValue are empty', () => {
      expect((component as any).footerVisible()).toBe(false);
    });

    it('is true when footerLabel is set', () => {
      fixture.componentRef.setInput('footerLabel', 'Label');
      fixture.detectChanges();
      expect((component as any).footerVisible()).toBe(true);
    });

    it('is true when footerValue is set to non-empty string', () => {
      fixture.componentRef.setInput('footerValue', 'some text');
      fixture.detectChanges();
      expect((component as any).footerVisible()).toBe(true);
    });

    it('is true when footerValue is "auto"', () => {
      fixture.componentRef.setInput('footerValue', 'auto');
      fixture.detectChanges();
      expect((component as any).footerVisible()).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // footerDisplay computed
  // ---------------------------------------------------------------------------

  describe('footerDisplay', () => {
    it('returns the static text when footerValue is a plain string', () => {
      fixture.componentRef.setInput('footerValue', 'Some info text');
      fixture.detectChanges();
      expect((component as any).footerDisplay()).toBe('Some info text');
    });

    it('returns empty string when footerValue is "auto" and no date is selected', () => {
      fixture.componentRef.setInput('footerValue', 'auto');
      fixture.detectChanges();
      expect((component as any).footerDisplay()).toBe('');
    });

    it('returns formatted date when footerValue is "auto" and a date is selected', () => {
      fixture.componentRef.setInput('footerValue', 'auto');
      component.writeValue(new Date(2025, 0, 15));
      fixture.detectChanges();
      const display = (component as any).footerDisplay() as string;
      expect(display).toContain('15');
      expect(display).toContain('janeiro');
      expect(display).toContain('2025');
    });

    it('shows formatted date in template when footerValue is "auto" and date is selected', () => {
      fixture.componentRef.setInput('footerValue', 'auto');
      component.writeValue(new Date(2025, 0, 15));
      fixture.detectChanges();
      const valueEl = el.querySelector('.calendar__footer-value');
      expect(valueEl).not.toBeNull();
      expect(valueEl!.textContent).toContain('15');
    });

    it('returns empty string when footerValue is empty', () => {
      expect((component as any).footerDisplay()).toBe('');
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
