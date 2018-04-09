import { Component, OnInit, HostListener } from '@angular/core';
import { SessionService } from '../services/session.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
user;
userId;
newOrder;


  constructor(
    private sessionService: SessionService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getUser();
   }
   
   getUser() {
    this.sessionService.fetchItem()
    .subscribe(user => {
      this.user = user;
    });

  }

  openCheckout(order) {
    order.paid = true;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
      }
    });
    
    console.log(handler)
    handler.open({
      name: 'MyCar',
      description: 'Payment',
      amount: order.total * 100
    });
    var that=this
    setTimeout (() => { 
      this.patchOrder(that.newOrder)
    }, 60000);
   this.patchOrder(order)
  }


     patchOrder(order){
    this.orderService.patchItem(order)
    .subscribe((order) => {
    });
  }

}
