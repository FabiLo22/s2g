import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbyssalComponent } from './abyssal.component';

describe('AbyssalComponent', () => {
  let component: AbyssalComponent;
  let fixture: ComponentFixture<AbyssalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbyssalComponent]
    });
    fixture = TestBed.createComponent(AbyssalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
