import * as fromAlbums from './albums/albums.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Album } from '../models/indx';

// tslint:disable-next-line:no-namespace
export namespace CoreReducer {

  export interface State {
    albums: fromAlbums.AlbumsState;
  }

  export const reducers: ActionReducerMap<State> = { 
    albums: fromAlbums.reducer
  }

  export const selectAlbumsState =  createFeatureSelector<fromAlbums.AlbumsState>('albums');
  
  export const getAll = createSelector(selectAlbumsState, fromAlbums.selectAllAlbums);
  export const selectAlbumsEntities = createSelector(selectAlbumsState, fromAlbums.selectAlbumsEntities);
  export const selectAlbumsIds = createSelector(selectAlbumsState, fromAlbums.selectAlbumsIds);
  export const selectAlbumsTotal = createSelector(selectAlbumsState, fromAlbums.selectAlbumsTotal);

  export const getAlbumEntityById = () => createSelector(selectAlbumsEntities,
    (entities: Dictionary<Album>, props: { id: string }) => entities[props.id]);

  export const areAlbumsLoaded = createSelector(selectAlbumsState, fromAlbums.areAlbumsLoaded);
  export const getAlbumListLoadingState = createSelector(selectAlbumsState, fromAlbums.getListLoadingState);
  export const getAlbumsTotalCount = createSelector(selectAlbumsState, fromAlbums.getAlbumsTotalCount);
  export const getAlbumsCurrentOffset = createSelector(selectAlbumsState, fromAlbums.getAlbumsCurrentOffset);
  export const getAlbumsLimit = createSelector(selectAlbumsState, fromAlbums.getAlbumsLimit);

}
