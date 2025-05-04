import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemandeAutorisationComponent } from './edit-demande-autorisation.component';

describe('EditDemandeAutorisationComponent', () => {
  let component: EditDemandeAutorisationComponent;
  let fixture: ComponentFixture<EditDemandeAutorisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDemandeAutorisationComponent]
    });
    fixture = TestBed.createComponent(EditDemandeAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
