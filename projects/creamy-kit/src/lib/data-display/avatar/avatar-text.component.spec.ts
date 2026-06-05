import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarTextComponent } from './avatar-text.component';

describe('AvatarTextComponent', () => {
  let component: AvatarTextComponent;
  let fixture: ComponentFixture<AvatarTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('text rendering', () => {
    it('renders empty text by default', () => {
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.textContent?.trim()).toBe('');
    });

    it('renders the provided text inside the avatar shell', () => {
      fixture.componentRef.setInput('text', 'LM');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.textContent?.trim()).toBe('LM');
    });

    it('updates the rendered text when the input changes', () => {
      fixture.componentRef.setInput('text', 'AB');
      fixture.detectChanges();
      fixture.componentRef.setInput('text', 'XY');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.textContent?.trim()).toBe('XY');
    });
  });

  describe('avatar shell', () => {
    it('renders the avatar shell component', () => {
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

    it('passes size "small" to the shell', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-size')).toBe('small');
    });

    it('passes size "large" to the shell', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-size')).toBe('large');
    });

    it('passes contrast "light" to the shell', () => {
      fixture.componentRef.setInput('contrast', 'light');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-contrast')).toBe('light');
    });

    it('passes contrast "variant" to the shell', () => {
      fixture.componentRef.setInput('contrast', 'variant');
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-contrast')).toBe('variant');
    });

    it('enables the progress ring when percentage > 0', () => {
      fixture.componentRef.setInput('percentage', 40);
      fixture.detectChanges();
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-ring')).toBe('');
    });

    it('does not show the progress ring when percentage is 0', () => {
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-ring')).toBeNull();
    });
  });
});
