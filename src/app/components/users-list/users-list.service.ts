import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreReducer } from 'src/app/store/reducers';
import { UsersStoreActions } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/models/indx';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private _store: Store<CoreReducer.State>) { }

  /**
   * Dispatches load users action
   *
   * @returns void
   */
  public dispatchLoadUsersAction(): void {
    this._store.dispatch(new UsersStoreActions.LoadUsersAction());
  }

   /**
   * Gets all users from store
   *
   * @returns Observable<User[]>
   */
  public getAllUsers(): Observable<User[]> {
    return this._store.select(CoreReducer.getAllUsers);
  }
}
