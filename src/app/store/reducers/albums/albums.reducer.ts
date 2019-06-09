import { AlbumsStoreActions } from '../../actions/albums/albums.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Album } from '../../models';

export interface AlbumsState extends EntityState<Album> {
  loading: boolean;
  loaded: boolean;
  limit: number;
  offset: number;
  totalCount: number;
  selectedAlbumId: number;
  searchedPhrase: string;
}

const defaultState = {
  loading: true,
  loaded: false,
  limit: 20,
  offset: 0,
  totalCount: null,
  selectedAlbumId: null,
  searchedPhrase: null
};

export const albumAdapter = createEntityAdapter<Album>();
export const initialState: AlbumsState = albumAdapter.getInitialState(defaultState);

/**
 * Albums reducer
 *
 * @param  {AlbumsState=initialState} state
 * @param  {AlbumsStoreActions.AlbumsActions} action
 * @returns AlbumsState
 */
export function reducer(state: AlbumsState = initialState, action: AlbumsStoreActions.AlbumsActions): AlbumsState {
  switch (action.type) {
    case AlbumsStoreActions.LOAD_ALBUMS:
        return {
          ...state,
          loading: true,
          loaded: false
        };
    case AlbumsStoreActions.LOAD_ALBUMS_SUCCESS:
      return albumAdapter.upsertMany(action.payload.items, {
          ...state,
          totalCount: action.payload.totalCount,
          offset: state.offset + action.payload.items.length,
          loading: false,
          loaded: true,
      });
    case AlbumsStoreActions.CHANGE_SELECTED_ALBUM:
      return {
        ...state,
        selectedAlbumId: action.payload.id
      };
    case AlbumsStoreActions.SEARCH_ALBUM:
      return {
        ...state,
        offset: 0,
        searchedPhrase: action.payload.searchedPhrase
      };
    case AlbumsStoreActions.SEARCH_ALBUM_SUCCESS:
      return albumAdapter.addAll(action.payload.items, {
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
} = albumAdapter.getSelectors();

export const selectAlbumsIds = selectIds;
export const selectAlbumsEntities = selectEntities;
export const selectAllAlbums = selectAll;
export const selectAlbumsTotal = selectTotal;

export const getSelectedId = (state: AlbumsState) => state.selectedAlbumId;
export const getListLoadingState = (state: AlbumsState) => state.loading;
export const areAlbumsLoaded = (state: AlbumsState) => state.loaded;
export const getAlbumsCurrentOffset = (state: AlbumsState) => state.offset;
export const getAlbumsTotalCount = (state: AlbumsState) => state.totalCount;
export const getAlbumsLimit = (state: AlbumsState) => state.limit;
export const getSearchedPhrase = (state: AlbumsState) => state.searchedPhrase;
