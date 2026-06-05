import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
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

  it('should default title to empty string', () => {
    expect(component.title()).toBe('');
  });

  it('should default linkText to empty string', () => {
    expect(component.linkText()).toBe('');
  });

  it('should default linkHref to empty string', () => {
    expect(component.linkHref()).toBe('');
  });

  it('should not be dismissed by default', () => {
    expect((component as any).dismissed()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Host bindings
  // ---------------------------------------------------------------------------

  it('should set data-feedback attribute on host', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('data-feedback')).toBe('information');
  });

  it('should update data-feedback attribute when feedback input changes', () => {
    fixture.componentRef.setInput('feedback', 'success');
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('data-feedback')).toBe('success');
  });

  it('should set data-feedback="error" when feedback is "error"', () => {
    fixture.componentRef.setInput('feedback', 'error');
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('data-feedback')).toBe('error');
  });

  it('should set data-feedback="success" when feedback is "success"', () => {
    fixture.componentRef.setInput('feedback', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-feedback')).toBe('success');
  });

  // ---------------------------------------------------------------------------
  // Alert visibility
  // ---------------------------------------------------------------------------

  it('should show the alert div when not dismissed', () => {
    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert).not.toBeNull();
  });

  it('dismiss() should set dismissed to true', () => {
    (component as any).dismiss();
    expect((component as any).dismissed()).toBe(true);
  });

  it('dismiss() should remove the alert from the DOM', () => {
    (component as any).dismiss();
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert).toBeNull();
  });

  it('clicking the close button should call dismiss()', () => {
    const dismissSpy = jest.spyOn(component as any, 'dismiss');
    const closeBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.alert__close');
    closeBtn.click();
    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });

  it('clicking the close button should hide the alert', () => {
    const closeBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.alert__close');
    closeBtn.click();
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert).toBeNull();
  });

  it('alert is not re-shown after being dismissed', () => {
    (component as any).dismiss();
    fixture.detectChanges();
    // dismissed signal stays true — no re-render should show it
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert')).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // closed output
  // ---------------------------------------------------------------------------

  it('dismiss() should emit the closed output', () => {
    const emitSpy = jest.spyOn(component.closed, 'emit');
    (component as any).dismiss();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('clicking the close button should emit closed output', () => {
    const emitSpy = jest.spyOn(component.closed, 'emit');
    const closeBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.alert__close');
    closeBtn.click();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('dismiss() should not emit closed more than once per call', () => {
    const emitSpy = jest.spyOn(component.closed, 'emit');
    (component as any).dismiss();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // Title
  // ---------------------------------------------------------------------------

  it('should not render .alert__title when title is empty', () => {
    const title = fixture.nativeElement.querySelector('.alert__title');
    expect(title).toBeNull();
  });

  it('should render .alert__title when title is set', () => {
    fixture.componentRef.setInput('title', 'Something went wrong');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.alert__title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('Something went wrong');
  });

  it('should update .alert__title text when title input changes', () => {
    fixture.componentRef.setInput('title', 'First title');
    fixture.detectChanges();
    fixture.componentRef.setInput('title', 'Updated title');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.alert__title');
    expect(title.textContent.trim()).toBe('Updated title');
  });

  // ---------------------------------------------------------------------------
  // Link
  // ---------------------------------------------------------------------------

  it('should not render .alert__link when linkHref is empty', () => {
    const link = fixture.nativeElement.querySelector('.alert__link');
    expect(link).toBeNull();
  });

  it('should render .alert__link when linkHref is set', () => {
    fixture.componentRef.setInput('linkHref', '/orders/123');
    fixture.detectChanges();
    const link: HTMLAnchorElement =
      fixture.nativeElement.querySelector('.alert__link');
    expect(link).not.toBeNull();
  });

  it('should set href on .alert__link', () => {
    fixture.componentRef.setInput('linkHref', '/orders/123');
    fixture.detectChanges();
    const link: HTMLAnchorElement =
      fixture.nativeElement.querySelector('.alert__link');
    expect(link.getAttribute('href')).toBe('/orders/123');
  });

  it('should display linkText when both linkHref and linkText are set', () => {
    fixture.componentRef.setInput('linkHref', '/orders/123');
    fixture.componentRef.setInput('linkText', 'View order');
    fixture.detectChanges();
    const link: HTMLAnchorElement =
      fixture.nativeElement.querySelector('.alert__link');
    expect(link.textContent.trim()).toBe('View order');
  });

  it('should fall back to linkHref as link text when linkText is empty', () => {
    fixture.componentRef.setInput('linkHref', '/orders/123');
    fixture.detectChanges();
    const link: HTMLAnchorElement =
      fixture.nativeElement.querySelector('.alert__link');
    expect(link.textContent.trim()).toBe('/orders/123');
  });

  it('should hide the link when linkHref is cleared', () => {
    fixture.componentRef.setInput('linkHref', '/orders/123');
    fixture.detectChanges();
    fixture.componentRef.setInput('linkHref', '');
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('.alert__link');
    expect(link).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // Alert structure
  // ---------------------------------------------------------------------------

  it('should render .alert__close button inside the alert', () => {
    const closeBtn = fixture.nativeElement.querySelector('.alert__close');
    expect(closeBtn).not.toBeNull();
  });

  it('close button should be of type "button"', () => {
    const closeBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.alert__close');
    expect(closeBtn.type).toBe('button');
  });

  it('should have .alert__body inside the alert', () => {
    const body = fixture.nativeElement.querySelector('.alert__body');
    expect(body).not.toBeNull();
  });

  it('should have .alert__icon element inside the alert', () => {
    const icon = fixture.nativeElement.querySelector('.alert__icon');
    expect(icon).not.toBeNull();
  });

  it('should have .alert__content element inside .alert__body', () => {
    const content = fixture.nativeElement.querySelector('.alert__body .alert__content');
    expect(content).not.toBeNull();
  });
});
