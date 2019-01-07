import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http/';
import { HttpHeaders } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class TimesheetNotification {


 constructor(private http:HttpClient) {

   }

sendNotification(message:String,deviceToken:String) :Observable<any>
{  
/*let body = {
    "notification":{
      "title":"MGM Timesheet Notification",
      "body":message,
      "sound":"default",
      "click_action":"FCM_PLUGIN_ACTIVITY",
      "icon":"fcm_push_icon"
    },
    "data":{
      "param1":"value1",
      "param2":"value2"
    },
      "to":"/topics/all",
      "priority":"high",
      "restricted_package_name":""
  }*/
  let body =  {
   "data":{
     "title":"MGM Timesheet Notification",
     "message":message
       },
   "registration_ids":deviceToken
 }
  let options = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post("https://fcm.googleapis.com/fcm/send",body,{
    headers: options.set('Authorization', 'key=AIzaSyDQbRKg55jf9Z195Dy6g5IFiFbTHTtMy4U'),
  });
}

}