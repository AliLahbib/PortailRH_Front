import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeDocumentComponent } from './list-demande-document.component';

describe('ListDemandeDocumentComponent', () => {
  let component: ListDemandeDocumentComponent;
  let fixture: ComponentFixture<ListDemandeDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandeDocumentComponent]
    });
    fixture = TestBed.createComponent(ListDemandeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
