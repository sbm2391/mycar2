import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../services/parking.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 0;
  lng: number = 0;
  zoom: number = 13;

  parkings;
  user;

  km;
  constructor( private parkingService: ParkingService, private sessionService: SessionService) { }

  ngOnInit() {
    this.getUser();
    this.getParkings();
  }

  getUser() {
    this.sessionService.loggedIn()
      .subscribe(user => {
        this.user = user;
        this.lat = this.user.location.coordinates[0];
        this.lng = this.user.location.coordinates[1];
      });
     
  }

  getParkings() {
    this.parkingService.fetchItems()
    .subscribe(parking => {
      this.parkings = parking;
    });
  }

  getDistance(lat2, lng2) {
    var rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( lat2 - this.lat );
    var dLong = rad(lng2 - this.lng );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(this.lat)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    this.km = d.toFixed(2); //Retorna tres decimales
    return this.km;
  }
  receiveSearch(selectedLocation){

    selectedLocation = selectedLocation.split(',');
    this.lat = Number(selectedLocation[0]);
    this.lng = Number(selectedLocation[1]);
  }

}
