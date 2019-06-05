import { Component, OnInit } from '@angular/core';
import { CoreReducer } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { AlbumsStoreActions } from 'src/app/store/actions/albums/albums.actions';
import { Observable } from 'rxjs';
import { Album } from 'src/app/store/models/album/album.model';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {
  public albums$: Observable<Album[]>;
  public loaded$: Observable<boolean>;

  constructor(private _store: Store<CoreReducer.State>) { }

  ngOnInit() {
    this._store.dispatch(new AlbumsStoreActions.LoadAlbumsAction());
    this.getAllAlbums();
    this.getLoaderState();
  }

  /**
   * Gets all albums
   * 
   * @returns void
   */
  getAllAlbums(): void {
    this.albums$ = this._store.select(CoreReducer.getAll);
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
