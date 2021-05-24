import { ActionReducerMap } from '@ngrx/store'
import { FriendsEffects } from './friends/friends.effects'
import { friendsReducer, FriendsState, STORE_KEY } from './friends/friends.reducer'

export interface RootState {
  [STORE_KEY]: FriendsState
}

export const reducers: ActionReducerMap<RootState> = {
  [STORE_KEY]: friendsReducer,
}

export const effects = [FriendsEffects]
