import { Action } from '@ngrx/store';
import { Album } from '../../models/album/album.model';
import { LimitedResources } from 'src/app/classes/classes';

// tslint:disable-next-line:no-namespace
export namespace AlbumsStoreActions {
  export const LOAD_ALBUMS = '[Albums] Load albums';
  export const LOAD_ALBUMS_SUCCESS = '[Albums] Load albums success';
  export const CHANGE_TOTAL_COUNT = '[Albums] Load albums success';

  export class LoadAlbumsAction implements Action {
  
    readonly type = LOAD_ALBUMS;
    constructor(public payload: boolean) {
      console.log('LoadAlbumsAction LOAD_ALBUMS');
    }
  }

  export class LoadAlbumsSuccessAction implements Action {
    readonly type = LOAD_ALBUMS_SUCCESS;

    constructor(public payload: LimitedResources<Album>) {}
  }

  export class ChangeTotalCountAction implements Action {
    readonly type = CHANGE_TOTAL_COUNT;

    constructor(public payload: { totalCount: number }) {}
  }

  export type AlbumsActions = LoadAlbumsAction
  | LoadAlbumsSuccessAction;
}
