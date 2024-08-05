import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationConfigDataComponent } from '../../components/notification-config-data/notification-config-data.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path:'',
    component: NotificationConfigDataComponent
  }
];

@NgModule({
  declarations: [NotificationConfigDataComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule]
})
export class NotifyConfigRoutingModule { }
