import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeFormationComponent } from './list-demande-formation.component';

describe('ListDemandeFormationComponent', () => {
  let component: ListDemandeFormationComponent;
  let fixture: ComponentFixture<ListDemandeFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandeFormationComponent]
    });
    fixture = TestBed.createComponent(ListDemandeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
