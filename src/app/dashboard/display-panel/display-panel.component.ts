import { Component, HostBinding, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient, Recipe } from '../../common/interfaces/interfaces';
import { HttpService } from '../../common/services/http.service';
import { StateService } from '../../common/services/state.service';
import { isEmptyString } from '../../common/utils/utils';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.scss'],
})
export class DisplayPanelComponent implements OnDestroy {
  @HostBinding('class') classes = 'display-panel';

  recipeForm: FormGroup = new FormGroup({});

  addMode: boolean = false;

  editMode: boolean = true;

  notChosenRecipe: boolean = true;

  recipe: Recipe = { _id: '' };

  deleteSubscription: Subscription;

  private id: string = '';

  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  control(index: number) {
    return this.ingredientsArray.controls[index].get('name');
  }

  addIngredientsArray(ingredient?: Ingredient) {
    this.ingredientsArray.push(
      this.fb.group({
        name: [ingredient?.name, Validators.required],
        quantity: [ingredient?.quantity, Validators.required],
      })
    );
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private stateService: StateService
  ) {
    this.createRecipeForm();

    this.deleteSubscription = stateService.deleteEvent.subscribe((id) => {
      if (this.id === id) {
        this.goBack();
      }
    });

    this.route.params.subscribe(() => {
      this.parseParams();
    });
  }

  private parseParams() {
    const snapshot = this.route.snapshot;
    this.notChosenRecipe = snapshot.url.length === 0;
    this.addMode = snapshot?.routeConfig?.path === 'add';

    if (this.addMode) {
      this.editMode = true;
      return;
    }
    this.id = snapshot?.params['id'];
    this.editMode = snapshot?.queryParams['edit'] === 'true';

    if (!isEmptyString(this.id)) {
      this.getRecipe();
    }
  }

  private getRecipe() {
    this.httpService.getRecipe(this.id).subscribe((response) => {
      this.recipe = response || {};
      this.createRecipeForm();
      this.recipe.ingredients?.forEach((ingredient) =>
        this.addIngredientsArray(ingredient)
      );
    });
  }

  private createRecipeForm() {
    this.recipeForm = this.fb.group({
      name: [
        this.recipe.name,
        [
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required,
        ],
      ],
      preparationTimeInMinutes: [
        this.recipe.preparationTimeInMinutes,
        [Validators.required],
      ],
      description: [
        this.recipe.description,
        [
          Validators.minLength(15),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      ingredients: this.fb.array(
        [],
        [Validators.required, Validators.minLength(2)]
      ),
    });
  }

  deleteIngredientIconClicked(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  onSaveClicked() {
    if (this.addMode) {
      this.httpService
        .addRecipe(this.recipeForm.value as Recipe)
        .subscribe(() => {
          this.goBack();
          this.stateService.stateEvent.next(null);
        });
    } else if (this.editMode) {
      this.httpService
        .updateRecipe(this.recipeForm.value as Recipe, this.id)
        .subscribe(() => {
          this.goBack();
          this.stateService.stateEvent.next(null);
        });
    }
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
  }
}
