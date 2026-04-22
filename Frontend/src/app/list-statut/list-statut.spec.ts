import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStatut } from './list-statut';

describe('ListStatut', () => {
  let component: ListStatut;
  let fixture: ComponentFixture<ListStatut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStatut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStatut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
