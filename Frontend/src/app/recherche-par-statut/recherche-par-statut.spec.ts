import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParStatut } from './recherche-par-statut';

describe('RechercheParStatut', () => {
  let component: RechercheParStatut;
  let fixture: ComponentFixture<RechercheParStatut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheParStatut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParStatut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
