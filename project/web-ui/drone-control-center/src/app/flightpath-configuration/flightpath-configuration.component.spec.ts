import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightpathConfigurationComponent } from './flightpath-configuration.component';

describe('FlightpathConfigurationComponent', () => {
  let component: FlightpathConfigurationComponent;
  let fixture: ComponentFixture<FlightpathConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightpathConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightpathConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
