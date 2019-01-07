import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TemplatePage } from '../template/template';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = TemplatePage;
  isAdmin:boolean;
  isAssociate:boolean;
  constructor(public storage: Storage) {
  	            storage.get('isAdmin').then((val) => {
                  if (val) {
                    this.isAdmin = val;
                    this.isAssociate= !val;
                  }else{
                     this.isAdmin = val;
                      this.isAssociate= !val;
                  }
                    });
  }
}
