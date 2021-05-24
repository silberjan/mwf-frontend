import { createFeatureSelector, createSelector } from '@ngrx/store'
import { GeoJSONSourceRaw } from 'mapbox-gl'
import { friendsAdapter, FriendsState, STORE_KEY } from './friends.reducer'

export namespace fromFriends {
  export const friendsState = createFeatureSelector<FriendsState>(STORE_KEY)

  export const { selectIds, selectEntities, selectAll } = friendsAdapter.getSelectors(friendsState)

  // /**
  //  * Mapbox source for the locations
  //  */
  export const friendsGeoJson = createSelector(
    selectAll,
    (friends) =>
      ({
        type: 'geojson',
        promoteId: '_id',
        data: {
          type: 'FeatureCollection',
          features: friends.map(({ id, pointer }) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [pointer.lng, pointer.lat] },
            properties: {
              _id: id,
            },
          })),
        },
      } as GeoJSONSourceRaw)
  )
}
