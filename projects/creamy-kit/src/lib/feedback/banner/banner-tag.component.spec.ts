import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { BannerTagComponent } from './banner-tag.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BannerTagComponent', () => {
  let component: BannerTagComponent;
  let fixture: ComponentFixture<BannerTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerTagComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders tagValue in .banner__tag-value', () => {
    fixture.componentRef.setInput('tagValue', 'R$ 12,90');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.banner__tag-value');
    expect(el).toBeTruthy();
    expect(el.textContent?.trim()).toBe('R$ 12,90');
  });

  it('renders tagLabel in .banner__tag-label', () => {
    fixture.componentRef.setInput('tagLabel', 'saldo');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.banner__tag-label');
    expect(el).toBeTruthy();
    expect(el.textContent?.trim()).toBe('saldo');
  });

  it('renders both tagValue and tagLabel inside .banner__tag', () => {
    fixture.componentRef.setInput('tagValue', '10%');
    fixture.componentRef.setInput('tagLabel', 'cashback');
    fixture.detectChanges();
    const container: HTMLElement = fixture.nativeElement.querySelector('.banner__tag');
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('10%');
    expect(container.textContent).toContain('cashback');
  });

  it('inherits title from BannerBase and passes it to shell', () => {
    fixture.componentRef.setInput('title', 'Cashback');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('strong.banner__title');
    expect(el).toBeTruthy();
    expect(el.textContent?.trim()).toBe('Cashback');
  });
});
