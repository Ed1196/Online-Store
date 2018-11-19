import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCartManageOrdersComponent } from './admin-cart-manage-orders.component';

describe('AdminCartManageOrdersComponent', () => {
  let component: AdminCartManageOrdersComponent;
  let fixture: ComponentFixture<AdminCartManageOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCartManageOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCartManageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
