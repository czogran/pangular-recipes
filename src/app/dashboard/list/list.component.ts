import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DeleteDialogComponent,
  DeleteDialogDataInterface,
} from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: { class: 'list' },
})
export class ListComponent {
  recipes: any[] = [
    { _id: 1, name: 'recipe 1' },
    { _id: 2, name: 'recipe 2' },
    { _id: 3, name: 'recipe 3' },
    { _id: 4, name: 'recipe 4' },
    { _id: 5, name: 'recipe 5' },
    { _id: 6, name: 'recipe 6' },
  ];
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  deleteIconClicked(recipe: { name: string; _id: number }) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { name: recipe.name } as DeleteDialogDataInterface,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  onAddClicked() {
    console.log('onAddClicked');
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  nameClicked(id: string) {
    console.log('nameClicked');
    console.log(id);
    this.router.navigate([`./${id}`], { relativeTo: this.route });
  }
}
