import { Component, ViewChild } from '@angular/core';
import { Platform,  AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
 @ViewChild(Nav) nav: Nav;
  constructor(public alertCtrl: AlertController, private push: Push, public storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {



const options: PushOptions = {
   android: {
     senderID: '311864479557'
   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {},
   browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
   }
};

const pushObject: PushObject = this.push.init(options);


pushObject.on('notification').subscribe((data: any) => {
        console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'Timesheet Remainder.',
          message: data.message,
          buttons: [{
            text: 'Ok',
            role: 'cancel'
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.nav.push(TabsPage, { message: data.message });
        console.log('Push notification clicked');
      }
});

/*pushObject.on('registration').subscribe((registration: any) => {
          let confirmAlert = this.alertCtrl.create({
          title: 'Registered',
          inputs:[{type: 'text',label:'Token',value:registration.registrationId}],
          buttons: [{
            text: 'Ok',
            role: 'cancel'
          
          }]
        });
        confirmAlert.present();
  console.log('Device registered', registration)
});*/

pushObject.on('error').subscribe(error => {
  console.error('Error with Push plugin', error)
  alert(error);
});

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
            storage.get('loggedUser').then((val) => {
                  if (val) {
                    this.rootPage = TabsPage;
                  }else{
                   storage.get('isAdmin').then((val1) => {
                  if (val1) {
                    this.rootPage = TabsPage;
                  }else{

                     this.rootPage = LoginPage;
                  }
                    });


                  }
                    });
                  
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
