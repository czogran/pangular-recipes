import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string = 'https://crudcrud.com/api/af7734d5af9a460699fa496cc1c01110';
  constructor(private httpClient: HttpClient) {}

  getRecipes() {}

  getRecipe() {}

  addRecipe(recipe: any): Observable<any> {
    // return this.httpClient.post(this.url, recipe, {
    //   headers: { 'X-API-KEY': 'HoA' },
    // });
    return this.httpClient.post(this.url + '/recipes', recipe);
  }

  // HttpClient httpclient = new DefaultHttpClient();
  // HttpGet request = new HttpGet(theUrl);
  // request.addHeader("x-api-key", apiKey);
  // HttpResponse response = httpclient.execute(request);
}
