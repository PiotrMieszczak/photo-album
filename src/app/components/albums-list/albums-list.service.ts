import { Injectable } from '@angular/core';
import { CoreReducer } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { UsersStoreActions, AlbumsStoreActions } from '../../store/actions';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../../store/models';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AlbumsListService {

  constructor(private _store: Store<CoreReducer.State>,
    private _titleService: Title) { }

  /**
   * Changes site title
   *
   */
  public changeSiteTitle(): void {
    this._titleService.setTitle('Albums List');
  }

  /**
   * Dispatches initial actions - load albums and load users
   *
   */
  public dispatchInitialActions(): void {
    this.dispatchLoadAlbumsAction();
    this._store.dispatch(new UsersStoreActions.LoadUsersAction());
  }

  /**
   * Dispatches load albums action
   *
   */
  public dispatchLoadAlbumsAction(): void {
    this._store.dispatch(new AlbumsStoreActions.LoadAlbumsAction());
  }

  /**
   * Starts subscription for combined
   *
   * @returns Observable<Album[]>
   */
  public getAllAlbums(): Observable<Album[]> {
    const albumsWithoutUsers$ = this._store.select(CoreReducer.getAllAlbums);
    const users$ = this._store.select(CoreReducer.getAllUsers);

    return combineLatest(albumsWithoutUsers$, users$).pipe(
      map(([albums, users]) => {
        const updatedAlbums = albums.map(album => {
          const relatedUser = users.find(user => user.id === album.userId);
          album.user = relatedUser;
          return album;
        });
        return updatedAlbums;
      })
    );
  }

  /**
   * Gets album loader state
   *
   * @returns boolean
   */
  public getLoaderState(): Observable<boolean> {
    return this._store.select(CoreReducer.areAlbumsLoaded);
  }

   /**
   * Dispatches change selected user action
   *
   * @param {number} userId
   * @returns void
   */
  public changeSelectedUser(userId: number): void {
    this._store.dispatch(new UsersStoreActions.ChangeSelectedUserAction({ id: userId }));
  }
}
