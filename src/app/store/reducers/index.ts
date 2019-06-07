import * as fromAlbums from './albums/albums.reducer';
import * as fromUsers from './users/users.reducer';
import * as fromPhotos from './photos/photos.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Album, User } from '../models/indx';
import { reducer } from './photos/photos.reducer';

// tslint:disable-next-line:no-namespace
export namespace CoreReducer {

  export interface State {
    albums: fromAlbums.AlbumsState;
    users: fromUsers.UsersState;
    photos: fromPhotos.PhotoState;
  }

  export const reducers: ActionReducerMap<State> = {
    albums: fromAlbums.reducer,
    users: fromUsers.reducer,
    photos: fromPhotos.reducer
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
  export const getSelectedAlbumId = createSelector(selectAlbumsState, fromAlbums.getSelectedId);

  // USERS SELECTORS
  export const selectUsersState = createFeatureSelector<fromUsers.UsersState>('users');

  export const getAllUsers = createSelector(selectUsersState, fromUsers.selectAllUser);
  export const selectUsersEntities = createSelector(selectUsersState, fromUsers.selectUsersEntities);
  export const selectUsersIds = createSelector(selectUsersState, fromUsers.selectUsersIds);
  export const selectUsersTotal = createSelector(selectUsersState, fromUsers.selectUsersTotal);

  export const getUsersEntityById = () => createSelector(selectUsersEntities,
    (entities: Dictionary<User>, props: { id: string }) => entities[props.id]);
  
  // PHOTOS SELECTORS
  export const selectPhotosState = createFeatureSelector<fromPhotos.PhotoState>('photos');

  export const getAllPhotos = createSelector(selectPhotosState, fromPhotos.selectAllPhotos);
  export const selectPhotosEntities = createSelector(selectPhotosState, fromPhotos.selectPhotosEntities);
  export const selectPhotosIds = createSelector(selectPhotosState, fromPhotos.selectPhotosIds);
  export const selectPhotosTotal = createSelector(selectPhotosState, fromPhotos.selectPhotosTotal);

  export const getPhotoEntityById = () => createSelector(selectAlbumsEntities,
    (entities: Dictionary<Album>, props: { id: string }) => entities[props.id]);

  export const arePhotosLoaded = createSelector(selectPhotosState, fromPhotos.arePhotosLoaded);
  export const getPhotoListLoadingState = createSelector(selectPhotosState, fromPhotos.getPhotosListLoadingState);
  export const getPhotosTotalCount = createSelector(selectPhotosState, fromPhotos.getPhotosTotalCount);
  export const getPhotosCurrentOffset = createSelector(selectPhotosState, fromPhotos.getPhotosCurrentOffset);
  export const getPhotosLimit = createSelector(selectPhotosState, fromPhotos.getPhotosLimit);
}
