import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";

@Component({
  selector: 'app-my-private-page',
  templateUrl: './my-private-page.component.html',
  styleUrls: ['./my-private-page.component.css']
})
export class MyPrivatePageComponent implements OnInit {
  username: string = "";


  constructor(private session: SessionService) { }

  ngOnInit() {
    this.session.loggedIn()
      .subscribe(user => {
        this.username = user.username;
      });
  }
}
