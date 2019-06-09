import { Action } from '@ngrx/store';
import { User } from '../../models';

// tslint:disable-next-line:no-namespace
export namespace UsersStoreActions {
  export const LOAD_USERS = '[Users] Load users';
  export const LOAD_USERS_SUCCESS = '[Users] Load users success';
  export const CHANGE_SELECTED_USER = '[Users] Change selected user';
  export const SEARCH_USER = '[Users] Search albums by name';
  export const SEARCH_USER_SUCCESS = '[Users] Search albums by name success';

  export class LoadUsersAction implements Action {
    readonly type = LOAD_USERS;
  }

  export class LoadUsersSuccessAction implements Action {
    readonly type = LOAD_USERS_SUCCESS;

    constructor(public payload: { items: User[]}) {}
  }

  export class ChangeSelectedUserAction implements Action {
    readonly type = CHANGE_SELECTED_USER;

    constructor(public payload: { id: number}) {}
  }

  export class SearchUsersAction implements Action {
    readonly type = SEARCH_USER;

    constructor(public payload: { searchedPhrase: string}) {}
  }

  export class SearchUsersSuccessAction implements Action {
    readonly type = SEARCH_USER_SUCCESS;

    constructor(public payload: { items: User[]} ) {}
  }

  export type AlbumsActions = LoadUsersAction
  | LoadUsersSuccessAction
  | SearchUsersAction
  | SearchUsersSuccessAction
  | ChangeSelectedUserAction;
}
