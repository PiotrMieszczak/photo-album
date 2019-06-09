import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { UsersStoreActions } from '../../actions';
import { UserService } from '../../services/users/user.service';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LimitedResources } from '../../../classes/classes';
import { User, AlbumRaw } from '../../models';
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
          catchError(error => { return throwError(error); })
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
          catchError(error => { return throwError(error); })
          )
        );
    })
  );

  @Effect()
  loadRelatedAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(UsersStoreActions.LOAD_RELATED_ALBUMS),
    withLatestFrom(this._store.select(CoreReducer.getSelectedUserId)),
    switchMap(([action, userId]: [UsersStoreActions.LoadRelatedAlbumsAction, number]) => {
      console.log('ACTION', action);
      return this._userService.getRealatedAlbums(userId)
        .pipe(
          map((albums: AlbumRaw[]) => {
            return new UsersStoreActions.LoadRelatedAlbumsSuccessAction({ items: albums });
          },
          catchError(error => { return throwError(error); })
          )
        );
    })
  );

  constructor(private actions$: Actions,
    private _store: Store<CoreReducer.State>,
    private _userService: UserService) { }
}
