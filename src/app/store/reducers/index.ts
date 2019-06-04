import * as fromAlbums from './albums/albums.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

// tslint:disable-next-line:no-namespace
export namespace CoreReducer {

  export interface State {
    albums: fromAlbums.AlbumsState;
  }

  export const reducers: ActionReducerMap<State> = { 
    albums: fromAlbums.reducer
  }

  export const getAlbumsState =  createFeatureSelector<fromAlbums.AlbumsState>('albums');
  
  export const getAll = createSelector(getAlbumsState, fromAlbums.selectAllAlbums);
  export const selectAlbumsEntities = createSelector(getAlbumsState, fromAlbums.selectAlbumsEntities);
  export const selectAlbumsIds = createSelector(getAlbumsState, fromAlbums.selectAlbumsIds);
  export const selectAlbumsTotal = createSelector(getAlbumsState, fromAlbums.selectAlbumsTotal);

  export const areAlbumsLoaded = createSelector(getAlbumsState, fromAlbums.areAlbumsLoaded);
  export const getAlbumListLoadingState = createSelector(getAlbumsState, fromAlbums.getListLoadingState);
  export const getAlbumsTotalCount = createSelector(getAlbumsState, fromAlbums.getAlbumsTotalCount);
  export const getAlbumsCurrentOffset = createSelector(getAlbumsState, fromAlbums.getAlbumsCurrentOffset);
  export const getAlbumsLimit = createSelector(getAlbumsState, fromAlbums.getAlbumsLimit);

}
