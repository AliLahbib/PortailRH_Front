import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeMutationComponent } from './list-demande-mutation.component';

describe('ListDemandeMutationComponent', () => {
  let component: ListDemandeMutationComponent;
  let fixture: ComponentFixture<ListDemandeMutationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandeMutationComponent]
    });
    fixture = TestBed.createComponent(ListDemandeMutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
