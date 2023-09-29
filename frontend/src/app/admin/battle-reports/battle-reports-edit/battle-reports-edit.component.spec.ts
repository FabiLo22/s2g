import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleReportsEditComponent } from './battle-reports-edit.component';

describe('BattleReportsEditComponent', () => {
  let component: BattleReportsEditComponent;
  let fixture: ComponentFixture<BattleReportsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleReportsEditComponent]
    });
    fixture = TestBed.createComponent(BattleReportsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
