import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemandeFormationComponent } from './edit-demande-formation.component';

describe('EditDemandeFormationComponent', () => {
  let component: EditDemandeFormationComponent;
  let fixture: ComponentFixture<EditDemandeFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDemandeFormationComponent]
    });
    fixture = TestBed.createComponent(EditDemandeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
