import { Component, OnInit } from '@angular/core';
import { CoreReducer } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { AlbumsStoreActions } from 'src/app/store/actions/albums/albums.actions';
import { AlbumsState } from '../../store/reducers/albums/albums.reducer';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  constructor(private _store: Store<CoreReducer.State>) { }

  ngOnInit() {
    this._store.dispatch(new AlbumsStoreActions.LoadAlbumsAction(true));
    // this._store.select(CoreReducer.getAll).subscribe(res => console.log('GET ALL', res))
    // this._store.select(CoreReducer.selectAlbumsEntities).subscribe(res => console.log('GET selectAlbumsEntities', res))
  }

}
