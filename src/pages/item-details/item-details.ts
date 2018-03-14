import {Component} from '@angular/core';

import {AlertController, NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public alertController: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  showDialog(message: string) {
    let alert = this.alertController.create({
      title: "dialog",
      message: message,
      buttons: ["OK"]
    });
    alert.present();
  }
}
