import { Injectable } from '@angular/core';
import { HttpService } from '../../../http.service';
import { Observable, forkJoin } from 'rxjs';
import { User, AlbumRaw, createUser, UserRaw } from '../../models';
import { LimitedResources } from '../../../classes/classes';
import { QueryParams } from '../../../classes/queryParams';
import { switchMap, map } from 'rxjs/operators';

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

   /**
   * For every user gets related albums
   *
   * @param  {number} userId
   * @returns Observable
   */
  public getRealatedAlbums(userId: number): Observable<AlbumRaw[]> {
    const queryParams = new QueryParams();
    queryParams.where('userId', userId);

    return this.http.get('albums', queryParams).pipe(
      map((albumsResponse: LimitedResources<AlbumRaw>) => {
        return albumsResponse.items;
      })
    );
  }
}
