import { CoreReducer } from '../../reducers/index';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { LimitedResources } from '../../../classes/classes';
import { AlbumsStoreActions } from '../../actions';
import { PhotosStoreActions } from '../../actions/photos/photos.actions';
import { PhotoService } from '../../services/photos/photo.service';
import { Photo } from '../../models/indx';

@Injectable()
export class AlbumEffects {

  @Effect()
  loadPhotos$: Observable<Action> = this.action$.pipe(
    ofType(AlbumsStoreActions.LOAD_ALBUMS),
    withLatestFrom(this._store.select(CoreReducer.getSelectedAlbumId),
      this._store.select(CoreReducer.getPhotosLimit),
      this._store.select(CoreReducer.getPhotosCurrentOffset)),
    switchMap(([action, albumId, limit, offset]: [PhotosStoreActions.LoadPhotosAction, number, number, number]) => {
      return this._photoService.getPhotos(albumId, offset, limit)
        .pipe(
          map((photosResponse: LimitedResources<Photo>) => new PhotosStoreActions.LoadPhotosSuccessAction(photosResponse),
            catchError((error) => console.error)
          )
        )
    })
  );

  constructor(private action$: Actions,
    private _photoService: PhotoService,
    private _store: Store<CoreReducer.State>) {} 
}
