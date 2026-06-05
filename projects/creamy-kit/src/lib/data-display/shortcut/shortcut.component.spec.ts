import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortcutComponent } from './shortcut.component';

describe('ShortcutComponent', () => {
  let component: ShortcutComponent;
  let fixture: ComponentFixture<ShortcutComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortcutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortcutComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.componentRef.setInput('iconName', 'home_base');
    fixture.componentRef.setInput('label', 'Home');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a button element', () => {
    const btn = nativeEl.querySelector('button');
    expect(btn).not.toBeNull();
  });

  it('renders the label text', () => {
    const label = nativeEl.querySelector('.shortcut__label');
    expect(label?.textContent?.trim()).toBe('Home');
  });

  it('updates the label when input changes', () => {
    fixture.componentRef.setInput('label', 'Carteira');
    fixture.detectChanges();
    expect(nativeEl.querySelector('.shortcut__label')?.textContent?.trim()).toBe('Carteira');
  });

  it('emits pressed when button is clicked', () => {
    const pressedSpy = jest.spyOn(component.pressed, 'emit');
    nativeEl.querySelector<HTMLButtonElement>('button')!.click();
    expect(pressedSpy).toHaveBeenCalledTimes(1);
  });

  it('iconName input is reflected in the icon component', () => {
    fixture.componentRef.setInput('iconName', 'wallet_base');
    fixture.detectChanges();
    expect(component.iconName()).toBe('wallet_base');
  });
});
