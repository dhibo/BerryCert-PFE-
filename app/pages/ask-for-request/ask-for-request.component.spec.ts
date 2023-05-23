import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForRequestComponent } from './ask-for-request.component';

describe('AskForRequestComponent', () => {
  let component: AskForRequestComponent;
  let fixture: ComponentFixture<AskForRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskForRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskForRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
