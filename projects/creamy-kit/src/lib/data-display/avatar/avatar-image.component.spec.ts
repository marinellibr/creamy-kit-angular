import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarImageComponent } from './avatar-image.component';

describe('AvatarImageComponent', () => {
  let component: AvatarImageComponent;
  let fixture: ComponentFixture<AvatarImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('img src and alt', () => {
    it('renders an img element inside the avatar shell', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img).not.toBeNull();
    });

    it('sets the src attribute from the src input', () => {
      fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
    });

    it('sets the alt attribute from the alt input', () => {
      fixture.componentRef.setInput('alt', 'Luiz');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('alt')).toBe('Luiz');
    });

    it('defaults src to empty string', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('src')).toBe('');
    });

    it('defaults alt to empty string', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('alt')).toBe('');
    });

    it('updates src when the input changes', () => {
      fixture.componentRef.setInput('src', 'photo-v1.jpg');
      fixture.detectChanges();
      fixture.componentRef.setInput('src', 'photo-v2.jpg');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('src')).toBe('photo-v2.jpg');
    });
  });

  describe('avatar shell', () => {
    it('renders the avatar shell component', () => {
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell).not.toBeNull();
    });

    it('sets data-surface to "transparent" on the shell', () => {
      const shell: HTMLElement = fixture.nativeElement.querySelector('creamy-kit-avatar-shell');
      expect(shell.getAttribute('data-surface')).toBe('transparent');
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

    it('enables the progress ring when percentage > 0', () => {
      fixture.componentRef.setInput('percentage', 80);
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
