import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, User } from '../../store/models';
import { NzDrawerService } from 'ng-zorro-antd';
import { UserDetailsComponent } from '../shared/user-details/user-details.component';
import { AlbumsListService } from './albums-list.service';
import { trigger, transition, style, animate } from '@angular/animations';

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
    private _drawerService: NzDrawerService) {
      this._albumsListService.changeSiteTitle();
    }

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
    this._albumsListService.changeSelectedUser(user.id);

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
