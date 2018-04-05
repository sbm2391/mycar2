import { Component, OnInit,  Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SessionService } from '../services/session.service';
declare var jquery:any;   // not required
declare var $ :any;

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit , AfterViewInit{
  user;
  userAddress;
  userCoordinates;
  userLocalizacion;
  selectedLocation = '';
  localizacion=[
  {
      address:"Aeropuerto Internacional de la Ciudad de México",
      coordinates:[19.4360762,-99.0719083]
    },
{
      address:"Centro historico de México",
      coordinates:[19.4336517,-99.1541865]
    }
  ];
  
  constructor(private sessionService: SessionService) { }
  @Output() sendSearch = new EventEmitter<any>();
  ngOnInit() {
    
    this.sessionService.loggedIn()
      .subscribe(user => {
        this.user = user;
        this.userAddress= user.location.address;
        this.userCoordinates=user.location.coordinates;
        this.userLocalizacion={address:this.userAddress, coordinates: this.userCoordinates}
        //determino un valor para que no sea undefine
        this.selectedLocation=this.userLocalizacion;
        // console.log(this.userLocalizacion)
        this.localizacion.push(this.userLocalizacion);
        console.log(this.localizacion)
      });
  }

  ngAfterViewInit(){
    console.log("done")

    setTimeout(() => {
      $('select').material_select();

    }, 300);
  }

  onSubmit(){
   
    console.log(this.selectedLocation)
    this.sendSearch.emit(this.selectedLocation);

  }


}
