import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDocumentsComponent } from './public-documents.component';

describe('PublicDocumentsComponent', () => {
  let component: PublicDocumentsComponent;
  let fixture: ComponentFixture<PublicDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
