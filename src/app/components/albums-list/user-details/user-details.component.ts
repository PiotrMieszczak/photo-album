import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/store/models/indx';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user: User;
  constructor(private drawerRef: NzDrawerRef<string>) { }

  /**
   * Closes modal window
   * 
   * @returns void
   */
  close(): void {
    this.drawerRef.close();
  }
}
