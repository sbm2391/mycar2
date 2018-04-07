import { Component, OnInit, Input } from '@angular/core';
import { CarService } from '../services/car.service';
import { SessionService } from '../services/session.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() theLat: any;
  @Input() theLng: any;
  cars;
  //poner despues padre e hijo
  user;
  // lat;
  // lng;
  //termina- poner despues padre e hijo
  maxKm= 3;
  km;


  constructor(
    private carService: CarService,
    private sessionService: SessionService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCars();
    this. getUser();

  }

  getCars() {
    this.carService.fetchItems()
    .subscribe(car => {
      this.cars = car;
    });
  }
  

  getUser() {
    this.sessionService.loggedIn()
      .subscribe(user => {
        this.user = user;
        this.theLat = this.user.location.coordinates[0];
        this.theLng = this.user.location.coordinates[1];
      });
  }
  getDistance(lat2, lng2) {
    var rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( lat2 - this.theLat );
    var dLong = rad(lng2 - this.theLng );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(this.theLat)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    this.km = d.toFixed(2); //Retorna tres decimales
    return this.km;
  }

  sendDateForm(myForm, carId, carPrice) {
    const newOrder = {
      startDate: myForm.value.startDate,
      endDate: myForm.value.endDate,
      _car             : carId
    }
    this.orderService.addItem(newOrder)
    .subscribe(order => {
      this.router.navigate(['orders'])
    })
  }

}
