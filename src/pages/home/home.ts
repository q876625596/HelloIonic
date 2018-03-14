import {Component} from "@angular/core";
import {AlertController, MenuController, NavController, NavParams} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {HomeList} from "./HomeList";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  myList = HomeList.myList;
  constructor(public alertController: AlertController, public statusBar: StatusBar, public menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {

  }
}
