import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response} from '@angular/http';
import { environment } from '../../environments/environment';



@Injectable()
export class OrderService {

base_URL= environment.baseURL+ 'api';
options= {withCredentials:true}
constructor(private http:Http) { }

handleError(e):Observable<any>{
    return Observable.throw(e.json().message);
  }

  patchItem(item):Observable<any>{
    return this.http.patch(`${this.base_URL}/order/` + item._id, item, this.options)
    .map((res:Response)=>res.json())
    .map(item=>item)
    .catch(e=>{
      console.log(e);
      return Observable.throw(e);
    });
  }

  addItem(item):Observable<any>{
    return this.http.post(`${this.base_URL}/order`, item, this.options)
      .map(res => res.json())
      .catch(err=>this.handleError(err));
  }
  
fetchItems():Observable<any>{
    return this.http.get(`${this.base_URL}/order`)
    .map((res:Response)=>res.json())
    .map(items=>items)
    .catch(e=>{
        console.log(e);
        return Observable.throw(e);
    });
    }
}