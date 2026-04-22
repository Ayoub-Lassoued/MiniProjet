import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParNom } from './recherche-par-nom';

describe('RechercheParNom', () => {
  let component: RechercheParNom;
  let fixture: ComponentFixture<RechercheParNom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheParNom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParNom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
