import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarShellComponent } from './avatar-shell.component';

describe('AvatarShellComponent', () => {
  let component: AvatarShellComponent;
  let fixture: ComponentFixture<AvatarShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarShellComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
