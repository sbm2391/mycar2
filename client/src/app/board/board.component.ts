import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
user;
  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.getUser();
   }
   getUser() {
     this.sessionService.loggedIn()
     .subscribe(user => {
       this.user = user;
     });
   }

}
