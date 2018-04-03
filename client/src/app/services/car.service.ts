import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CarService {
base_URL= environment.baseURL+ 'api';
options= {withCredentials:true}
constructor(private http:Http) { }

handleError(e) {
    return Observable.throw(e.json().message);
  }

fetchItems():Observable<any>{
return this.http.get(`${this.base_URL}/car`)
.map((res:Response)=>res.json())
.map(items=>items)
.catch(e=>{
    console.log(e);
    return Observable.throw(e);
});

}

patchItem(item):Observable<any>{
    return this.http.patch(`${this.base_URL}/car/`+ item._id, item)
    .map((res:Response)=>res.json())
    .map(item=>item)
    .catch(e=>{
        console.log(e);
        return Observable.throw(e);
    })
    }

}
