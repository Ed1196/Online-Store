import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditItemsComponent } from './admin-edit-items.component';

describe('AdminEditItemsComponent', () => {
  let component: AdminEditItemsComponent;
  let fixture: ComponentFixture<AdminEditItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
