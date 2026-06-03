import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLargeTitleComponent } from './header-large-title.component';

describe('HeaderLargeTitleComponent', () => {
  let component: HeaderLargeTitleComponent;
  let fixture: ComponentFixture<HeaderLargeTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLargeTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderLargeTitleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
