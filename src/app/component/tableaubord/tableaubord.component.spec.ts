import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableaubordComponent } from './tableaubord.component';

describe('TableaubordComponent', () => {
  let component: TableaubordComponent;
  let fixture: ComponentFixture<TableaubordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableaubordComponent]
    });
    fixture = TestBed.createComponent(TableaubordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
