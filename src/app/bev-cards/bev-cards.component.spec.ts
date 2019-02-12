import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BevCardsComponent } from './bev-cards.component';

describe('BevCardsComponent', () => {
  let component: BevCardsComponent;
  let fixture: ComponentFixture<BevCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BevCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BevCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
