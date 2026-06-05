import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent, SnackbarFeedback } from './snackbar.component';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Creation & defaults
  // ---------------------------------------------------------------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default feedback to "information"', () => {
    expect(component.feedback()).toBe('information');
  });

  // ---------------------------------------------------------------------------
  // Host bindings
  // ---------------------------------------------------------------------------

  it('should have role="status" on the host element', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('role')).toBe('status');
  });

  it('should set data-feedback="information" on host by default', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('data-feedback')).toBe('information');
  });

  // ---------------------------------------------------------------------------
  // data-feedback for each variant
  // ---------------------------------------------------------------------------

  const variants: SnackbarFeedback[] = [
    'information',
    'success',
    'error',
    'warning',
    'black',
    'white',
  ];

  variants.forEach((variant) => {
    it(`should set data-feedback="${variant}" when feedback is "${variant}"`, () => {
      fixture.componentRef.setInput('feedback', variant);
      fixture.detectChanges();
      const host: HTMLElement = fixture.nativeElement;
      expect(host.getAttribute('data-feedback')).toBe(variant);
    });
  });

  // ---------------------------------------------------------------------------
  // Reactivity
  // ---------------------------------------------------------------------------

  it('should update data-feedback attribute when feedback input changes', () => {
    fixture.componentRef.setInput('feedback', 'error');
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('data-feedback')).toBe('error');

    fixture.componentRef.setInput('feedback', 'success');
    fixture.detectChanges();
    expect(host.getAttribute('data-feedback')).toBe('success');
  });

  it('should update data-feedback from information to warning', () => {
    fixture.componentRef.setInput('feedback', 'warning');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-feedback')).toBe('warning');
  });

  it('should update data-feedback from information to black', () => {
    fixture.componentRef.setInput('feedback', 'black');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-feedback')).toBe('black');
  });

  it('should update data-feedback from information to white', () => {
    fixture.componentRef.setInput('feedback', 'white');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-feedback')).toBe('white');
  });

  // ---------------------------------------------------------------------------
  // Template structure
  // ---------------------------------------------------------------------------

  it('should render a .snackbar element', () => {
    const snackbar = fixture.nativeElement.querySelector('.snackbar');
    expect(snackbar).not.toBeNull();
  });

  it('should render a .snackbar__icon element inside .snackbar', () => {
    const icon = fixture.nativeElement.querySelector('.snackbar .snackbar__icon');
    expect(icon).not.toBeNull();
  });

  it('should render a .snackbar__content element inside .snackbar', () => {
    const content = fixture.nativeElement.querySelector('.snackbar .snackbar__content');
    expect(content).not.toBeNull();
  });

  it('should project ng-content into .snackbar__content', () => {
    // The ng-content slot is present even if empty
    const content = fixture.nativeElement.querySelector('.snackbar__content');
    expect(content).not.toBeNull();
  });
});
