import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../common/interfaces/interfaces';
import { HttpService } from '../../common/services/http.service';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.scss'],
  host: { class: 'display-panel' },
})
export class DisplayPanelComponent implements OnInit {
  recipeForm: FormGroup;

  addMode: boolean = false;

  editMode: boolean = true;

  notChosenRecipe: boolean = true;

  recipe: Recipe = {};
  // recipe: any = {
  //   name: 'recipe1',
  //   preparationTime: 61,
  //   description: 'wwww',
  //   ingredients: [
  //     { _id: '1', name: 'ing1', quantity: '123' },
  //     { _id: '2', name: 'ing2', quantity: '123' },
  //   ],

  get ingredientsArray() {
    return this.recipeForm.get('ingredientsArray') as FormArray;
  }

  control(index: number) {
    return this.ingredientsArray.controls[index].get('name');
  }

  addIngredientsArray() {
    // this.ingredientsArray.push(this.fb.control(''));
    this.ingredientsArray.push(
      this.fb.group({
        name: ['', Validators.required],
        quantity: ['', Validators.required],
      })
    );
    console.log('this.ingredientsArray');
    console.log(this.ingredientsArray);
    console.log(this.ingredientsArray.controls[0].get('name'));
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) {
    this.route.params.subscribe((params) => {
      console.log('params');
      console.log(params);
      console.log(this.route.snapshot);
      const snapshot = this.route.snapshot;
      this.notChosenRecipe = snapshot.url.length === 0;
      this.addMode = snapshot?.routeConfig?.path === 'add';
      if (this.addMode) {
        this.editMode = true;
      }
    });

    // router.changes.subscribe(((val) => {
    //   // see also
    //   console.log(val);
    // });

    this.recipeForm = this.fb.group({
      nameControl: [
        this.recipe.name,
        [
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required,
        ],
      ],
      preparationTimeControl: [
        this.recipe.preparationTimeInMinutes,
        [Validators.required],
      ],
      descriptionControl: [
        this.recipe.description,
        [
          Validators.minLength(15),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      ingredientsArray: this.fb.array(
        [],
        [Validators.required, Validators.minLength(2)]
      ),
    });
  }

  ngOnInit(): void {
    // nameControl = new FormControl([
    //   Validators.minLength(3),
    //   Validators.minLength(80),
    //   Validators.required,
    // ]);
  }

  onSubmit(recipeForm: any) {
    console.log(recipeForm);
  }

  deleteIngredientIconClicked(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  onSaveClicked() {
    if (this.addMode) {
      console.log(this.recipe);
      console.log(this.recipeForm);

      this.httpService
        .addRecipe(this.recipeForm.value)
        .subscribe((response) => {
          console.log(
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          );
          console.log(response);
        });
    }
  }
}
