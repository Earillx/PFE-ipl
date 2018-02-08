import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpscanGeneratorComponent } from './ipscan-generator.component';

describe('IpscanGeneratorComponent', () => {
  let component: IpscanGeneratorComponent;
  let fixture: ComponentFixture<IpscanGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpscanGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpscanGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
