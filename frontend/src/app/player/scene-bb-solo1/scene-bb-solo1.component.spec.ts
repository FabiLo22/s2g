import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneBbSolo1Component } from './scene-bb-solo1.component';

describe('SceneBbSolo1Component', () => {
  let component: SceneBbSolo1Component;
  let fixture: ComponentFixture<SceneBbSolo1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceneBbSolo1Component]
    });
    fixture = TestBed.createComponent(SceneBbSolo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
