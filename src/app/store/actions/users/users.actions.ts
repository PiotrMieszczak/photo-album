import { Action } from '@ngrx/store';
import { User } from '../../models/user/user.model';

// tslint:disable-next-line:no-namespace
export namespace UsersStoreActions {
  export const LOAD_USERS = '[Albums] Load albums';
  export const LOAD_USERS_SUCCESS = '[Albums] Load albums success';

  export class LoadUsersAction implements Action {
    readonly type = LOAD_USERS;
  }

  export class LoadUsersSuccessAction implements Action {
    readonly type = LOAD_USERS_SUCCESS;

    constructor(public payload: { users: User[]}) {}
  }

  export type AlbumsActions = LoadUsersAction
  | LoadUsersSuccessAction;
}
