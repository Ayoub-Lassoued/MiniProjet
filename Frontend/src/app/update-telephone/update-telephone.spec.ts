import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTelephone } from './update-telephone';

describe('UpdateTelephone', () => {
  let component: UpdateTelephone;
  let fixture: ComponentFixture<UpdateTelephone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTelephone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTelephone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
