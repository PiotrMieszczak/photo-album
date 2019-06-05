import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user.model';
import { LimitedResources } from 'src/app/classes/classes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  /**
   * Gets all users
   * 
   * @returns Observable
   */
  public getAllUsers(): Observable<LimitedResources<User>> {
    return this.http.get('users');
  }
}
