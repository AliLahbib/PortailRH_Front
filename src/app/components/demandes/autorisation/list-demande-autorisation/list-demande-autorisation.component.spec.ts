import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeAutorisationComponent } from './list-demande-autorisation.component';

describe('ListDemandeAutorisationComponent', () => {
  let component: ListDemandeAutorisationComponent;
  let fixture: ComponentFixture<ListDemandeAutorisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandeAutorisationComponent]
    });
    fixture = TestBed.createComponent(ListDemandeAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
