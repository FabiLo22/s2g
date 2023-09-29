import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMainComponent } from './editor-main.component';

describe('EditorMainComponent', () => {
  let component: EditorMainComponent;
  let fixture: ComponentFixture<EditorMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorMainComponent]
    });
    fixture = TestBed.createComponent(EditorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
