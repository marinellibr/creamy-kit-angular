import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BaseValueAccessor } from './base-value-accessor';

@Component({
  selector: 'test-cva',
  standalone: true,
  template: '',
  providers: [],
})
class TestCvaComponent extends BaseValueAccessor<string> {
  written: string | null = null;

  override writeValue(value: string): void {
    this.written = value;
  }

  getDisabledByForm() { return this.disabledByForm; }
  getOnChange() { return this.onChange; }
  getOnTouched() { return this.onTouched; }
}

describe('BaseValueAccessor', () => {
  let component: TestCvaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestCvaComponent] });
    const fixture = TestBed.createComponent(TestCvaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue is abstract and implemented by subclass', () => {
    component.writeValue('hello');
    expect(component.written).toBe('hello');
  });

  it('registerOnChange stores the fn and onChange calls it', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.getOnChange()('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('registerOnTouched stores the fn and onTouched calls it', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    component.getOnTouched()();
    expect(fn).toHaveBeenCalled();
  });

  it('setDisabledState updates disabledByForm signal', () => {
    expect(component.getDisabledByForm()()).toBe(false);
    component.setDisabledState(true);
    expect(component.getDisabledByForm()()).toBe(true);
    component.setDisabledState(false);
    expect(component.getDisabledByForm()()).toBe(false);
  });

  it('default onChange is a no-op', () => {
    expect(() => component.getOnChange()('anything')).not.toThrow();
  });

  it('default onTouched is a no-op', () => {
    expect(() => component.getOnTouched()()).not.toThrow();
  });
});
