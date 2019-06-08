import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosListService } from './photos-list.service';
import { Observable, Subject } from 'rxjs';
import { NgxMasonryOptions } from 'ngx-masonry';
import { ImageItem, Gallery, GalleryRef  } from '@ngx-gallery/core';
import { LimitedResources } from 'src/app/classes/classes';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {
  public photos$: Observable<any[]>;
  public photos: ImageItem[];
  public currentAlbumId: number;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
  };

  private _totalPhotos: number;
  private _galleryRef: GalleryRef;
  private _guard$: Subject<boolean> = new Subject();

  constructor(public gallery: Gallery,
    private _activatedRoute: ActivatedRoute,
    private _photosListService: PhotosListService) {
      this.getCurrentAlbumId();
      this._galleryRef = this.gallery.ref('lighbox');
    }

  ngOnInit() {
    this.dispatchGetPhotosAction();
  }

  /**
   * Starts subscription for gallery index change - distpaches load more data action if necessary
   *
   * @returns void
   */
  startSubForGalleryIndexChange(): void {
    this._galleryRef.indexChanged
    .pipe(
      takeUntil(this._guard$)
    ).subscribe(e => {
      if (e.hasNext === false && (this.photos.length < this._totalPhotos)) {
        this._galleryRef.stop();
        this.dispatchGetPhotosAction();
      }
    });
  }

  /**
   * Starts subscription for current photos list
   *
   * @returns void
   */
  getAllPhotosSub(): void {
    this._photosListService.getAllPhotos()
    .pipe(
      takeUntil(this._guard$)
    ).subscribe((photosRes: LimitedResources<ImageItem>) => {
      this.photos = photosRes.items;
      this._totalPhotos = photosRes.totalCount;
      this._galleryRef.load(this.photos);
    });
  }

  /**
   * Gets more photos on scroll
   *
   * @returns void
   */
  public onScroll(): void {
    this.dispatchGetPhotosAction();
  }

  /**
   * Dispatches get photos action
   *
   * @returns void
   */
  private dispatchGetPhotosAction(): void {
    this._photosListService.dispatchLoadPhotosAction(this.currentAlbumId);
  }

  /**
   * Gets current albumId from url
   *
   * @returns void
   */
  private getCurrentAlbumId(): void {
    this.currentAlbumId = this._activatedRoute.snapshot.params.albumId;
  }
}
