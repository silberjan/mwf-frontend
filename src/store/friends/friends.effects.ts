import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { RootState } from '../app.store'

@Injectable()
export class FriendsEffects {
  constructor(private actions$: Actions, private store: Store<RootState>) {}
}
