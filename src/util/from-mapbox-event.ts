import { NgZone } from '@angular/core'
import { MapEventType, Map } from 'mapbox-gl'
import { Observable, Observer } from 'rxjs'
import { share } from 'rxjs/operators'

/**
 * Creates an observable from a mapbox event
 * @param {T} eventName Name of the mapbox event
 * @param {Map} mapBoxMap Map object from mapbox-gl
 * @param {rxmapbox} zone Angular zone
 */
export function fromMapboxEvent<T extends keyof MapEventType>(
  eventName: T,
  mapBoxMap: Map,
  zone?: NgZone
): Observable<MapEventType[T]> {
  return new Observable((observer: Observer<MapEventType[T]>) => {
    function listener(evt: MapEventType[T]) {
      if (!!zone) {
        zone.run(() => observer.next(evt))
      } else {
        observer.next(evt)
      }
    }
    mapBoxMap.on(eventName, listener)
    mapBoxMap.once('remove', () => observer.complete())

    return () => {
      mapBoxMap.off(eventName, listener)
    }
  }).pipe(share())
}
