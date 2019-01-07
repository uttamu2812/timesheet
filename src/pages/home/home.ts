import { Component } from '@angular/core';
import { NavController , ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {Employee} from '../../provider/employee'
import {TabsPage} from '../tabs/tabs'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 timesheet : FormGroup;
 date :String;
 empId :String;
 isAdmin:boolean;
 logEffortList:any;
  constructor(public navCtrl: NavController,private formBuilder: FormBuilder,public toastCtrl:ToastController, public storage: Storage, public employee : Employee) {



	var today = new Date();
  var loggedEffort:any;
	this.date = this.getDate(today);


  	 this.timesheet = this.formBuilder.group({
   		 id: [],
        monyear: [],
        associateId: [],
         associateName: [],
        week1:   ['', Validators.compose([
		Validators.required,
		Validators.pattern('^[0-9]{2}$')
		])],
         week2:   ['', Validators.compose([
		Validators.required,
		Validators.pattern('^[0-9]{2}$')
		])],
   		 week3:   ['', Validators.compose([
		Validators.required,
		Validators.pattern('^[0-9]{2}$')
		])],
   		 week4:   ['', Validators.compose([
		Validators.required,
		Validators.pattern('^[0-9]{2}$')
	])],
        clWeek1:   ['', Validators.compose([
    Validators.required,
    Validators.pattern('^[0-9]{2}$')
    ])],
         clWeek2:   ['', Validators.compose([
    Validators.required,
    Validators.pattern('^[0-9]{2}$')
    ])],
        clWeek3:   ['', Validators.compose([
    Validators.required,
    Validators.pattern('^[0-9]{2}$')
    ])],
        clWeek4:   ['', Validators.compose([
    Validators.required,
    Validators.pattern('^[0-9]{2}$')
  ])]


    });

               storage.get('isAdmin').then((val) => {
                  if (val) {
                    this.isAdmin = val;

                       this.employee.getLoggedEffortByDate(this.date).subscribe((resp) => {
                           this.logEffortList = resp;

                           for (var i = this.logEffortList.length - 1; i >= 0; i--) {
                             var total =0;
                             if( this.logEffortList[i].week1==""){
                               this.logEffortList[i].week1=0;
                             }else{
                               total+=parseInt(this.logEffortList[i].week1);
                             }
                             if( this.logEffortList[i].week2==""){
                               this.logEffortList[i].week2=0;
                             }else{
                               total+=parseInt(this.logEffortList[i].week2);
                             }
                              if( this.logEffortList[i].week3==""){
                               this.logEffortList[i].week3=0;
                             }else{
                               total+=parseInt(this.logEffortList[i].week3);
                             }
                              if( this.logEffortList[i].week4==""){
                               this.logEffortList[i].week4=0;
                             }else{
                               total+=parseInt(this.logEffortList[i].week4);
                             }                                                                                     
                            this.logEffortList[i].total=total;

                            var clTotal =0;
                             if( this.logEffortList[i].clWeek1==""){
                               this.logEffortList[i].clWeek1=0;
                             }else{
                               clTotal+=parseInt(this.logEffortList[i].clWeek1);
                             }
                             if( this.logEffortList[i].clWeek2==""){
                               this.logEffortList[i].clWeek2=0;
                             }else{
                               clTotal+=parseInt(this.logEffortList[i].clWeek2);
                             }
                              if( this.logEffortList[i].clWeek3==""){
                               this.logEffortList[i].clWeek3=0;
                             }else{
                               clTotal+=parseInt(this.logEffortList[i].clWeek3);
                             }
                              if( this.logEffortList[i].clWeek4==""){
                               this.logEffortList[i].clWeek4=0;
                             }else{
                               clTotal+=parseInt(this.logEffortList[i].clWeek4);
                             } 
                              this.logEffortList[i].clTotal=clTotal; 
                              
                               }
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

                  }else{
                     this.isAdmin = val;
                  storage.get('loggedUser').then((val) => {
                  if (val) {
                    this.empId=val.empId;
                        this.employee.getLoggedEffort(this.date,this.empId).subscribe((resp) => {
    loggedEffort = resp;
    this.timesheet.get('monyear').setValue(this.date);
     this.timesheet.get('associateId').setValue(this.empId);
     this.timesheet.get('associateName').setValue(val.fName+" "+val.lName);
      if(loggedEffort.length > 0){
         this.timesheet.get('id').setValue(loggedEffort[0].id);
        this.timesheet.get('week1').setValue(loggedEffort[0].week1);
        this.timesheet.get('week2').setValue(loggedEffort[0].week2);
        this.timesheet.get('week3').setValue(loggedEffort[0].week3);
        this.timesheet.get('week4').setValue(loggedEffort[0].week4);
        this.timesheet.get('clWeek1').setValue(loggedEffort[0].clWeek1);
        this.timesheet.get('clWeek2').setValue(loggedEffort[0].clWeek2);
        this.timesheet.get('clWeek3').setValue(loggedEffort[0].clWeek3);
        this.timesheet.get('clWeek4').setValue(loggedEffort[0].clWeek4);
      }else{
                this.timesheet.get('week1').setValue("0");
        this.timesheet.get('week2').setValue("0");
        this.timesheet.get('week3').setValue("0");
        this.timesheet.get('week4').setValue("0");
        this.timesheet.get('clWeek1').setValue("0");
        this.timesheet.get('clWeek2').setValue("0");
        this.timesheet.get('clWeek3').setValue("0");
        this.timesheet.get('clWeek4').setValue("0");
      }

    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
                  }
                    });
                  }
                    });


  }



submitSheet(){
   this.employee.logEffort(this.timesheet.value).subscribe((resp) => {
            let toast = this.toastCtrl.create({
        message: 'Timesheet has been updated successfully.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.push(TabsPage);

    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
}

 getDate(date:Date) {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = date.getDate();
    var month_index = date.getMonth();
    var year = date.getFullYear();
    
    return  month_names[month_index] + "-" + year;
}

}
