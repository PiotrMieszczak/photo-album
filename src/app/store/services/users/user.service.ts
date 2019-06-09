import { Injectable } from '@angular/core';
import { HttpService } from '../../../http.service';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { LimitedResources } from '../../../classes/classes';
import { QueryParams } from '../../../classes/queryParams';

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

   /**
   * For every albums gets latest photo
   *
   * @param  {string} searchedPhrase
   * @returns Observable
   */
  public searchUserByName(searchedPhrase: string): Observable<LimitedResources<User>> {
    const queryParams = new QueryParams();
    queryParams.where('name_like', searchedPhrase);

    return this.http.get('users', queryParams);
  }
}
