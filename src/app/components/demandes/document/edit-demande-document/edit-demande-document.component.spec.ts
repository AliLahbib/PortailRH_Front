import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemandeDocumentComponent } from './edit-demande-document.component';

describe('EditDemandeDocumentComponent', () => {
  let component: EditDemandeDocumentComponent;
  let fixture: ComponentFixture<EditDemandeDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDemandeDocumentComponent]
    });
    fixture = TestBed.createComponent(EditDemandeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
