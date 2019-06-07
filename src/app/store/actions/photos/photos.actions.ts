import { Action } from '@ngrx/store';
import { LimitedResources } from 'src/app/classes/classes';
import { Photo } from '../../models/indx';

// tslint:disable-next-line:no-namespace
export namespace PhotosStoreActions {
  export const LOAD_PHOTOS = '[Photos] Load users';
  export const LOAD_PHOTOS_SUCCESS = '[Photos] Load users success';

  export class LoadPhotosAction implements Action {
    readonly type = LOAD_PHOTOS;
  }

  export class LoadPhotosSuccessAction implements Action {
    readonly type = LOAD_PHOTOS_SUCCESS;

    constructor(public payload: LimitedResources<Photo>) {}
  }

  export type AlbumsActions = LoadPhotosAction
  | LoadPhotosSuccessAction;
}
