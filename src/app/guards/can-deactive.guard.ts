import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentDetailsComponent } from '../return-order/component-details/component-details.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactiveGuard implements CanDeactivate<unknown> {

  constructor() { }

  canDeactivate(component: ComponentDetailsComponent): Observable<boolean> | boolean {
    return component.processCompletionState$.pipe(
      map(state => {
        if(state && component.loggedInUser)
          return confirm('Are you sure you want to continue, your current return request submission will be lost!!!!');
        else
          return true;
      })
    )
}
}

