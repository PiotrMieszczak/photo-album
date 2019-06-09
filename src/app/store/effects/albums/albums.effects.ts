import { CoreReducer } from '../../reducers/index';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { AlbumService } from '../../services/albums/album.service';
import { LimitedResources } from '../../../classes/classes';
import { Album } from '../../models';
import { AlbumsStoreActions } from '../../actions';

@Injectable()
export class AlbumEffects {

  @Effect()
  loadAlbums$: Observable<Action> = this.action$.pipe(
    ofType(AlbumsStoreActions.LOAD_ALBUMS),
    withLatestFrom(this._store.select(CoreReducer.getAlbumsLimit),
      this._store.select(CoreReducer.getAlbumsCurrentOffset)),
    switchMap(([action, limit, offset]: [AlbumsStoreActions.LoadAlbumsAction, number, number]) => {
      return this._albumService.getAlbums(offset, limit)
        .pipe(
          map((albumsResponse: LimitedResources<Album>) => new AlbumsStoreActions.LoadAlbumsSuccessAction(albumsResponse),
            catchError((error) => console.error)
          )
        );
    })
  );

  @Effect()
  searchAlbums$: Observable<Action> = this.action$.pipe(
    ofType(AlbumsStoreActions.SEARCH_ALBUM),
    withLatestFrom(this._store.select(CoreReducer.getAlbumsLimit),
      this._store.select(CoreReducer.getAlbumsCurrentOffset),
      this._store.select(CoreReducer.getAlbumsSearchedPhrase)),
    switchMap(([action, limit, offset, phrase]: [AlbumsStoreActions.LoadAlbumsAction, number, number, string]) => {
      return this._albumService.searchAlbumByName(phrase, offset, limit)
        .pipe(
          map((albumsResponse: LimitedResources<Album>) => new AlbumsStoreActions.SearchAlbumSuccessAction(albumsResponse),
            catchError((error) => console.error)
          )
        );
    })
  );

  constructor(private action$: Actions,
    private _albumService: AlbumService,
    private _store: Store<CoreReducer.State>) {}
}
