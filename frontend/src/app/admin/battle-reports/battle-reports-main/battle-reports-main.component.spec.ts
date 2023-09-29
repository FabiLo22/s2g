import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleReportsMainComponent } from './battle-reports-main.component';

describe('BattleReportsMainComponent', () => {
  let component: BattleReportsMainComponent;
  let fixture: ComponentFixture<BattleReportsMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleReportsMainComponent]
    });
    fixture = TestBed.createComponent(BattleReportsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
