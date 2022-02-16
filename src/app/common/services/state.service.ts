import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  stateEvent: Subject<any> = new Subject();
  deleteEvent: Subject<string> = new Subject();
}
