import { Action } from '@ngrx/store';
import { User, AlbumRaw } from '../../models';

// tslint:disable-next-line:no-namespace
export namespace UsersStoreActions {
  export const LOAD_USERS = '[Users] Load users';
  export const LOAD_USERS_SUCCESS = '[Users] Load users success';
  export const LOAD_RELATED_ALBUMS = '[Users] Load realated albums';
  export const LOAD_RELATED_ALBUMS_SUCCESS = '[Users] Load related albums success';
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
  export class LoadRelatedAlbumsAction implements Action {
    readonly type = LOAD_RELATED_ALBUMS;
  }

  export class LoadRelatedAlbumsSuccessAction implements Action {
    readonly type = LOAD_RELATED_ALBUMS_SUCCESS;

    constructor(public payload: { items: AlbumRaw[]}) {}
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
  | LoadRelatedAlbumsAction
  | LoadRelatedAlbumsSuccessAction
  | ChangeSelectedUserAction;
}
