import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DisplayPanelComponent } from './display-panel/display-panel.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DisplayPanelComponent,
      },
      {
        path: 'add',
        component: DisplayPanelComponent,
      },
      {
        path: ':id',
        component: DisplayPanelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
