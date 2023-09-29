import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneBbMulticam2Component } from './scene-bb-multicam2.component';

describe('SceneBbMulticam2Component', () => {
  let component: SceneBbMulticam2Component;
  let fixture: ComponentFixture<SceneBbMulticam2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneBbMulticam2Component]
    });
    fixture = TestBed.createComponent(SceneBbMulticam2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
