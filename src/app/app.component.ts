import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


import { FCM } from '@ionic-native/fcm';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(public storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private fcm: FCM,) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
            storage.get('loggedUser').then((val) => {
                  if (val) {
                    this.rootPage = TabsPage;
                  }else{
                     this.rootPage = LoginPage;
                  }
                    });
                  
      statusBar.styleDefault();
      splashScreen.hide();


        if (platform.is('cordova')) {

          //Notifications
      fcm.subscribeToTopic('all');
      fcm.getToken().then(token=>{
          console.log(token);
          alert(token);
      })
      fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
           alert(JSON.stringify(data));
        } else {
          console.log("Received in foreground");
           alert(JSON.stringify(data));
        };
      })
      fcm.onTokenRefresh().subscribe(token=>{
        console.log(token);
      });
      //end notifications.

      } else {
    // You're testing in browser, do nothing or mock the plugins' behaviour.
    //
    // var url: string = 'assets/mock-images/image.jpg';
    }

    });
  }
}
