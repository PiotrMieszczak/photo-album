import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd';
import { UserDetailsComponent } from '../albums-list/user-details/user-details.component';
import { User } from '../../store/models';
import { Observable } from 'rxjs';
import { UsersListService } from './users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private _drawerService: NzDrawerService,
    private _usersListService: UsersListService) { }

  ngOnInit() {
    this._usersListService.dispatchLoadUsersAction();
    this.users$ = this._usersListService.getAllUsers();
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
}
