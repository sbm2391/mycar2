import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
user;
userId;

  constructor(private sessionService: SessionService) { }

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
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'MyCar',
      description: 'Payment',
      amount: order.total * 100
    });

  }

}
