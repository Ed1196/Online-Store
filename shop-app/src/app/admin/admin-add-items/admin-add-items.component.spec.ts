import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddItemsComponent } from './admin-add-items.component';

describe('AdminAddItemsComponent', () => {
  let component: AdminAddItemsComponent;
  let fixture: ComponentFixture<AdminAddItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
