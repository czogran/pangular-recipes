import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PreparationTimePipe } from './display-panel/common/pipes/preparation-time.pipe';
import { DisplayPanelComponent } from './display-panel/display-panel.component';
import { DeleteDialogComponent } from './list/delete-dialog/delete-dialog.component';
import { ListComponent } from './list/list.component';
import { AuthorInfoDialogComponent } from './navigation-bar/author-info-dialog/author-info-dialog.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationBarComponent,
    ListComponent,
    DisplayPanelComponent,
    AuthorInfoDialogComponent,
    DeleteDialogComponent,
    PreparationTimePipe,
  ],
  imports: [
    DashboardRoutingModule,
    //
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
})
export class DashboardModule {}
