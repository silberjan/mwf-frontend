import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { GeoJSONSource, Map } from 'mapbox-gl'
import { auditTime, map } from 'rxjs/operators'
import { MARKER_PAINT } from 'src/constants/marker-paint'
import { RootState } from 'src/store/app.store'
import { fromFriends } from 'src/store/friends/friends.selectors'
import { fromMapboxEvent } from 'src/util/from-mapbox-event'
import { WsService } from './ws.service'

@Component({
  selector: 'mwf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true }) private mapRef: ElementRef<HTMLElement>

  private map: Map

  constructor(private store: Store<RootState>, private wss: WsService) {}

  ngOnInit(): void {
    this.map = new Map({
      center: { lat: 52.52, lng: 13.4 },
      zoom: 10,
      container: this.mapRef.nativeElement,
      style: 'https://maps.targomo.com/styles/positron-gl-style.json',
    })

    this.map.once('load', () => {
      const center$ = fromMapboxEvent('move', this.map)
        .pipe(
          map(() => this.map.getCenter()),
          auditTime(100)
        )
        .subscribe((e) => {
          this.wss.updatePointer(e)
        })

      this.wss.updatePointer(this.map.getCenter())

      const friendsSource$ = this.store.pipe(select(fromFriends.friendsGeoJson))
      const FRIENDS_SOURCE_ID = 'friends-source'
      friendsSource$.subscribe((source) => {
        const exsitingSource = this.map.getSource(FRIENDS_SOURCE_ID) as GeoJSONSource
        if (exsitingSource) {
          exsitingSource.setData(source.data)
        } else {
          this.map.addSource(FRIENDS_SOURCE_ID, source)
        }
      })
      const FRIENDS_LAYER_ID = 'friends-layer'
      this.map.addLayer({ type: 'circle', source: FRIENDS_SOURCE_ID, id: FRIENDS_LAYER_ID, paint: MARKER_PAINT })
    })
  }
}
