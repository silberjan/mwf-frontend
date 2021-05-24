import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { FriendUpdate } from 'src/app/ws.service'
import { FriendsActions } from './friends.actions'

export const STORE_KEY = 'friends'

export interface FriendsState extends EntityState<FriendUpdate> {}

export const friendsAdapter = createEntityAdapter<FriendUpdate>()

export const friendsInitialState: FriendsState = friendsAdapter.getInitialState()

const reducer = createReducer(
  friendsInitialState,
  on(FriendsActions.StateUpdate, (state, { friends }) => ({ ids: Object.keys(friends), entities: friends })),
  on(FriendsActions.UpdateFriend, (state, { update }) => friendsAdapter.upsertOne(update, state))
)

export function friendsReducer(state: FriendsState | undefined, action: Action): FriendsState {
  return reducer(state, action)
}
