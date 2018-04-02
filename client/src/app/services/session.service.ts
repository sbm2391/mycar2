import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response} from '@angular/http';

@Injectable()
export class SessionService {
  base_URL= 'http://localhost:3000/api';
  options= {withCredentials: true};
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  // Primera forma de enviar datos a nuestro Back-End
  login(username,password){
    return this.http.post(`${this.base_URL}/login`,{username,password}, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err))
  }

// Segunda forma de enviar datos a nuestro Back-End
  signup(formSignup){
    return this.http.post(`${this.base_URL}/signup`,formSignup, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err));
  }

  loggedIn(){
    return this.http.get(`${this.base_URL}/loggedin`, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err));
  }

  logout(){
    return this.http.post(`${this.base_URL}/logout`, {})
      .map(res=> res.json())
      .catch(err => this.handleError(err) );
  }



  patchItem(item):Observable<any>{
    return this.http.patch(`${this.base_URL}/user/`+ item._id, item)
    .map((res:Response)=>res.json())
    .map(item=>item)
    .catch(e=>{
      console.log(e);
      return Observable.throw(e);
    })
  }

  fetchItem():Observable<any>{
      return this.http.get(`${this.base_URL}/user/profile`, this.options)
      .map((res:Response)=>res.json())
      .map(item=>item)
      .catch(e=>{
        console.log(e);
        return Observable.throw(e);
      })
    }
}
