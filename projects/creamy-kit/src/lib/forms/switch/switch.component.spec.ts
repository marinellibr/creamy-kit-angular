import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle value on click', () => {
    const button = fixture.nativeElement.querySelector('.switch');
    expect(component['value']).toBe(false);

    button.click();
    expect(component['value']).toBe(true);

    button.click();
    expect(component['value']).toBe(false);
  });

  it('should have switch--on class when value is true', () => {
    component.writeValue(true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.switch');
    expect(button.classList.contains('switch--on')).toBe(true);
  });

  it('should apply custom color via CSS variable', () => {
    fixture.componentRef.setInput('color', 'var(--secondary-base)');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.switch');
    expect(button.getAttribute('style')).toContain('--switch-color');
  });

  it('should implement ControlValueAccessor', () => {
    let changedValue: boolean | undefined;
    component.registerOnChange((v: boolean) => {
      changedValue = v;
    });

    component.toggle();
    expect(changedValue).toBe(true);

    component.toggle();
    expect(changedValue).toBe(false);
  });

  it('should have proper ARIA attributes', () => {
    const button = fixture.nativeElement.querySelector('.switch');
    expect(button.getAttribute('role')).toBe('switch');
    expect(button.getAttribute('aria-checked')).toBe('false');

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-checked')).toBe('true');
  });
});
