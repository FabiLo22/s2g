import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEveFittingComponent } from './scene-eve-fitting.component';

describe('SceneEveFittingComponent', () => {
  let component: SceneEveFittingComponent;
  let fixture: ComponentFixture<SceneEveFittingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneEveFittingComponent]
    });
    fixture = TestBed.createComponent(SceneEveFittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
