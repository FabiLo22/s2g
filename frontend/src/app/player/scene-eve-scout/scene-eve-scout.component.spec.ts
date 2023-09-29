import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEveScoutComponent } from './scene-eve-scout.component';

describe('SceneEveScoutComponent', () => {
  let component: SceneEveScoutComponent;
  let fixture: ComponentFixture<SceneEveScoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneEveScoutComponent]
    });
    fixture = TestBed.createComponent(SceneEveScoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
