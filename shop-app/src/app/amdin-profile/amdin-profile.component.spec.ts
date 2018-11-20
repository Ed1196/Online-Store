import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdinProfileComponent } from './amdin-profile.component';

describe('AmdinProfileComponent', () => {
  let component: AmdinProfileComponent;
  let fixture: ComponentFixture<AmdinProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmdinProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmdinProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
