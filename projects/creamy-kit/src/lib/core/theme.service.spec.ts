import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    (ThemeService as unknown as { initialized: boolean }).initialized = false;
    document.getElementById('creamy-theme')?.remove();
  });

  it('should be created', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('injects the creamy-theme style element into document head', () => {
    TestBed.configureTestingModule({});
    TestBed.inject(ThemeService);
    const el = document.getElementById('creamy-theme');
    expect(el).toBeTruthy();
    expect(el?.tagName).toBe('STYLE');
  });

  it('includes primary-base token in injected style', () => {
    TestBed.configureTestingModule({});
    TestBed.inject(ThemeService);
    const el = document.getElementById('creamy-theme') as HTMLStyleElement;
    expect(el.textContent).toContain('--primary-base');
    expect(el.textContent).toContain('--white');
    expect(el.textContent).toContain('--black');
  });

  it('does not create duplicate style when initialized flag is already true', () => {
    (ThemeService as unknown as { initialized: boolean }).initialized = true;
    TestBed.configureTestingModule({});
    TestBed.inject(ThemeService);
    const els = document.querySelectorAll('#creamy-theme');
    expect(els.length).toBe(0);
  });

  it('does not create duplicate style when element already exists in DOM', () => {
    const existing = document.createElement('style');
    existing.id = 'creamy-theme';
    document.head.appendChild(existing);

    TestBed.configureTestingModule({});
    TestBed.inject(ThemeService);
    const els = document.querySelectorAll('#creamy-theme');
    expect(els.length).toBe(1);
    existing.remove();
  });
});
