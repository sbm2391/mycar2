import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-nav-private',
  templateUrl: './nav-private.component.html',
  styleUrls: ['./nav-private.component.css']
})
export class NavPrivateComponent implements OnInit {
  userId;
  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {}

}
