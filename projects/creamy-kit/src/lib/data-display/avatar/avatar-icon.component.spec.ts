import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { AvatarIconComponent } from './avatar-icon.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('AvatarIconComponent', () => {
  let component: AvatarIconComponent;
  let fixture: ComponentFixture<AvatarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarIconComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarIconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'user_base');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('iconPx computed', () => {
    it('returns 18px for the default "medium" size', () => {
      expect(component['iconPx']()).toBe(18);
    });

    it('returns 14px for "small" size', () => {
      fixture.componentRef.setInput('size', 'small');
      expect(component['iconPx']()).toBe(14);
    });

    it('returns 28px for "large" size', () => {
      fixture.componentRef.setInput('size', 'large');
      expect(component['iconPx']()).toBe(28);
    });
  });

  describe('icon rendering', () => {
    it('renders a creamy-kit-icon element', () => {
      const icon: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-icon');
      expect(icon).not.toBeNull();
    });

    it('passes the icon name to creamy-kit-icon', () => {
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.getAttribute('aria-label')).toBe('user_base');
    });

    it('applies the correct icon size for "medium" (18px)', () => {
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.width).toBe('18px');
      expect(span.style.height).toBe('18px');
    });

    it('applies the correct icon size for "small" (14px)', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.width).toBe('14px');
      expect(span.style.height).toBe('14px');
    });

    it('applies the correct icon size for "large" (28px)', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.style.width).toBe('28px');
      expect(span.style.height).toBe('28px');
    });

    it('updates the icon when name changes', () => {
      fixture.componentRef.setInput('name', 'lock_base');
      fixture.detectChanges();
      const span: HTMLSpanElement = fixture.nativeElement.querySelector('.kit-icon__mask');
      expect(span.getAttribute('aria-label')).toBe('lock_base');
    });
  });

  describe('avatar shell', () => {
    it('renders the avatar shell', () => {
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell).not.toBeNull();
    });

    it('passes default size "medium" to the shell', () => {
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-size')).toBe('medium');
    });

    it('passes default contrast "dark" to the shell', () => {
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-contrast')).toBe('dark');
    });

    it('passes size input to the shell', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-size')).toBe('large');
    });

    it('passes contrast input to the shell', () => {
      fixture.componentRef.setInput('contrast', 'variant');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-contrast')).toBe('variant');
    });

    it('passes percentage to the shell, enabling the ring', () => {
      fixture.componentRef.setInput('percentage', 60);
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-ring')).toBe('');
    });
  });
});
