import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericStepComponent } from './generic-step.component';

describe('GenericStepComponent', () => {
  let component: GenericStepComponent;
  let fixture: ComponentFixture<GenericStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
