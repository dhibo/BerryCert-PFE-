import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentLogsComponent } from './document-logs.component';

describe('DocumentLogsComponent', () => {
  let component: DocumentLogsComponent;
  let fixture: ComponentFixture<DocumentLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
