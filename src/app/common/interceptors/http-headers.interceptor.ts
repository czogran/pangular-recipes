import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../app.config';
import { AppConfig } from '../interfaces/interfaces';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  apiKey: string;
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.apiKey = config.apiKey;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request);

    // Nie udało mi się tego uruchomić:
    // Access to XMLHttpRequest at 'https://crudcrud.com/api/5194d613b8674721aff3689266a32660/recipe' from origin 'http://localhost:4200' has been blocked by CORS policy: Request header field x-api-key is not allowed by Access-Control-Allow-Headers in preflight response.
    // return next.handle(
    //   request.clone({ setHeaders: { 'X-API-KEY': this.apiKey } })
    // );
  }
}
