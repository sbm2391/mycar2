import { Component, OnInit, ElementRef, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
// agm
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  latitude: number;
  longitude: number;
  coordinates = [];
   // maps
   @ViewChild('search')
   public searchElementRef: ElementRef;

  constructor(
    private sessionService : SessionService, 
    private router : Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getReadyAutocomplete();
  }

// desabilite en mi controler
  sendSignupForm(myForm) {
    const newUser = {
      name: myForm.value.name,
      familyName: myForm.value.familyName,
      username: myForm.value.username,
      email: myForm.value.email,
      phone: myForm.value.phone,
      password: myForm.value.password,
      location: {
        address: myForm.value.address,
        coordinates: this.coordinates
      }
    }
    this.sessionService.signup(newUser)
      .subscribe(() => {
        // this.router.navigate(['private'])
        this.toastr.success(`Welcome ${newUser.username}!`);
        setTimeout (() => { this.router.navigate(['private']); }, 500);
      });
  }

  getReadyAutocomplete() {
    // load Places Autocomplete
    this.mapsAPILoader.load()
    .then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ['address']
    });
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.coordinates = [this.latitude, this.longitude];
      });
    });
  });
}
}
