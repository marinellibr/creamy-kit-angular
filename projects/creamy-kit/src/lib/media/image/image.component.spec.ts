import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
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

    it('reflects a custom size on the host element', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement;
      expect(host.getAttribute('data-size')).toBe('large');
    });

    it('reflects "small" size on the host element', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement;
      expect(host.getAttribute('data-size')).toBe('small');
    });
  });

  describe('data-error host binding', () => {
    it('does not set data-error when not errored', () => {
      const host: HTMLElement = fixture.nativeElement;
      expect(host.getAttribute('data-error')).toBeNull();
    });

    it('sets data-error to empty string after onError is called', () => {
      fixture.componentRef.setInput('path', 'broken.jpg');
      fixture.detectChanges();

      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      img.dispatchEvent(new Event('error'));
      fixture.detectChanges();

      const host: HTMLElement = fixture.nativeElement;
      expect(host.getAttribute('data-error')).toBe('');
    });
  });

  describe('image rendering', () => {
    it('renders the img element when path is set', () => {
      fixture.componentRef.setInput('path', 'photo.jpg');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img).not.toBeNull();
      expect(img.getAttribute('src')).toBe('photo.jpg');
    });

    it('does not render img when path is empty', () => {
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img).toBeNull();
    });

    it('sets the alt attribute on the img element', () => {
      fixture.componentRef.setInput('path', 'photo.jpg');
      fixture.componentRef.setInput('alt', 'A photo');
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.getAttribute('alt')).toBe('A photo');
    });

    it('hides the img after an error event', () => {
      fixture.componentRef.setInput('path', 'broken.jpg');
      fixture.detectChanges();

      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      img.dispatchEvent(new Event('error'));
      fixture.detectChanges();

      const imgAfterError: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(imgAfterError).toBeNull();
    });
  });
});
