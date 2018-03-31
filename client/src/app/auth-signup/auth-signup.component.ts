import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
// agm
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

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
// por defecto hace una llamada post a nuestro back-end
uploader: FileUploader = new FileUploader({
  url: 'http://localhost:3000/api/auth/signup'
});

  constructor(
    private sessionService : SessionService, 
    private router : Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.getReadyAutocomplete();
  }
  sendsignup(newUser) {
    console.log(newUser.value);
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('username', newUser.value.username);
      form.append('name', newUser.value.name);
      form.append('familyName', newUser.value.familyName);
      form.append('email', newUser.value.email);
      form.append('phone', newUser.value.phone);
      // form.append('location.address', newUser.value.address);
      // form.append('location.coordinates', this.coordinates);
      form.append('password', newUser.value.password);
    };

   
    console.log('subiendo');
    this.uploader.uploadAll(); // post Call to Url
    this.uploader.onCompleteItem = () => this.router.navigate(['private']); // como el subscribe el onCompleteItem
  }
  // sendSignupForm(myForm) {
  //   console.log(myForm.value);
  //   this.sessionService.signup(myForm.value)
  //     .subscribe(() => {
  //       this.router.navigate(['private'])
  //     });
  // }
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
        // console.log(this.latitude);
        // console.log(this.longitude);
        this.coordinates = [this.latitude, this.longitude];

        // console.log(this.coordinates);
      });
    });
  });
}
}
