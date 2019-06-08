import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosListService } from './photos-list.service';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/store/models/indx';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {
  public photos$: Observable<Photo[]>;
  public currentAlbumId: number;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    gutter: 10
  };

  constructor(private _activatedRoute: ActivatedRoute,
    private _photosListService: PhotosListService) { 
      this.getCurrentAlbumId();
    }

  ngOnInit() {
    this.dispatchGetPhotosAction();
    this.photos$ = this._photosListService.getAllPhotos();
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
