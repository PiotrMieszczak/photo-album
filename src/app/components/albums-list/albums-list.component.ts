import { Component, OnInit } from '@angular/core';
import { CoreReducer } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { AlbumsStoreActions } from 'src/app/store/actions/albums/albums.actions';
import { Observable, combineLatest } from 'rxjs';
import { Album } from 'src/app/store/models/album/album.model';
import { UsersStoreActions } from 'src/app/store/actions';
import { User } from 'src/app/store/models/indx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {
  public albums$: Observable<Album[]>;
  public users$: Observable<User[]>;
  public loaded$: Observable<boolean>;

  constructor(private _store: Store<CoreReducer.State>) { }

  ngOnInit() {
    this._store.dispatch(new AlbumsStoreActions.LoadAlbumsAction());
    this._store.dispatch(new UsersStoreActions.LoadUsersAction());

    this.getAllAlbums();
    this.getLoaderState();
  }

  /**
   * Gets all albums
   * 
   * @returns void
   */
  getAllAlbums(): void {
    const albumsWithoutUsers$ = this._store.select(CoreReducer.getAllAlbums);
    const users$ = this._store.select(CoreReducer.getAllUsers);

    this.albums$ = combineLatest(albumsWithoutUsers$, users$).pipe(
      map(([albums, users]) => {
        const updatedAlbums = albums.map(album => {
          const relatedUser = users.find(user => user.id === album.userId);
          album.user = relatedUser;
          return album;
        })
        return updatedAlbums;
      })
    )
  }

  /**
   * Gets album loader state
   * 
   * @returns void
   */
  getLoaderState(): void {
    this.loaded$ = this._store.select(CoreReducer.areAlbumsLoaded);
  }

}
