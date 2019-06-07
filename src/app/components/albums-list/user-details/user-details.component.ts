import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/store/models/indx';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  
  constructor(private drawerRef: NzDrawerRef<string>) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log('USER', this.user);
  }
  
  close(): void {
    this.drawerRef.close();
  }
}
