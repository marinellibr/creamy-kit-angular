import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerShellComponent } from './banner-shell.component';

describe('BannerShellComponent', () => {
  let component: BannerShellComponent;
  let fixture: ComponentFixture<BannerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerShellComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
