import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../app.config';
import { AppConfig, Recipe } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;
  key: string;

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.url = config.apiEndpoint + '/recipe';
    this.key = config.apiKey;
  }

  getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.url);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.url}/${id}`);
  }

  addRecipe(recipe: Recipe): Observable<any> {
    //Nie udało sie, próbowałem z różnymi flagami ale nie poszło
    // return this.httpClient.post(this.url, recipe, {
    //   headers: { 'X-API-KEY': 'HoA' },
    // });

    return this.httpClient.post(this.url, recipe);
  }

  updateRecipe(recipe: Recipe, id: string): Observable<Recipe> {
    return this.httpClient.put<Recipe>(`${this.url}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.httpClient.delete<Recipe>(`${this.url}/${id}`);
  }
}
