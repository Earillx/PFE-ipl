import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemsManagerComponent } from './problems-manager.component';

describe('ProblemsManagerComponent', () => {
  let component: ProblemsManagerComponent;
  let fixture: ComponentFixture<ProblemsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
