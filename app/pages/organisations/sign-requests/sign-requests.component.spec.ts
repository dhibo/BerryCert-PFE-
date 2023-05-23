import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignRequestsComponent } from './sign-requests.component';

describe('SignRequestsComponent', () => {
  let component: SignRequestsComponent;
  let fixture: ComponentFixture<SignRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
