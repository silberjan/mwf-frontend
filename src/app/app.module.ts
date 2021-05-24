import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { effects, reducers } from 'src/store/app.store'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forRoot(reducers), EffectsModule.forRoot(effects)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
