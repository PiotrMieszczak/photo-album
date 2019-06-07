import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreReducer } from 'src/app/store/reducers';
import { PhotosStoreActions } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/store/models/indx';
import { ActivatedRoute } from '@angular/router';

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
   * Starts subscription for combined
   *
   * @returns Observable<Album[]>
   */
  public getAllPhotos(): Observable<Photo[]> {
    return this._store.select(CoreReducer.getAllPhotos);
  }

  /**
   * Gets album loader state
   *
   * @returns boolean
   */
  public getLoaderState(): Observable<boolean> {
    return this._store.select(CoreReducer.arePhotosLoaded);
  }
}
