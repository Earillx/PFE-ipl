import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinePreviewComponent } from './machine-preview.component';

describe('MachinePreviewComponent', () => {
  let component: MachinePreviewComponent;
  let fixture: ComponentFixture<MachinePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
