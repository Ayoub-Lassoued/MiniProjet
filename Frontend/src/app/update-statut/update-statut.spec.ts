import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatut } from './update-statut';

describe('UpdateStatut', () => {
  let component: UpdateStatut;
  let fixture: ComponentFixture<UpdateStatut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStatut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStatut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
