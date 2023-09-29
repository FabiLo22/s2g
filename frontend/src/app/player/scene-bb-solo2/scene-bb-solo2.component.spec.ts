import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneBbSolo2Component } from './scene-bb-solo2.component';

describe('SceneBbSolo2Component', () => {
  let component: SceneBbSolo2Component;
  let fixture: ComponentFixture<SceneBbSolo2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneBbSolo2Component]
    });
    fixture = TestBed.createComponent(SceneBbSolo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
