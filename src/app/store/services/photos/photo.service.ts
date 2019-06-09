import { Injectable } from '@angular/core';
import { HttpService } from '../../../http.service';
import { Observable } from 'rxjs';
import { LimitedResources } from '../../../classes/classes';
import { QueryParams } from '../../../classes/queryParams';
import { Photo } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpService) { }

 /**
   * Gets all albums
   *
   * @param  {number} albumId
   * @param  {number} offset
   * @param  {number} limit
   * @returns Observable
   */
  public getPhotos(albumId: number, offset: number, limit: number): Observable<LimitedResources<Photo>> {
    const queryParams = new QueryParams();
    queryParams.setLimit(limit);
    queryParams.setOffset(offset);
    queryParams.where('albumId', albumId);

    return this.http.get('photos', queryParams);
  }
}
