import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDemandeMutationComponent } from './edit-demande-mutation.component';

describe('EditDemandeMutationComponent', () => {
  let component: EditDemandeMutationComponent;
  let fixture: ComponentFixture<EditDemandeMutationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDemandeMutationComponent]
    });
    fixture = TestBed.createComponent(EditDemandeMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
