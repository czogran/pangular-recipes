import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DeleteDialogDataInterface,
  Recipe,
} from '../../common/interfaces/interfaces';
import { HttpService } from '../../common/services/http.service';
import { StateService } from '../../common/services/state.service';
import { deepClone, isEmptyString } from '../../common/utils/utils';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'list';

  recipesToDisplay: Recipe[] = [];
  recipes: Recipe[] = [];

  searchQuery: string = '';

  stateSubscription: Subscription;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private stateService: StateService
  ) {
    this.stateSubscription = stateService.stateEvent.subscribe(() => {
      this.getRecipes();
    });
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  private getRecipes() {
    this.httpService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes || [];
      if (isEmptyString(this.searchQuery)) {
        this.search();
      } else {
        this.recipesToDisplay = deepClone(recipes);
      }
    });
  }

  deleteIconClicked(recipe: Recipe) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { name: recipe.name } as DeleteDialogDataInterface,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.httpService.deleteRecipe(recipe._id).subscribe(() => {
        this.getRecipes();
        this.stateService.deleteEvent.next(result._id);
      });
    });
  }

  onAddClicked() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  nameClicked(id: string) {
    this.router.navigate([`./${id}`], { relativeTo: this.route });
  }

  editButtonClicked(id: string) {
    this.router.navigate([`./${id}`], {
      queryParams: { edit: 'true' },
      relativeTo: this.route,
    });
  }

  identify(index: number, recipe: Recipe) {
    return recipe._id;
  }

  search() {
    if (isEmptyString(this.searchQuery)) {
      this.recipesToDisplay = deepClone(this.recipes);
      return;
    }

    const searchQuery = this.searchQuery.toLowerCase();
    this.recipesToDisplay = this.recipes.filter(
      (recipe) =>
        recipe.name?.toLowerCase().includes(searchQuery) ||
        recipe.ingredients?.some((ingredient) =>
          ingredient.name?.toLowerCase().includes(searchQuery)
        )
    );
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
}
