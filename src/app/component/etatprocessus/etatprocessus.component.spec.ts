import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatprocessusComponent } from './etatprocessus.component';

describe('EtatprocessusComponent', () => {
  let component: EtatprocessusComponent;
  let fixture: ComponentFixture<EtatprocessusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatprocessusComponent]
    });
    fixture = TestBed.createComponent(EtatprocessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
