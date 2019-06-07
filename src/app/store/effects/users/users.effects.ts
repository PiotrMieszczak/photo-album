import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UsersStoreActions } from '../../actions';
import { UserService } from '../../services/users/user.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LimitedResources } from 'src/app/classes/classes';
import { User } from '../../models/indx';

@Injectable()
export class UsersEffects {

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(UsersStoreActions.LOAD_USERS),
    switchMap((action: UsersStoreActions.LoadUsersAction) => {
      return this._userService.getAllUsers()
        .pipe(
          map((albumsResponse: LimitedResources<User>) => new UsersStoreActions.LoadUsersSuccessAction({ items: albumsResponse.items }),
            catchError((error) => console.error)
          )
        );
    })
  );

  constructor(private actions$: Actions,
    private _userService: UserService) { }

}
