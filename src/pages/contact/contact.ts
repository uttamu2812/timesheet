import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import {Employee} from '../../provider/employee'
import {TimesheetNotification} from '../../provider/timesheetNotification'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	  employees:any = [];
	  messages :any = [];
	  inputs :any =[];
	   deviceTokens :any =[];
  constructor(public navCtrl: NavController, public employee : Employee, public toastCtrl:ToastController, public alertCtrl:AlertController, public timesheetNotification:TimesheetNotification) {


  	this.employee.getEmployees().subscribe((resp) => {
       console.log(resp);
      this.employees=resp;

    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });



  }

selectEmployee(employee){


  if(employee.selected){
      employee.selected = false;
      this.deleteTkn(employee.deviceToken);
  }else{
     employee.selected = true;
       this.deviceTokens.push(employee.deviceToken);
  }


}

deleteTkn(deviceToken:string) {
    const index: number = this.deviceTokens.indexOf(deviceToken);
    if (index !== -1) {
        this.deviceTokens.splice(index, 1);
    }        
}

remainderPrompt() {

//get notifications

    this.employee.getNotifications().subscribe((resp) => {
       console.log(resp);
      this.messages=resp;
      this.inputs=[];
      for (var i = this.messages.length - 1; i >= 0; i--) {
        var input = {type: 'radio',label:this.messages[i].message,value:this.messages[i].message}
        this.inputs.push(input);
      }

  if(this.deviceTokens.length == 0){
    
  let alert = this.alertCtrl.create({
    title: 'Send Notification',
    subTitle: 'Please select employee before send.',
    buttons: ['close']
  });
  alert.present();

    }else{



   let alert = this.alertCtrl.create({
    title: 'Send Notification',
    inputs:this.inputs,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send',
        handler: data => {
            console.log(data);
           
               this.timesheetNotification.sendNotification(data, this.deviceTokens).subscribe((resp) => {
                  this.deviceTokens = [];
              for (var i = this.employees.length - 1; i >= 0; i--) {
                this.employees[i].selected = false;
              }

        let toast = this.toastCtrl.create({
        message: 'Notification has been send successfully.',
        duration: 3000,
        position: 'top'
      });
      toast.present();

    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

        }
      }
    ]
  });
  alert.present();
  }
console.log(this.inputs);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });



}


}
