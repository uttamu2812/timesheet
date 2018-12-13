import { Injectable } from '@angular/core';
/*import { HttpClient, HttpParams } from '@angular/common/http';*/
 import { Http, Response, Headers, RequestOptions } from '@angular/http' 
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class Employee {

uri:String;

  constructor(private http:Http) {
     //this.uri="http://localhost:3000"
    this.uri="https://timesheet-96181.firebaseapp.com/api"
   }


getMessages():Observable<any>{

   return this.http.get(this.uri+'/messages').map((response:Response) => response.json());
 
}
getNotifications(){
	 return this.http.get(this.uri+'/messages').map((response:Response) => response.json());
}

getEmployees():Observable<any>{

   return this.http.get(this.uri+'/employees').map((response:Response) => response.json());
 
}

  save(employee: any):Observable<any> {
    if(employee.id != undefined){
         return this.http.put(this.uri+'/employees/'+employee.id, employee).map((response:Response) => response.json());
    }else{
         return this.http.post(this.uri+'/employees', employee).map((response:Response) => response.json());
    }

 
  }

  saveMessage(message: any) {
	 return this.http.post(this.uri+'/messages', message);
  }


}
