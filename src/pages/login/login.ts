import {Component, OnInit} from "@angular/core";
import {AlertController, MenuController, NavController, NavParams} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{
  ngOnInit(): void {

  }

  constructor(public alertController: AlertController, public statusBar: StatusBar, public menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    menu.swipeEnable(false);
    this.statusBar.backgroundColorByHexString('#66ccff')
  }
}
