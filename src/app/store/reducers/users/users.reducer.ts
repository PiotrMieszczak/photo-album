import { User } from '../../models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { UsersStoreActions } from '../../actions/index';

export interface UsersState  extends EntityState<User> {
  selectedUserId: number;
  searchedPhrase: string;
}

const defaultState = {
  selectedUserId: null,
  searchedPhrase: null
};

export const userAdapter = createEntityAdapter<User>();
export const initialState: UsersState = userAdapter.getInitialState(defaultState);

export function reducer(state = initialState, action: UsersStoreActions.AlbumsActions): UsersState {
  switch (action.type) {
    case UsersStoreActions.LOAD_USERS:
      return {
        ...state
      };
    case UsersStoreActions.LOAD_USERS_SUCCESS:
        return userAdapter.addAll(action.payload.items,{
          ...state
        });
    case UsersStoreActions.CHANGE_SELECTED_USER:
        return {
          ...state,
          selectedUserId: action.payload.id
        };
    case UsersStoreActions.SEARCH_USER:
      return {
        ...state,
        searchedPhrase: action.payload.searchedPhrase
      };
    case UsersStoreActions.SEARCH_USER_SUCCESS:
      return userAdapter.addAll(action.payload.items, {...state});
    default:
      return state;
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = userAdapter.getSelectors();

export const selectUsersIds = selectIds;
export const selectUsersEntities = selectEntities;
export const selectAllUser = selectAll;
export const selectUsersTotal = selectTotal;

export const getSelectedId = (state: UsersState) => state.selectedUserId;
export const getUsersSearchedPhrase = (state: UsersState) => state.searchedPhrase;