import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user;
  constructor(
    private sessionService: SessionService
  ) { }

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
