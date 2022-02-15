import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorInfoDialogComponent } from './author-info-dialog/author-info-dialog.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  constructor(private dialog: MatDialog) {}

  iconClicked() {
    this.dialog.open(AuthorInfoDialogComponent);
  }
}
