import {Component, ViewChild} from '@angular/core';

import {Platform, MenuController, Nav} from 'ionic-angular';

import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {JPush} from "@jiguang-ionic/jpush";


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public jPush: JPush) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Hello Ionic', component: HelloIonicPage},
      {title: 'My First List', component: ListPage}
    ];
  }

  //初始化
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Okay, so the platform is ready and our plugins are available.
      this.statusBar.backgroundColorByName('white');
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.jPush.init()
      this.jPush.setDebugMode(true)

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  openLogin() {
    this.menu.close();
    this.nav.push(LoginPage)
  }
}
