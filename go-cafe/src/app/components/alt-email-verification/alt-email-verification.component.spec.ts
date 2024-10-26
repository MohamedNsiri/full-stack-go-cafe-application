import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltEmailVerificationComponent } from './alt-email-verification.component';

describe('AltEmailVerificationComponent', () => {
  let component: AltEmailVerificationComponent;
  let fixture: ComponentFixture<AltEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltEmailVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
