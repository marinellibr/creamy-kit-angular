import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { BannerComponent } from './banner.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders title via shell', () => {
    fixture.componentRef.setInput('title', 'Tudo certo!');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('strong.banner__title');
    expect(el).toBeTruthy();
    expect(el.textContent?.trim()).toBe('Tudo certo!');
  });

  it('renders the chevron trailing element', () => {
    fixture.detectChanges();
    const chevron: HTMLElement = fixture.nativeElement.querySelector('.banner__chevron');
    expect(chevron).toBeTruthy();
  });
});
