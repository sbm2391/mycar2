import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SessionService } from './services/session.service';

import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { MyPrivatePageComponent } from './my-private-page/my-private-page.component';

import { routes } from './routes/app.routing'
import { RouterModule } from '@angular/router';
// materializecss
import { MaterializeModule } from 'angular2-materialize';
// components
import { NavPublicComponent } from './nav-public/nav-public.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
// google maps
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    MyPrivatePageComponent,
    NavPublicComponent,
    HomeComponent,
    FooterComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpW6TUBIPxhP7Zx9zKbv1yCOnbX94b6Qc',
      libraries: ['places']
    })
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
