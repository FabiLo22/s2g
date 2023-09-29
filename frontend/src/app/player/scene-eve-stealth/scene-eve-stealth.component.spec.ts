import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEveStealthComponent } from './scene-eve-stealth.component';

describe('SceneEveStealthComponent', () => {
  let component: SceneEveStealthComponent;
  let fixture: ComponentFixture<SceneEveStealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneEveStealthComponent]
    });
    fixture = TestBed.createComponent(SceneEveStealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
