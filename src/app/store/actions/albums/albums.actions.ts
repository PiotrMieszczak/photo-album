import { Action } from '@ngrx/store';
import { Album } from '../../models';
import { LimitedResources } from '../../../classes/classes';

// tslint:disable-next-line:no-namespace
export namespace AlbumsStoreActions {
  export const LOAD_ALBUMS = '[Albums] Load albums';
  export const LOAD_ALBUMS_SUCCESS = '[Albums] Load albums success';
  export const CHANGE_SELECTED_ALBUM = '[Albums] Change selected album';
  export const SEARCH_ALBUM = '[Albums] Search albums by name';
  export const SEARCH_ALBUM_SUCCESS = '[Albums] Search albums by name success';

  export class LoadAlbumsAction implements Action {
    readonly type = LOAD_ALBUMS;
  }

  export class LoadAlbumsSuccessAction implements Action {
    readonly type = LOAD_ALBUMS_SUCCESS;

    constructor(public payload: LimitedResources<Album>) {}
  }

  export class ChangeSelectedAlbumAction implements Action {
    readonly type = CHANGE_SELECTED_ALBUM;

    constructor(public payload: { id: number }) {}
  }

  export class SearchAlbumAction implements Action {
    readonly type = SEARCH_ALBUM;

    constructor(public payload: { searchedPhrase: string}) {}
  }

  export class SearchAlbumSuccessAction implements Action {
    readonly type = SEARCH_ALBUM_SUCCESS;

    constructor(public payload: LimitedResources<Album>) {}
  }

  export type AlbumsActions = LoadAlbumsAction
  | LoadAlbumsSuccessAction
  | SearchAlbumAction
  | SearchAlbumSuccessAction
  | ChangeSelectedAlbumAction;
}
