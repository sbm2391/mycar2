import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars;
  //poner despues padre e hijo
  user;
  lat;
  lng;
  //termina- poner despues padre e hijo
  maxKm= 3;
  km;
  today = Date.now();

  constructor(
    private carService: CarService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.getCars();
    this. getUser();
  }

  getCars(){
    this.carService.fetchItems()
    .subscribe(car => {
      this.cars = car;
    });
  }
  getUser() {
    this.sessionService.loggedIn()
      .subscribe(user => {
        this.user = user;
        this.lat = this.user.location.coordinates[0];
        this.lng = this.user.location.coordinates[1];
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

}
