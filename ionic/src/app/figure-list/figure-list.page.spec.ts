import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureListPage } from './figure-list.page';

describe('FigureListPage', () => {
  let component: FigureListPage;
  let fixture: ComponentFixture<FigureListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FigureListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
