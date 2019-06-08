import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosListService } from './photos-list.service';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/store/models/indx';
import { NgxMasonryOptions } from 'ngx-masonry';
import { GalleryItem, ImageItem, Gallery  } from '@ngx-gallery/core';
import { tap } from 'rxjs/operators';
import { Lightbox, IAlbum, LightboxConfig } from 'ngx-lightbox';
import { LimitedResources } from 'src/app/classes/classes';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {
  public photos$: Observable<IAlbum[]>;
  public photos: IAlbum[];
  public currentAlbumId: number;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    gutter: 10
  };
  private _totalCount: number;

  constructor(private _lightbox: Lightbox,
    private _lighboxConfig: LightboxConfig,
    private _activatedRoute: ActivatedRoute,
    private _photosListService: PhotosListService) {
      this.getCurrentAlbumId();
    }

  ngOnInit() {
    this.dispatchGetPhotosAction();
    console.log(this._lighboxConfig);
    this._lighboxConfig.centerVertically = true;
    this._lighboxConfig.disableScrolling = true;

    this._photosListService.getAllPhotos().subscribe((photosRes: LimitedResources<IAlbum>) => {
      this.photos = photosRes.items;
      this._totalCount = photosRes.totalCount;
    });
  }

  /**
   * Opens lightbox with current photo
   *
   * @param  {number} index
   * @returns void
   */
  openLightbox(index: number): void {
    this._lightbox.open(this.photos, index);
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
