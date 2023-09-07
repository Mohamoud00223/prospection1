import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheractiviteComponent } from './afficheractivite.component';

describe('AfficheractiviteComponent', () => {
  let component: AfficheractiviteComponent;
  let fixture: ComponentFixture<AfficheractiviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficheractiviteComponent]
    });
    fixture = TestBed.createComponent(AfficheractiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
