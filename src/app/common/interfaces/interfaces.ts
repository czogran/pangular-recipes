export interface AppConfig {
  apiEndpoint: string;
  apiKey: string;
}

export interface Ingredient {
  _id?: string;
  name?: string;
  quantity?: string;
}

export interface Recipe {
  _id: string;
  name?: string;
  preparationTimeInMinutes?: number;
  description?: string;
  ingredients?: Ingredient[];
}

export interface DeleteDialogDataInterface {
  name: string;
}
