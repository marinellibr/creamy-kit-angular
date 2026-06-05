import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeComponent } from './code.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

describe('CodeComponent', () => {
  let component: CodeComponent;
  let fixture: ComponentFixture<CodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Creation & defaults
  // ---------------------------------------------------------------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default length to 6', () => {
    expect(component.length()).toBe(6);
  });

  it('should default title to empty string', () => {
    expect(component.title()).toBe('');
  });

  it('should default error to false', () => {
    expect(component.error()).toBe(false);
  });

  it('should default disabled to false', () => {
    expect(component.disabled()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Rendering: input boxes
  // ---------------------------------------------------------------------------

  it('should render 6 input boxes by default', () => {
    const boxes = fixture.nativeElement.querySelectorAll('input.code__field');
    expect(boxes.length).toBe(6);
  });

  it('should render 4 input boxes when length=4', () => {
    fixture.componentRef.setInput('length', 4);
    fixture.detectChanges();
    const boxes = fixture.nativeElement.querySelectorAll('input.code__field');
    expect(boxes.length).toBe(4);
  });

  it('indexes() should match length()', () => {
    expect((component as any).indexes().length).toBe(6);
    fixture.componentRef.setInput('length', 4);
    expect((component as any).indexes().length).toBe(4);
  });

  it('indexes() should be a sequential array of indices', () => {
    expect((component as any).indexes()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('indexes() should be [0,1,2,3] when length=4', () => {
    fixture.componentRef.setInput('length', 4);
    expect((component as any).indexes()).toEqual([0, 1, 2, 3]);
  });

  // ---------------------------------------------------------------------------
  // Title rendering
  // ---------------------------------------------------------------------------

  it('should not render title element when title is empty', () => {
    const title = fixture.nativeElement.querySelector('.code__title');
    expect(title).toBeNull();
  });

  it('should render title when title input is set', () => {
    fixture.componentRef.setInput('title', 'Verification code');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.code__title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('Verification code');
  });

  // ---------------------------------------------------------------------------
  // Host binding: data-error
  // ---------------------------------------------------------------------------

  it('should not set data-error attribute when error=false', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.hasAttribute('data-error')).toBe(false);
  });

  it('should set data-error="" when error=true', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.hasAttribute('data-error')).toBe(true);
    expect(host.getAttribute('data-error')).toBe('');
  });

  it('should remove data-error when error returns to false', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    fixture.componentRef.setInput('error', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.hasAttribute('data-error')).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // isDisabled
  // ---------------------------------------------------------------------------

  it('isDisabled() should be false by default', () => {
    expect(component.isDisabled()).toBe(false);
  });

  it('isDisabled() should be true when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    expect(component.isDisabled()).toBe(true);
  });

  it('isDisabled() should be true when setDisabledState(true) is called', () => {
    component.setDisabledState(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('isDisabled() should be false when disabled input is false and form is not disabled', () => {
    fixture.componentRef.setInput('disabled', false);
    component.setDisabledState(false);
    expect(component.isDisabled()).toBe(false);
  });

  it('should disable all input boxes when isDisabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const boxes: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input.code__field');
    boxes.forEach((box) => expect(box.disabled).toBe(true));
  });

  it('should not disable input boxes when isDisabled is false', () => {
    fixture.detectChanges();
    const boxes: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input.code__field');
    boxes.forEach((box) => expect(box.disabled).toBe(false));
  });

  // ---------------------------------------------------------------------------
  // writeValue
  // ---------------------------------------------------------------------------

  it('writeValue should split string into chars array', () => {
    component.writeValue('123456');
    expect((component as any).chars()).toEqual(['1', '2', '3', '4', '5', '6']);
  });

  it('writeValue should pad short string with empty strings', () => {
    component.writeValue('12');
    expect((component as any).chars()).toEqual(['1', '2', '', '', '', '']);
  });

  it('writeValue(null) should produce all-empty chars', () => {
    component.writeValue(null as any);
    expect((component as any).chars()).toEqual(['', '', '', '', '', '']);
  });

  it('writeValue("") should produce all-empty chars', () => {
    component.writeValue('');
    expect((component as any).chars()).toEqual(['', '', '', '', '', '']);
  });

  it('writeValue should respect current length', () => {
    fixture.componentRef.setInput('length', 4);
    component.writeValue('ABCD');
    expect((component as any).chars()).toEqual(['A', 'B', 'C', 'D']);
  });

  it('writeValue should truncate string longer than length', () => {
    fixture.componentRef.setInput('length', 4);
    component.writeValue('ABCDEFGH');
    expect((component as any).chars()).toEqual(['A', 'B', 'C', 'D']);
  });

  it('writeValue should not call onChange', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    component.writeValue('ABC');
    expect(onChange).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // charAt
  // ---------------------------------------------------------------------------

  it('charAt should return the character at the given index', () => {
    component.writeValue('ABCDEF');
    expect((component as any).charAt(0)).toBe('A');
    expect((component as any).charAt(5)).toBe('F');
  });

  it('charAt should return "" for out-of-bounds index', () => {
    expect((component as any).charAt(99)).toBe('');
  });

  it('charAt should return middle character correctly', () => {
    component.writeValue('123456');
    expect((component as any).charAt(3)).toBe('4');
  });

  // ---------------------------------------------------------------------------
  // onBlur
  // ---------------------------------------------------------------------------

  it('onBlur should call onTouched', () => {
    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);
    (component as any).onBlur();
    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // onInput
  // ---------------------------------------------------------------------------

  it('onInput should store the entered character in chars', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const input = document.createElement('input');
    input.value = 'A';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 0);

    expect((component as any).chars()[0]).toBe('A');
  });

  it('onInput should keep only the last character of multi-char input', () => {
    const input = document.createElement('input');
    input.value = 'XYZ';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 2);

    // last char of 'XYZ' is 'Z'
    expect((component as any).chars()[2]).toBe('Z');
    // native input.value should be truncated too
    expect(input.value).toBe('Z');
  });

  it('onInput with empty value should store "" in chars', () => {
    component.writeValue('ABCDEF');
    const input = document.createElement('input');
    input.value = '';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 0);

    expect((component as any).chars()[0]).toBe('');
  });

  it('onInput should call onChange with joined value', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);
    component.writeValue('12345 ');

    const input = document.createElement('input');
    input.value = '6';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 5);
    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('onInput should not advance focus on the last box', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');

    const input = document.createElement('input');
    input.value = 'Z';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 5); // last index for length=6
    expect(focusBox).not.toHaveBeenCalled();
  });

  it('onInput should advance focus when not on the last box', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');

    const input = document.createElement('input');
    input.value = 'A';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 0);
    expect(focusBox).toHaveBeenCalledWith(1);
  });

  it('onInput should not advance focus when value is empty', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');

    const input = document.createElement('input');
    input.value = '';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 0);
    expect(focusBox).not.toHaveBeenCalled();
  });

  it('onInput should advance to box index+1 from a middle index', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');

    const input = document.createElement('input');
    input.value = 'B';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 3);
    expect(focusBox).toHaveBeenCalledWith(4);
  });

  it('onInput should keep single-char input unchanged', () => {
    const input = document.createElement('input');
    input.value = 'Q';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onInput(event, 1);

    expect(input.value).toBe('Q');
    expect((component as any).chars()[1]).toBe('Q');
  });

  // ---------------------------------------------------------------------------
  // onKeydown
  // ---------------------------------------------------------------------------

  it('onKeydown Backspace on empty box should focus previous box', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 2);
    expect(focusBox).toHaveBeenCalledWith(1);
  });

  it('onKeydown Backspace on non-empty box should NOT focus previous box', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = 'A';

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 2);
    expect(focusBox).not.toHaveBeenCalled();
  });

  it('onKeydown Backspace on first box (index=0) should not focus anything', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 0);
    expect(focusBox).not.toHaveBeenCalled();
  });

  it('onKeydown ArrowLeft should focus previous box', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = 'A';

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 3);
    expect(focusBox).toHaveBeenCalledWith(2);
  });

  it('onKeydown ArrowLeft on first box should not focus anything', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 0);
    expect(focusBox).not.toHaveBeenCalled();
  });

  it('onKeydown ArrowRight should focus next box', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 1);
    expect(focusBox).toHaveBeenCalledWith(2);
  });

  it('onKeydown ArrowRight on last box should not focus anything', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 5); // last index for length=6
    expect(focusBox).not.toHaveBeenCalled();
  });

  it('onKeydown with unrelated key should not focus anything', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 2);
    expect(focusBox).not.toHaveBeenCalled();
  });

  it('onKeydown ArrowLeft focuses index-1 from any mid-range position', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 5);
    expect(focusBox).toHaveBeenCalledWith(4);
  });

  it('onKeydown ArrowRight focuses index+1 from first box', () => {
    const focusBox = jest.spyOn(component as any, 'focusBox');
    const input = document.createElement('input');
    input.value = '';

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    Object.defineProperty(event, 'target', { value: input });

    (component as any).onKeydown(event, 0);
    expect(focusBox).toHaveBeenCalledWith(1);
  });

  // ---------------------------------------------------------------------------
  // onPaste
  // ---------------------------------------------------------------------------

  function makePasteEvent(text: string): ClipboardEvent {
    return {
      preventDefault: jest.fn(),
      clipboardData: {
        getData: (type: string) => (type === 'text' ? text : ''),
      },
    } as unknown as ClipboardEvent;
  }

  it('onPaste should fill chars from clipboard text', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const event = makePasteEvent('ABCDEF');
    (component as any).onPaste(event);

    expect((component as any).chars()).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    expect(onChange).toHaveBeenCalledWith('ABCDEF');
  });

  it('onPaste should pad short clipboard text with empty strings', () => {
    const event = makePasteEvent('AB');
    (component as any).onPaste(event);

    expect((component as any).chars()).toEqual(['A', 'B', '', '', '', '']);
  });

  it('onPaste should truncate clipboard text longer than length', () => {
    const event = makePasteEvent('ABCDEFGHIJ');
    (component as any).onPaste(event);

    expect((component as any).chars()).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });

  it('onPaste should trim whitespace from clipboard text', () => {
    const event = makePasteEvent('  ABCD  ');
    (component as any).onPaste(event);

    expect((component as any).chars()[0]).toBe('A');
  });

  it('onPaste with empty clipboard text should not change chars', () => {
    component.writeValue('123456');
    const event = makePasteEvent('');
    (component as any).onPaste(event);

    expect((component as any).chars()).toEqual(['1', '2', '3', '4', '5', '6']);
  });

  it('onPaste should call preventDefault', () => {
    const event = makePasteEvent('ABCDEF');
    (component as any).onPaste(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('onPaste should call onChange with joined chars', () => {
    const onChange = jest.fn();
    component.registerOnChange(onChange);

    const event = makePasteEvent('123456');
    (component as any).onPaste(event);

    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('onPaste with whitespace-only text should not change chars', () => {
    component.writeValue('AABBCC');
    const event = makePasteEvent('   ');
    (component as any).onPaste(event);

    // trim() of '   ' is '' — early return, chars unchanged
    expect((component as any).chars()).toEqual(['A', 'A', 'B', 'B', 'C', 'C']);
  });

  it('onPaste with length=4 should fill only 4 chars', () => {
    fixture.componentRef.setInput('length', 4);
    const event = makePasteEvent('WXYZ');
    (component as any).onPaste(event);

    expect((component as any).chars()).toEqual(['W', 'X', 'Y', 'Z']);
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor plumbing
  // ---------------------------------------------------------------------------

  it('registerOnChange should store the callback', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component['onChange']).toBe(fn);
  });

  it('registerOnTouched should store the callback', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component['onTouched']).toBe(fn);
  });

  it('setDisabledState(false) should clear disabledByForm', () => {
    component.setDisabledState(true);
    component.setDisabledState(false);
    expect(component.isDisabled()).toBe(false);
  });

  it('setDisabledState(true) should make isDisabled true even when disabled input is false', () => {
    fixture.componentRef.setInput('disabled', false);
    component.setDisabledState(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('provides itself as NG_VALUE_ACCESSOR via forwardRef', () => {
    const accessor = fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    expect(accessor).toBeTruthy();
  });

  it('onPaste handles null clipboardData (covers ?? branch)', () => {
    component.writeValue('123456');
    const event = {
      preventDefault: jest.fn(),
      clipboardData: null,
    } as unknown as ClipboardEvent;
    (component as any).onPaste(event);
    // early-return: chars unchanged because text is '' after trim
    expect((component as any).chars()).toEqual(['1', '2', '3', '4', '5', '6']);
  });

});