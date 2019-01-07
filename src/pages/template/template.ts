import { Component } from '@angular/core';
import { NavController , ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {Employee} from '../../provider/employee'
import {TabsPage} from '../tabs/tabs'
@Component({
  selector: 'page-template',
  templateUrl: 'template.html'
})
export class TemplatePage {
 template :FormGroup;
 templateList :any;
  constructor(public navCtrl: NavController,  public employee : Employee, public toastCtrl:ToastController, private formBuilder: FormBuilder) {
     this.template = this.formBuilder.group({
     	id: [],
      message: ['', Validators.required]


    });

     this.employee.getNotifications().subscribe((resp) => {
 	    	 this.templateList = resp;
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
 save(){
 	    this.employee.saveMessage(this.template.value).subscribe((resp) => {
 	    	this.templateList.push(this.template.value);
 	    	this.template.get('message').setValue("");
             let toast = this.toastCtrl.create({
        message: "Successfully saved.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
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