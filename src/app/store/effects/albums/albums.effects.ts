import { CoreReducer } from '../../reducers/index';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { AlbumsStoreActions } from '../../actions/albums/albums.actions';
import { Injectable } from '@angular/core';
import { combineLatest, switchMap, withLatestFrom, map, catchError, tap } from 'rxjs/operators';
import { AlbumService } from '../../services/albums/album.service';
import { LimitedResources } from '../../../classes/classes';
import { Album } from '../../models/album/album.model';

@Injectable()
export class AlbumEffects {

  @Effect()
  loadAlbums$: Observable<Action> = this.action$.pipe(
    ofType(AlbumsStoreActions.LOAD_ALBUMS),
    withLatestFrom(this._store.select(CoreReducer.getAlbumsLimit),
      this._store.select(CoreReducer.getAlbumsCurrentOffset)),
    switchMap(([action, limit, offset]: [AlbumsStoreActions.LoadAlbumsAction, number, number]) => {
      console.log('TEST !', [action, limit, offset]);
      return this._albumService.getAlbums(offset, limit)
        .pipe(
          map((albumsResponse: LimitedResources<Album>) => new AlbumsStoreActions.LoadAlbumsSuccessAction(albumsResponse),
            catchError((error) => console.error)
          )
        )
    })
  );

  constructor(private action$: Actions,
    private _albumService: AlbumService,
    private _store: Store<CoreReducer.State>) {} 
}
