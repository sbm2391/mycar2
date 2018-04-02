import { Component, OnInit, ElementRef, NgZone, ViewChild  } from '@angular/core';
import { SessionService } from '../services/session.service';
import { ActivatedRoute, Router} from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user;

// edit functions
showEditName:boolean = false;
showEditUsername:boolean = false;
showEditFamilyName:boolean = false;
showEditEmail:boolean = false;
showEditPhone:boolean = false;
showEditAddress:boolean = false;

// autocomplete
latitude: number;
longitude: number;
// maps
@ViewChild('search')
public searchElementRef: ElementRef;

// file uploader
uploader= new FileUploader({
    
});
  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
   this.getUser();
  }
  getUser() {
    this.sessionService.loggedIn()
    .subscribe(user => {
      this.user = user;
      this.uploader.options.url = `http://localhost:3000/api/user/${this.user._id}/addimg`;
    });
  }
  sendModification(){
    this.sessionService.patchItem(this.user)
    .subscribe(user => {
      this.user = user;
    });
    this.showEditUsername = false;
    this.showEditName = false;
    this.showEditFamilyName = false;
    this.showEditEmail = false;
    this.showEditPhone = false;
    this.showEditAddress = false;
  }
  updatePhoto() {
    this.uploader.queue[0].method="PATCH"
      console.log("voy a subir archivo")
      //form es un objeto interno de la instancia FileUploader
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = () => this.router.navigate(['/private']);
  }

  getReadyAutocomplete() {
    //load Places Autocomplete
    this.mapsAPILoader.load()
    .then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ['address']
    });
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        //set latitude, longitude and

        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.user.location.coordinates = [this.latitude, this.longitude];
      });
    });
  });
}
}
