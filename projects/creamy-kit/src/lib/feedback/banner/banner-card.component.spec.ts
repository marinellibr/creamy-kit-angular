import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CREAMY_KIT_RESOURCES } from '../../core/resources';
import { BannerCardComponent } from './banner-card.component';

const TEST_RESOURCES = {
  provide: CREAMY_KIT_RESOURCES,
  useValue: { iconsBaseUrl: '/test-icons', brandsBaseUrl: '/test-brands' },
};

describe('BannerCardComponent', () => {
  let component: BannerCardComponent;
  let fixture: ComponentFixture<BannerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCardComponent],
      providers: [TEST_RESOURCES],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not render trailing icon when trailingIconName is empty', () => {
    fixture.componentRef.setInput('trailingIconName', '');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.banner__trailing');
    expect(el).toBeNull();
  });

  it('renders trailing icon when trailingIconName is set', () => {
    fixture.componentRef.setInput('trailingIconName', 'arrow_right');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.banner__trailing');
    expect(el).toBeTruthy();
  });

  it('renders title via shell', () => {
    fixture.componentRef.setInput('title', 'Configurações');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('strong.banner__title');
    expect(el).toBeTruthy();
    expect(el.textContent?.trim()).toBe('Configurações');
  });
});
