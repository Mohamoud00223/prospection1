import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProspectComponent } from './ajout-prospect.component';

describe('AjoutProspectComponent', () => {
  let component: AjoutProspectComponent;
  let fixture: ComponentFixture<AjoutProspectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutProspectComponent]
    });
    fixture = TestBed.createComponent(AjoutProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
