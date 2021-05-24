import { createAction, props } from '@ngrx/store'
import { FriendUpdate } from 'src/app/ws.service'

const STORE_NAME = 'FRIENDS'

export namespace FriendsActions {
  export const StateUpdate = createAction(
    `[${STORE_NAME}] Full state update`,
    props<{ friends: { [id: string]: FriendUpdate } }>()
  )

  export const UpdateFriend = createAction(`[${STORE_NAME}] Friend update`, props<{ update: FriendUpdate }>())
}
