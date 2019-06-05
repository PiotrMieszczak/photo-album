import * as fromAlbums from './albums/albums.reducer';
import * as fromUsers from './users/users.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Album, User } from '../models/indx';
import { UsersState, reducer } from './users/users.reducer';

// tslint:disable-next-line:no-namespace
export namespace CoreReducer {

  export interface State {
    albums: fromAlbums.AlbumsState;
    users: fromUsers.UsersState;
  }

  export const reducers: ActionReducerMap<State> = { 
    albums: fromAlbums.reducer,
    users: fromUsers.reducer
  }

  // ALBUMS SELECTORS
  export const selectAlbumsState = createFeatureSelector<fromAlbums.AlbumsState>('albums');
  
  export const getAllAlbums = createSelector(selectAlbumsState, fromAlbums.selectAllAlbums);
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

  // USERS SELECTORS
  export const selectUsersState = createFeatureSelector<fromUsers.UsersState>('users');

  export const getAllUsers = createSelector(selectUsersState, fromUsers.selectAllUser);
  export const selectUsersEntities = createSelector(selectUsersState, fromUsers.selectUsersEntities);
  export const selectUsersIds = createSelector(selectUsersState, fromUsers.selectUsersIds);
  export const selectUsersTotal = createSelector(selectUsersState, fromUsers.selectUsersTotal);

  export const getUsersEntityById = () => createSelector(selectUsersEntities,
    (entities: Dictionary<User>, props: { id: string }) => entities[props.id]);

}
