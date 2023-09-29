import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEveBaitComponent } from './scene-eve-bait.component';

describe('SceneEveBaitComponent', () => {
  let component: SceneEveBaitComponent;
  let fixture: ComponentFixture<SceneEveBaitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneEveBaitComponent]
    });
    fixture = TestBed.createComponent(SceneEveBaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
