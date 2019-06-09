import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreReducer } from '../../store/reducers';
import { PhotosStoreActions } from '../../store/actions';
import { Observable } from 'rxjs';
import { Photo } from '../../store/models';
import { ImageItem } from '@ngx-gallery/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { LimitedResources } from '../../classes/classes';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private _store: Store<CoreReducer.State>,
    private _titleService: Title) { }

  /**
   * Changes site title
   *
   */
  public changeSiteTitle(): void {
    this._titleService.setTitle('Album');
  }

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
  public getAllPhotos(): Observable<LimitedResources<ImageItem>> {
    return this._store.select(CoreReducer.getAllPhotos).pipe(
      withLatestFrom(this._store.select(CoreReducer.getPhotosTotalCount)),
      map(([photos, totalCount]: [Photo[], number]) => {
        return {
          items: this.convertPhotosClass(photos),
          totalCount: totalCount
        };
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
  private convertPhotosClass(photos: Photo[]): ImageItem[] {
    return photos.map(photo => {
      return new ImageItem({
        src: photo.url,
        thumb: photo.thumbnailUrl
      });
      // const newImageObj = {
      //     src: photo.url,
      //     caption: photo.title,
      //     thumb: photo.thumbnailUrl
      //   };
      //   return newImageObj;

    });
  }
}
