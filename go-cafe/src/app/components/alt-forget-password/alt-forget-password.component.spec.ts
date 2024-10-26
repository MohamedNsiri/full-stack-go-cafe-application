import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltForgetPasswordComponent } from './alt-forget-password.component';

describe('AltForgetPasswordComponent', () => {
  let component: AltForgetPasswordComponent;
  let fixture: ComponentFixture<AltForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltForgetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
