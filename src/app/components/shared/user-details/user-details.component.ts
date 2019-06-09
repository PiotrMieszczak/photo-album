import { User, AlbumRaw } from '../../../store/models';
import { Component, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { CoreReducer } from 'src/app/store/reducers';
import { UsersStoreActions } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user: User;
  public relatedAlbums$: Observable<AlbumRaw[]>;

  constructor(private drawerRef: NzDrawerRef<string>,
    private _store: Store<CoreReducer.State>,
    private _router: Router) { }

  ngOnInit() {
    this.getRelatedAlbums();
  }

  /**
   * Gets related albums from store
   *
   * @returns void
   */
  getRelatedAlbums(): void {
    this._store.dispatch(new UsersStoreActions.LoadRelatedAlbumsAction());
    this.relatedAlbums$ = this._store.select(CoreReducer.getUsersRelatedAlbums);
  }

  /**
   * Navigates to specific album, closes modal
   *
   * @param  {number} albumId
   * @returns void
   */
  navigateToAlbum(albumId: number): void {
    console.log('navigateToAlbum', albumId, `/photos/${albumId}`);
    this._router.navigate([`/photos/${albumId}`]);
    this.close();
  }

  /**
   * Closes modal window
   * 
   * @returns void
   */
  close(): void {
    this.drawerRef.close();
  }
}
