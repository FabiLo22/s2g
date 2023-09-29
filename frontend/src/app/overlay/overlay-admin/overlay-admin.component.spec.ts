import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayAdminComponent } from './overlay-admin.component';

describe('OverlayAdminComponent', () => {
  let component: OverlayAdminComponent;
  let fixture: ComponentFixture<OverlayAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
