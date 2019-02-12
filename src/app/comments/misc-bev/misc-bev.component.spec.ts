import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscBevComponent } from './misc-bev.component';

describe('MiscBevComponent', () => {
  let component: MiscBevComponent;
  let fixture: ComponentFixture<MiscBevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscBevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscBevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
