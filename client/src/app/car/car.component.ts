import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { SessionService } from '../services/session.service';
import { OrderService } from '../services/order.service';
declare var jquery:any;   // not required
declare var $ :any;

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


  constructor(
    private carService: CarService,
    private sessionService: SessionService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getCars();
    this. getUser();
    this.datePicker();
    this.hourPicker();
  }

  getCars() {
    this.carService.fetchItems()
    .subscribe(car => {
      this.cars = car;
    });
  }

  datePicker() {
    $(document).ready(function(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
  });
  }

  hourPicker() {
    $(document).ready(function(){
      $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
      });
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

  sendDateForm(myForm) {
    console.log(myForm.value)
  }

}
