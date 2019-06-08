import { AlbumsStoreActions } from '../../actions/albums/albums.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Photo } from '../../models/indx';
import { PhotosStoreActions } from '../../actions';


export interface PhotoState extends EntityState<Photo> {
  loading: boolean;
  loaded: boolean;
  limit: number;
  offset: number;
  totalCount: number;
}

const defaultState = {
  loading: true,
  loaded: false,
  limit: 20,
  offset: 0,
  totalCount: null,
};

export const photoAdapter = createEntityAdapter<Photo>();
export const initialState: PhotoState = photoAdapter.getInitialState(defaultState);

/**
 * PhotosState reducer
 *
 * @param  {PhotoState=initialState} state
 * @param  {PhotosStoreActions.AlbumsActions} action
 * @returns PhotoState
 */
export function reducer(state: PhotoState = initialState, action: PhotosStoreActions.AlbumsActions): PhotoState {
  switch (action.type) {
    case PhotosStoreActions.LOAD_PHOTOS:
        return {
          ...state,
          loading: true,
          loaded: false
        };
    case PhotosStoreActions.LOAD_PHOTOS_SUCCESS:
      return photoAdapter.upsertMany(action.payload.items, {
          ...state,
          totalCount: action.payload.totalCount,
          offset: state.offset + action.payload.items.length,
          loading: false,
          loaded: true,
      });
    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = photoAdapter.getSelectors();

export const selectPhotosIds = selectIds;
export const selectPhotosEntities = selectEntities;
export const selectAllPhotos = selectAll;
export const selectPhotosTotal = selectTotal;

export const getPhotosListLoadingState = (state: PhotoState) => state.loading;
export const arePhotosLoaded = (state: PhotoState) => state.loaded;
export const getPhotosCurrentOffset = (state: PhotoState) => state.offset;
export const getPhotosTotalCount = (state: PhotoState) => state.totalCount;
export const getPhotosLimit = (state: PhotoState) => state.limit;
