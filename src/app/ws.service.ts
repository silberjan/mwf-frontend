import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { RootState } from 'src/store/app.store'
import { FriendsActions } from 'src/store/friends/friends.actions'

export interface LatLng {
  lat: number
  lng: number
}

export interface FriendUpdate {
  id: string
  pointer?: LatLng
}

@Injectable({ providedIn: 'root' })
export class WsService {
  ws$: WebSocketSubject<FriendUpdate | { [id: string]: FriendUpdate }>
  id: string

  constructor(private store: Store<RootState>) {
    this.ws$ = webSocket('ws://localhost:1337')
    this.id = Math.floor(Math.random() * 1000).toString()
    this.ws$.subscribe((fullOrSingleUpdate) => {
      if (fullOrSingleUpdate.id) {
        const update = fullOrSingleUpdate as FriendUpdate
        this.store.dispatch(FriendsActions.UpdateFriend({ update }))
      } else {
        const friends = fullOrSingleUpdate as { [id: string]: FriendUpdate }
        this.store.dispatch(FriendsActions.StateUpdate({ friends }))
      }
    })
  }

  updatePointer(pointer: LatLng) {
    this.ws$.next({ id: this.id, pointer })
  }
}
