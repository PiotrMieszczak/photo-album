import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosListService } from './photos-list.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _photosListService: PhotosListService) { }

  ngOnInit() {
    console.log(this._activatedRoute);
    const albumId = this._activatedRoute.snapshot.params.albumId;
    this._photosListService.dispatchLoadPhotosAction(albumId);
    this._photosListService.getAllPhotos().subscribe(console.log);
  }

}
