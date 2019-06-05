import { Action } from '@ngrx/store';
import { Album } from '../../models/album/album.model';
import { LimitedResources } from 'src/app/classes/classes';

// tslint:disable-next-line:no-namespace
export namespace AlbumsStoreActions {
  export const LOAD_ALBUMS = '[Albums] Load albums';
  export const LOAD_ALBUMS_SUCCESS = '[Albums] Load albums success';
  export const CHANGE_SELECTED_ALBUM = '[Albums] Change selected album';

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

  export type AlbumsActions = LoadAlbumsAction
  | LoadAlbumsSuccessAction
  | ChangeSelectedAlbumAction;
}
