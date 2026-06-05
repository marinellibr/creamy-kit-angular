import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { HeaderProfileComponent } from './header-profile.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('HeaderProfileComponent', () => {
  let component: HeaderProfileComponent;
  let fixture: ComponentFixture<HeaderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderProfileComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderProfileComponent);
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
    it('renders title in .header__name', () => {
      fixture.componentRef.setInput('title', 'Luiz Marinelli');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('.header__name');
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe('Luiz Marinelli');
    });
  });

  describe('subtitle', () => {
    it('renders subtitle in .header__subtitle when set', () => {
      fixture.componentRef.setInput('subtitle', 'Premium');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('.header__subtitle');
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe('Premium');
    });

    it('does not render .header__subtitle when subtitle is empty', () => {
      fixture.componentRef.setInput('subtitle', '');
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector('.header__subtitle');
      expect(el).toBeNull();
    });
  });

  describe('avatarClick', () => {
    it('emits avatarClick when avatar is clicked', () => {
      fixture.componentRef.setInput('avatarSrc', 'foto.jpg');
      fixture.detectChanges();

      let emitted = false;
      component.avatarClick.subscribe(() => (emitted = true));

      const avatar: HTMLElement = fixture.nativeElement.querySelector('.header__avatar');
      expect(avatar).toBeTruthy();
      avatar.click();
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });
  });
});
