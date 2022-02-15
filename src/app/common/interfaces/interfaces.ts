export interface Ingredient {
  _id?: string;
  name?: string;
  quantity?: string;
}

export interface Recipe {
  _id?: string;
  name?: string;
  preparationTimeInMinutes?: number;
  description?: string;
  ingredients?: Ingredient[];
}
