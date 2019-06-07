import { Component, OnInit } from '@angular/core';
import { CoreReducer } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { AlbumsStoreActions } from 'src/app/store/actions/albums/albums.actions';
import { Observable, combineLatest } from 'rxjs';
import { Album } from 'src/app/store/models/album/album.model';
import { UsersStoreActions } from 'src/app/store/actions';
import { map } from 'rxjs/operators';
import { NzDrawerService } from 'ng-zorro-antd';
import { UserDetailsComponent } from './user-details/user-details.component';
import { User } from 'src/app/store/models/indx';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {
  public albums$: Observable<Album[]>;
  public loaded$: Observable<boolean>;

  constructor(private _store: Store<CoreReducer.State>,
    private _drawerService: NzDrawerService) { }

  ngOnInit(): void {
    this.dispatchInitialActions();
    this.getAllAlbums();
    this.getLoaderState();
  }

  /**
   * Opens user details modal
   *
   * @param userId
   */
  public openUserDetails(user: User): void {
    console.log('openUserDetails', user);
    this._drawerService.create({
      nzTitle: 'User details',
      nzContent: UserDetailsComponent,
      nzContentParams: {
        user: user
      }
    });
  }

  /**
   * Loads more albums on scroll
   *
   * @returns void
   */
  public onScroll(): void {
    this._store.dispatch(new AlbumsStoreActions.LoadAlbumsAction());
  }

  /**
   * Dispatches initial actions - load albums and load users
   *
   */
  private dispatchInitialActions(): void {
    this._store.dispatch(new AlbumsStoreActions.LoadAlbumsAction());
    this._store.dispatch(new UsersStoreActions.LoadUsersAction());
  }

  /**
   * Starts subscription for combined
   *
   * @returns void
   */
  private getAllAlbums(): void {
    const albumsWithoutUsers$ = this._store.select(CoreReducer.getAllAlbums);
    const users$ = this._store.select(CoreReducer.getAllUsers);

    this.albums$ = combineLatest(albumsWithoutUsers$, users$).pipe(
      map(([albums, users]) => {
        const updatedAlbums = albums.map(album => {
          const relatedUser = users.find(user => user.id === album.userId);
          album.user = relatedUser;
          return album;
        });
        return updatedAlbums;
      })
    )
  }

  /**
   * Gets album loader state
   *
   * @returns void
   */
  private getLoaderState(): void {
    this.loaded$ = this._store.select(CoreReducer.areAlbumsLoaded);
  }
}
