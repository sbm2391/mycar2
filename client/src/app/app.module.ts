import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// services
import { SessionService } from './services/session.service';
import { ParkingService } from './services/parking.service';
import { CarService } from './services/car.service';
import { OrderService } from './services/order.service';
// components
import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { MyPrivatePageComponent } from './my-private-page/my-private-page.component';
import { NavPublicComponent } from './nav-public/nav-public.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';

// Routes
import { routes } from './routes/app.routing';
import { RouterModule } from '@angular/router';

// materializecss
import { MaterializeModule } from 'angular2-materialize';

// google maps
import { AgmCoreModule } from '@agm/core';
import { NavPrivateComponent } from './nav-private/nav-private.component';
import { ProfileComponent } from './profile/profile.component';
import { CarComponent } from './car/car.component';
import { BoardComponent } from './board/board.component';

// upload images
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    MyPrivatePageComponent,
    NavPublicComponent,
    HomeComponent,
    FooterComponent,
    MapComponent,
    NavPrivateComponent,
    ProfileComponent,
    CarComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpW6TUBIPxhP7Zx9zKbv1yCOnbX94b6Qc',
      libraries: ['places']
    })
  ],
  providers: [
    SessionService,
    ParkingService,
    CarService,
    OrderService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
