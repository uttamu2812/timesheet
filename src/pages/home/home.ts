import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 timesheet : FormGroup;
 date :String;
 isAdmin:boolean;
  constructor(public navCtrl: NavController,private formBuilder: FormBuilder, public storage: Storage) {

               storage.get('isAdmin').then((val) => {
                  if (val) {
                    this.isAdmin = val;
                  }else{
                     this.isAdmin = val;
                  }
                    });

	var today = new Date();

	this.date = this.getDate(today);


  	 this.timesheet = this.formBuilder.group({
   		 id: [],
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
	])]


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
