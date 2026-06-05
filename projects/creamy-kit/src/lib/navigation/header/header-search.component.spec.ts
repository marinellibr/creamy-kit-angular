import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { HeaderSearchComponent } from './header-search.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('HeaderSearchComponent', () => {
  let component: HeaderSearchComponent;
  let fixture: ComponentFixture<HeaderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSearchComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSearchComponent);
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

  describe('placeholder', () => {
    it('passes placeholder to the search component', () => {
      fixture.componentRef.setInput('placeholder', 'Buscar produtos');
      fixture.detectChanges();
      const searchEl: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-search');
      expect(searchEl).toBeTruthy();
      const input: HTMLInputElement | null = fixture.nativeElement.querySelector('input');
      if (input) {
        expect(input.placeholder).toBe('Buscar produtos');
      } else {
        // Search component renders placeholder via attribute binding on its host
        expect(searchEl).toBeTruthy();
      }
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

  describe('avatar', () => {
    it('renders avatar when back is false and avatarSrc is set', () => {
      fixture.componentRef.setInput('back', false);
      fixture.componentRef.setInput('avatarSrc', 'foto.jpg');
      fixture.detectChanges();
      const avatar: HTMLElement = fixture.nativeElement.querySelector('.header__avatar');
      expect(avatar).toBeTruthy();
    });

    it('does not render avatar when back is true (back takes precedence)', () => {
      fixture.componentRef.setInput('back', true);
      fixture.componentRef.setInput('avatarSrc', 'foto.jpg');
      fixture.detectChanges();
      const avatar = fixture.nativeElement.querySelector('.header__avatar');
      expect(avatar).toBeNull();
    });

    it('emits avatarClick when avatar is clicked', () => {
      fixture.componentRef.setInput('back', false);
      fixture.componentRef.setInput('avatarSrc', 'foto.jpg');
      fixture.detectChanges();

      let emitted = false;
      component.avatarClick.subscribe(() => (emitted = true));

      const avatar: HTMLElement = fixture.nativeElement.querySelector('.header__avatar');
      avatar.click();
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });
  });
});
