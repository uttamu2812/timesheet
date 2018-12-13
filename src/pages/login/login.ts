import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import {Employee} from '../../provider/employee'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {TabsPage} from '../tabs/tabs'

import { FCM } from '@ionic-native/fcm';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
/*account: { fName: string, lName: string, empId: string, cognizantMail: string, clientMailId: string, contactNumber: string } =
 { fName: "", lName: "", empId: "", cognizantMail: "", clientMailId: "", contactNumber: "" }*/

 account : FormGroup;
 isSigned: boolean;
 deviceToken: String;
 user :FormGroup;
  constructor(private platform: Platform, public navCtrl: NavController,  public employee : Employee, public toastCtrl:ToastController, private formBuilder: FormBuilder, public storage: Storage,  public fcm: FCM) {
     this.user = this.formBuilder.group({

      password: ['', Validators.required],

      cognizantMail: [      '', Validators.compose([
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ])]


    });

 this.account = this.formBuilder.group({
    id: [],
    deviceToken: [],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      empId: ['', Validators.compose([
		Validators.required,
		Validators.pattern('^[0-9]{4,}$')
	])],
      cognizantMail: [      '', Validators.compose([
		Validators.required,
		Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
	])],
     clientMailId:  [      '', Validators.compose([
		Validators.required,
		Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
	])],
    contactNumber:   ['', Validators.compose([
		Validators.required,
		Validators.pattern('^[0-9]{10}$')
	])]


    });
  this.deviceToken ="notfound";
  }




doLogin(){
  this.storage.set('isAdmin',true);
  this.navCtrl.push(TabsPage);
}

    doSignup() {
    // Attempt to login in through our User service

      if (this.platform.is('cordova')) {

      // register device
          //Notifications
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token=>{
        this.deviceToken = token;
      })
      //end notifications.

      //end
    }
    this.employee.save(this.account.value).subscribe((resp) => {
    	this.account.get('deviceToken').setValue(this.deviceToken );
     this.storage.set('loggedUser',resp);
     this.storage.set('isAdmin',false);

      this.navCtrl.push(TabsPage);
    }, (err) => {
     
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: "Error",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
