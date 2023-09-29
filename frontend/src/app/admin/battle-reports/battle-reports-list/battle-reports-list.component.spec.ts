import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleReportsListComponent } from './battle-reports-list.component';

describe('BattleReportsListComponent', () => {
  let component: BattleReportsListComponent;
  let fixture: ComponentFixture<BattleReportsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleReportsListComponent]
    });
    fixture = TestBed.createComponent(BattleReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
