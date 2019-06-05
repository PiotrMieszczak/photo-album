import { User } from '../../models/indx';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { UsersStoreActions } from '../../actions/index';

export interface UsersState  extends EntityState<User> {
  selectedUserId: number;
}

const defaultState = {
  selectedUserId: null
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