import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTagComponent } from './banner-tag.component';

describe('BannerTagComponent', () => {
  let component: BannerTagComponent;
  let fixture: ComponentFixture<BannerTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerTagComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
