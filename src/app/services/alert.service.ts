import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertMessage: string | undefined;
  isError: boolean | false = false;

  constructor() { }

}
