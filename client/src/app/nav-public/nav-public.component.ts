import { Component, OnInit } from '@angular/core';
declare var jquery:any;   // not required
declare var $ :any;  

@Component({
  selector: 'app-nav-public',
  templateUrl: './nav-public.component.html',
  styleUrls: ['./nav-public.component.css']
})
export class NavPublicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      ($('.button-collapse')as any).sideNav();
    });
  }

}
