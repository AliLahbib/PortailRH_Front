import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemandesComponent } from './add-demandes.component';

describe('AddDemandesComponent', () => {
  let component: AddDemandesComponent;
  let fixture: ComponentFixture<AddDemandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDemandesComponent]
    });
    fixture = TestBed.createComponent(AddDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
