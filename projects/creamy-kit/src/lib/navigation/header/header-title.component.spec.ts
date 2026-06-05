import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { HeaderTitleComponent } from './header-title.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('HeaderTitleComponent', () => {
  let component: HeaderTitleComponent;
  let fixture: ComponentFixture<HeaderTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTitleComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderTitleComponent);
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

    it('sets data-theme="brand" when theme input is "brand"', () => {
      fixture.componentRef.setInput('theme', 'brand');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-theme')).toBe('brand');
    });
  });

  describe('title', () => {
    it('renders title in .header__title', () => {
      fixture.componentRef.setInput('title', 'Pedidos');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('.header__title');
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe('Pedidos');
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
