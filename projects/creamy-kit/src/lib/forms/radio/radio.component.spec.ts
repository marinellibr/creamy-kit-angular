import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options', () => {
    const options = [
      { label: 'Opção A', value: 'a' },
      { label: 'Opção B', value: 'b' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('.radio__row');
    expect(buttons.length).toBe(2);
  });

  it('should select an option', () => {
    const options = [
      { label: 'Opção A', value: 'a' },
      { label: 'Opção B', value: 'b' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('.radio__row');
    (buttons[0] as HTMLButtonElement).click();

    expect(component['value']).toBe('a');
  });

  it('should show variant icon only when selected', () => {
    const options = [
      { label: 'Opção A', value: 'a' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.radio__row');
    button.click();
    fixture.detectChanges();

    const variant = fixture.nativeElement.querySelector('.radio__icon--variant');
    expect(variant).toBeTruthy();
  });

  it('should set custom color via CSS variable', () => {
    const options = [{ label: 'Opção A', value: 'a' }];
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('color', 'var(--secondary-base)');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.radio__icon');
    expect(icon.getAttribute('style')).toContain('--radio-color');
  });

  it('should implement ControlValueAccessor', () => {
    component.writeValue('test');
    expect(component['value']).toBe('test');
  });
});
