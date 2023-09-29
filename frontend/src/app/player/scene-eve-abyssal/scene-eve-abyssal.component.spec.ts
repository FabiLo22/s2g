import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEveAbyssalComponent } from './scene-eve-abyssal.component';

describe('SceneEveAbyssalComponent', () => {
  let component: SceneEveAbyssalComponent;
  let fixture: ComponentFixture<SceneEveAbyssalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneEveAbyssalComponent]
    });
    fixture = TestBed.createComponent(SceneEveAbyssalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
