import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user.model';

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
  public getAllUsers(): Observable<User[]> {
    return this.http.get('users');
  }
}
