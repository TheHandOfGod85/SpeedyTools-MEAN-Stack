import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { HttpErrorHandlerProvider } from './core/interceptors/http-error.interceptor'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'SpeedyTools',
            maxAge: 25,
            logOnly: !isDevMode()
        }),
        EffectsModule.forRoot([])
    ],
    providers: [HttpErrorHandlerProvider],
    bootstrap: [AppComponent]
})
export class AppModule {}
