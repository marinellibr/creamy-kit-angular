import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarTextComponent } from './avatar-text.component';

describe('AvatarTextComponent', () => {
  let component: AvatarTextComponent;
  let fixture: ComponentFixture<AvatarTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarTextComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
