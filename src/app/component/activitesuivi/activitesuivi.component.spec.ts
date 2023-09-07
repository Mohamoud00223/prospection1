import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitesuiviComponent } from './activitesuivi.component';

describe('ActivitesuiviComponent', () => {
  let component: ActivitesuiviComponent;
  let fixture: ComponentFixture<ActivitesuiviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitesuiviComponent]
    });
    fixture = TestBed.createComponent(ActivitesuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
