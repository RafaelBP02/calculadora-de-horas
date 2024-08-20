import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFrontComponent } from './notification-front.component';

describe('NotificationFrontComponent', () => {
  let component: NotificationFrontComponent;
  let fixture: ComponentFixture<NotificationFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
