import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarShellComponent } from './avatar-shell.component';

describe('AvatarShellComponent', () => {
  let component: AvatarShellComponent;
  let fixture: ComponentFixture<AvatarShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('data-size host binding', () => {
    it('sets data-size to "medium" by default', () => {
      const host: HTMLElement = fixture.nativeElement;
      expect(host.getAttribute('data-size')).toBe('medium');
    });

    it('reflects "small" size on the host element', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-size')).toBe('small');
    });

    it('reflects "large" size on the host element', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-size')).toBe('large');
    });
  });

  describe('data-contrast host binding', () => {
    it('sets data-contrast to "dark" by default', () => {
      expect(fixture.nativeElement.getAttribute('data-contrast')).toBe('dark');
    });

    it('reflects "light" contrast on the host element', () => {
      fixture.componentRef.setInput('contrast', 'light');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-contrast')).toBe('light');
    });

    it('reflects "variant" contrast on the host element', () => {
      fixture.componentRef.setInput('contrast', 'variant');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-contrast')).toBe('variant');
    });

    it('reflects "on-brand" contrast on the host element', () => {
      fixture.componentRef.setInput('contrast', 'on-brand');
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-contrast')).toBe('on-brand');
    });
  });

  describe('data-surface host binding', () => {
    it('sets data-surface to "filled" by default', () => {
      expect(fixture.nativeElement.getAttribute('data-surface')).toBe('filled');
    });

    it('sets data-surface to "transparent" when transparent=true', () => {
      fixture.componentRef.setInput('transparent', true);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-surface')).toBe('transparent');
    });

    it('reverts data-surface to "filled" when transparent is set back to false', () => {
      fixture.componentRef.setInput('transparent', true);
      fixture.detectChanges();
      fixture.componentRef.setInput('transparent', false);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-surface')).toBe('filled');
    });
  });

  describe('data-ring host binding', () => {
    it('does not set data-ring when percentage is 0 (default)', () => {
      expect(fixture.nativeElement.getAttribute('data-ring')).toBeNull();
    });

    it('sets data-ring to empty string when percentage > 0', () => {
      fixture.componentRef.setInput('percentage', 50);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-ring')).toBe('');
    });

    it('removes data-ring when percentage returns to 0', () => {
      fixture.componentRef.setInput('percentage', 50);
      fixture.detectChanges();
      fixture.componentRef.setInput('percentage', 0);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-ring')).toBeNull();
    });
  });

  describe('progress clamping', () => {
    it('clamps percentage above 100 to 100', () => {
      fixture.componentRef.setInput('percentage', 150);
      fixture.detectChanges();
      const div: HTMLElement = fixture.nativeElement.querySelector('.avatar');
      expect(div.style.getPropertyValue('--kit-avatar-progress')).toBe('100%');
    });

    it('clamps percentage below 0 to 0', () => {
      fixture.componentRef.setInput('percentage', -10);
      fixture.detectChanges();
      const div: HTMLElement = fixture.nativeElement.querySelector('.avatar');
      expect(div.style.getPropertyValue('--kit-avatar-progress')).toBe('0%');
    });

    it('sets --kit-avatar-progress CSS variable to the percentage value', () => {
      fixture.componentRef.setInput('percentage', 75);
      fixture.detectChanges();
      const div: HTMLElement = fixture.nativeElement.querySelector('.avatar');
      expect(div.style.getPropertyValue('--kit-avatar-progress')).toBe('75%');
    });

    it('data-ring is absent when percentage is clamped to 0', () => {
      fixture.componentRef.setInput('percentage', -5);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-ring')).toBeNull();
    });

    it('data-ring is present when percentage is clamped to 100', () => {
      fixture.componentRef.setInput('percentage', 200);
      fixture.detectChanges();
      expect(fixture.nativeElement.getAttribute('data-ring')).toBe('');
    });
  });

  describe('template structure', () => {
    it('renders the .avatar wrapper div', () => {
      const div: HTMLElement = fixture.nativeElement.querySelector('.avatar');
      expect(div).not.toBeNull();
    });

    it('renders the .avatar__content span inside the wrapper', () => {
      const span: HTMLElement = fixture.nativeElement.querySelector('.avatar .avatar__content');
      expect(span).not.toBeNull();
    });
  });
});
