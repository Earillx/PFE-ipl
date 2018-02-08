import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusModifierComponent } from './status-modifier.component';

describe('StatusModifierComponent', () => {
  let component: StatusModifierComponent;
  let fixture: ComponentFixture<StatusModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
