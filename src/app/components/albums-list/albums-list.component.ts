import { Component, OnInit } from '@angular/core';
import { CoreReducer } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { AlbumsStoreActions } from 'src/app/store/actions/albums/albums.actions';
import { Observable } from 'rxjs';
import { Album } from 'src/app/store/models/album/album.model';
import { NzDrawerService } from 'ng-zorro-antd';
import { UserDetailsComponent } from './user-details/user-details.component';
import { User } from 'src/app/store/models/indx';
import { AlbumsListService } from './albums-list.service';
import { trigger, transition, style, animate } from '@angular/animations';

const STAGGER_ANIMATION_TIME = 100;

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0'}),
        animate('.8s', style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class AlbumsListComponent implements OnInit {
  public albums$: Observable<Album[]>;
  public loaded$: Observable<boolean>;

  constructor(private _albumsListService: AlbumsListService,
    private _drawerService: NzDrawerService) { }

  ngOnInit(): void {
    this._albumsListService.dispatchInitialActions();
    this.albums$ = this._albumsListService.getAllAlbums();
    this.loaded$ = this._albumsListService.getLoaderState();
  }

  /**
   * Opens user details modal
   *
   * @param userId
   */
  public openUserDetails(event: MouseEvent, user: User): void {
    event.stopImmediatePropagation();
    event.stopPropagation();

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
    this._albumsListService.dispatchLoadAlbumsAction();
  }
}
