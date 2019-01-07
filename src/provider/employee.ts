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
   this.uri="http://104.210.69.80:3000"
   }


  getMessages():Observable<any>{

     return this.http.get(this.uri+'/messages').map((response:Response) => response.json());
   
  }
  getNotifications():Observable<any>{
  	 return this.http.get(this.uri+'/messages').map((response:Response) => response.json());
  }

  getEmployees():Observable<any>{

     return this.http.get(this.uri+'/employees').map((response:Response) => response.json());
   
  }
    getEmployee(empId:String){

     return this.http.get(this.uri+'/employees?empId='+empId).map((response:Response) => response.json()).subscribe();
   
  }

  getLoggedEffort(date:String,empId:String):Observable<any>{

  return this.http.get(this.uri+'/effortLogged?associateId='+ empId +'&monyear='+date).map((response:Response) => response.json());
  }

  getLoggedEffortByDate(date:String):Observable<any>{

  return this.http.get(this.uri+'/effortLogged?monyear='+date).map((response:Response) => response.json());
  }

  save(employee: any):Observable<any> {
    if(employee.id != undefined){
         return this.http.put(this.uri+'/employees/'+employee.id, employee).map((response:Response) => response.json());
    }else{
         return this.http.post(this.uri+'/employees', employee).map((response:Response) => response.json());
    }

 
  }

  saveMessage(message: any):Observable<any> {
	 return this.http.post(this.uri+'/messages', message);
  }



  logEffort(effort: any) :Observable<any>{
        if(effort.id != undefined){
       return this.http.put(this.uri+'/effortLogged/'+effort.id , effort);
    }else{
       return this.http.post(this.uri+'/effortLogged', effort);
    }
  
  }

}
