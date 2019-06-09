import { Injectable } from '@angular/core';
import { QueryParams } from '../../../classes/queryParams';
import { createAlbum, Album, AlbumRaw, Photo } from '../../../store/models';
import { switchMap, map } from 'rxjs/operators';
import { LimitedResources } from '../../../classes/classes';
import { forkJoin, Observable, throwError } from 'rxjs';
import { HttpService } from '../../../http.service';

@Injectable({ providedIn: 'root' })
export class AlbumService {

  constructor(private http: HttpService) { }

  /**
   * Gets all albums
   *
   * @param  {number} offset
   * @param  {number} limit
   * @returns Observable
   */
  public getAlbums(offset: number, limit: number): Observable<LimitedResources<Album>> {
    const queryParams = new QueryParams();
    queryParams.setLimit(limit);
    queryParams.setOffset(offset);

    return this.http.get('albums', queryParams).pipe(
      switchMap((rawData: LimitedResources<AlbumRaw>) => {
        const albumEntities = rawData.items.map(entity => this.getRelatedPhoto(entity));
        return forkJoin(albumEntities);
      }, (rawData, albums) => {
        return {items: albums, totalCount: rawData.totalCount };
      })
    );
  }

  /**
   * For every albums gets latest photo
   *
   * @param  {string} searchedPhrase
   * @returns Observable
   */
  public searchAlbumByName(searchedPhrase: string, offset: number, limit: number): Observable<LimitedResources<Album>> {
    const queryParams = new QueryParams();
    queryParams.setLimit(limit);
    queryParams.setOffset(offset);
    queryParams.where('title_like', searchedPhrase);

    return this.http.get('albums', queryParams).pipe(
      switchMap((rawData: LimitedResources<AlbumRaw>) => {
        const albumEntities = rawData.items.map(entity => this.getRelatedPhoto(entity));
        return forkJoin(albumEntities);
      }, (rawData, albums) => {
        return {items: albums, totalCount: rawData.totalCount };
      })
    );
  }

  /**
   * For every albums gets latest photo
   *
   * @param  {AlbumRaw} entity
   * @returns Observable
   */
  private getRelatedPhoto(entity: AlbumRaw): Observable<Album> {
    const photosQuery = new QueryParams();
    photosQuery.setLimit(1);
    photosQuery.where('albumId', entity.id);
    photosQuery.sortBy('id', 'desc');

    return this.http.get<Photo>('photos', photosQuery).pipe(
      map(res => res.items[0]),
      map(photoEntity => createAlbum({
          id: entity.id,
          userId: entity.userId,
          title: entity.title,
          thumbnailUrl: photoEntity.thumbnailUrl,
          imageTitle: photoEntity.title,
        })
    ));
  }
}
