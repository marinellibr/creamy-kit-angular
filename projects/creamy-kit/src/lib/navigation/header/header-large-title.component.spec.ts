import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { HeaderLargeTitleComponent } from './header-large-title.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('HeaderLargeTitleComponent', () => {
  let component: HeaderLargeTitleComponent;
  let fixture: ComponentFixture<HeaderLargeTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLargeTitleComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderLargeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data-theme host attribute', () => {
    it('has data-theme="brand" by default', () => {
      expect(fixture.nativeElement.getAttribute('data-theme')).toBe('brand');
    });

    it('sets data-theme="light" when theme input is "light"', () => {
      fixture.componentRef.setInput('theme', 'light');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('title', () => {
    it('renders large title in .header__large', () => {
      fixture.componentRef.setInput('title', 'Luiz');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('.header__large');
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe('Luiz');
    });
  });

  describe('subtitle', () => {
    it('renders subtitle overline when subtitle is set', () => {
      fixture.componentRef.setInput('subtitle', 'Olá,');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('.header__overline');
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe('Olá,');
    });

    it('does not render overline when subtitle is empty', () => {
      fixture.componentRef.setInput('subtitle', '');
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('.header__overline');
      expect(el).toBeNull();
    });
  });

  describe('back button', () => {
    it('does not render back button when back is false', () => {
      fixture.componentRef.setInput('back', false);
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('.header__back');
      expect(btn).toBeNull();
    });

    it('renders back button when back is true', () => {
      fixture.componentRef.setInput('back', true);
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('.header__back');
      expect(btn).toBeTruthy();
    });

    it('emits backClick when back button is clicked', () => {
      fixture.componentRef.setInput('back', true);
      fixture.detectChanges();

      let emitted = false;
      component.backClick.subscribe(() => (emitted = true));

      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('.header__back');
      btn.click();
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });
  });
});
