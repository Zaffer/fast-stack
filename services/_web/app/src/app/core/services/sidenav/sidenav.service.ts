import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

/**
 * Service to get Observable for Side Navigation state
 * 
 * @usageNotes
 * `isSideNavOpen$: Observable<boolean> = this._sideNavService.isSideNavOpen.asObservable()`
 */
@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  // With this subject you can save the sidenav state and consume later in other pages
  public isSideNavOpen: Subject<boolean> = new Subject();

  constructor() { }

  public toggle() {
    return this.isSideNavOpen.next(!this.isSideNavOpen);
  }
}