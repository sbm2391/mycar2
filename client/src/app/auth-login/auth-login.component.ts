import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  formInfo = {
    username: '',
    password: ''
  };

  constructor (
    private sessionS : SessionService, 
    private route: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  sendForm () {
     this.sessionS.login(this.formInfo.username,this.formInfo.password)
       .subscribe(respuesta => {
         console.log("hola")
          this.toastr.success('Welcome!', 'Success');
          setTimeout (() => { this.route.navigate(['private']); }, 1000);
    });
  }
}
