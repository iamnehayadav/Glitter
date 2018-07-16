import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsearchComponent } from './psearch.component';

describe('PsearchComponent', () => {
  let component: PsearchComponent;
  let fixture: ComponentFixture<PsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
