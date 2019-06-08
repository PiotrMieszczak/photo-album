import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreReducer } from 'src/app/store/reducers';
import { PhotosStoreActions } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/store/models/indx';
import { ImageItem } from '@ngx-gallery/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { IAlbum } from 'ngx-lightbox';
import { getPhotosTotalCount } from '../../store/reducers/photos/photos.reducer';
import { LimitedResources } from 'src/app/classes/classes';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private _store: Store<CoreReducer.State>) { }

  /**
   * Dispatches load albums action
   * 
   * @param number
   * @returns boolean
   */
  public dispatchLoadPhotosAction(albumId: number): void {
    this._store.dispatch(new PhotosStoreActions.LoadPhotosAction({ albumId: albumId }));
  }

  /**
   * Starts subscription for downloaded photos
   *
   * @returns Observable<ImageItem[]>
   */
  public getAllPhotos(): Observable<LimitedResources<IAlbum>> {
    return this._store.select(CoreReducer.getAllPhotos).pipe(
      withLatestFrom(this._store.select(CoreReducer.getPhotosTotalCount)),
      map(([photos, totalCount]: [Photo[], number]) => {
        return {
          items: this.convertPhotosClass(photos),
          totalCount: totalCount
        }
      })
    );
  }

  /**
   * Gets album loader state
   *
   * @returns boolean
   */
  public getLoaderState(): Observable<boolean> {
    return this._store.select(CoreReducer.arePhotosLoaded);
  }

  /**
   * Converts photo object to IAlbum object - needed for lightbox lib
   * 
   * @param  {Photo[]} photos
   * @returns IAlbum
   */
  private convertPhotosClass(photos: Photo[]): IAlbum[] {
    return photos.map(photo => {
      const newImageObj = {
          src: photo.url,
          caption: photo.title,
          thumb: photo.thumbnailUrl
        };
        return newImageObj;
    });
  }
}
