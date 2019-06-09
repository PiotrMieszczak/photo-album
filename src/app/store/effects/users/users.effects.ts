import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { UsersStoreActions } from '../../actions';
import { UserService } from '../../services/users/user.service';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LimitedResources } from '../../../classes/classes';
import { User } from '../../models';
import { CoreReducer } from '../../reducers';

@Injectable()
export class UsersEffects {

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(UsersStoreActions.LOAD_USERS),
    switchMap((action: UsersStoreActions.LoadUsersAction) => {
      return this._userService.getAllUsers()
        .pipe(
          map((usersResponse: LimitedResources<User>) => new UsersStoreActions.LoadUsersSuccessAction({ items: usersResponse.items }),
            catchError((error) => console.error)
          )
        );
    })
  );

  @Effect()
  searchUsers$: Observable<Action> = this.actions$.pipe(
    ofType(UsersStoreActions.SEARCH_USER),
    withLatestFrom(this._store.select(CoreReducer.getUsersSearchedPhrase)),
    switchMap(([action, phrase]: [UsersStoreActions.SearchUsersAction, string]) => {
      return this._userService.searchUserByName(phrase)
        .pipe(
          map((usersResponse: LimitedResources<User>) => {
            return new UsersStoreActions.SearchUsersSuccessAction({ items: usersResponse.items });
          },
            catchError((error) => console.error)
          )
        );
    })
  );

  constructor(private actions$: Actions,
    private _store: Store<CoreReducer.State>,
    private _userService: UserService) { }

}
