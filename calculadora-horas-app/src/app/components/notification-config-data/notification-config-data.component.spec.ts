import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigDataComponent } from './notification-config-data.component';

describe('NotificationConfigDataComponent', () => {
  let component: NotificationConfigDataComponent;
  let fixture: ComponentFixture<NotificationConfigDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationConfigDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationConfigDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
