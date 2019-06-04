import { Injectable } from '@angular/core';
import { QueryParams } from '../../../classes/queryParams';
import { createAlbum, Album, AlbumRaw } from '../../../store/models/album/album.model';
import { switchMap, map } from 'rxjs/operators';
import { LimitedResources } from 'src/app/classes/classes';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from 'src/app/http.service';

@Injectable({ providedIn: 'root' })
export class AlbumService {

  constructor(private http: HttpService) { }

  getAlbums(offset: number, limit: number): Observable<LimitedResources<Album>> {
    const queryParams = new QueryParams();
    queryParams.setLimit(limit);
    queryParams.setOffset(offset);
    console.log('getAlbums', queryParams);

    return this.http.get('albums', queryParams).pipe(
      switchMap((rawData: HttpResponse<Album[]>) => {
        console.log('rawData', rawData);
        const albumEntities = rawData.body.map(entity => {
          return this.getRelatedPhoto(entity);
        });
        return forkJoin(albumEntities);
      }, (rawData, albums) => {
        const albumsData = new LimitedResources<Album>();
        albumsData.items = albums;
        albumsData.totalCount = parseInt(rawData.headers.get('x-total-count'), 10);
        return albumsData;
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

    return this.http.get('photos', photosQuery).pipe(
      map(res => res.body),
      map(res => res[0]),
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
