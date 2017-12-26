import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmmComponent } from './dmm.component';

describe('DmmComponent', () => {
  let component: DmmComponent;
  let fixture: ComponentFixture<DmmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
