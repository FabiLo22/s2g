import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEveFullComponent } from './scene-eve-full.component';

describe('SceneEveFullComponent', () => {
  let component: SceneEveFullComponent;
  let fixture: ComponentFixture<SceneEveFullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneEveFullComponent]
    });
    fixture = TestBed.createComponent(SceneEveFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
