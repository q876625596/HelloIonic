import {Component} from "@angular/core";
import {AlertController, MenuController, NavController, NavParams} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {HomeList} from "./HomeList";
import {JPush} from "@jiguang-ionic/jpush";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  public registerId: string;
  devicePlatform: string;
  sequence: number = 0;

  myList = [];

  tagResultHandler = function (result) {
    let sequence: number = result.sequence;
    let tags: Array<string> = result.tags == null ? [] : result.tags;
    alert('Success!' + '\nSequence: ' + sequence + '\nTags: ' + tags.toString());
  };
  aliasResultHandler = function (result) {
    let sequence: number = result.sequence;
    let alias: string = result.alias;
    alert('Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias);
  };

  errorHandler = function (err) {
    let sequence: number = err.sequence;
    let code = err.code;
    alert('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code);
  };

  constructor(public jPush: JPush,
              public alertController: AlertController,
              public statusBar: StatusBar,
              public menu: MenuController,
              public navCtrl: NavController,
              public navParams: NavParams) {

    for (let item of HomeList.myList) {
      this.myList.push(item)
    }
    document.addEventListener('jpush.receiveNotification', (event: any) => {
      let content;
      if (this.devicePlatform == 'Android') {
        content = event.alert;
      } else {
        content = event.aps.alert;
      }
      alert('Receive notification: ' + JSON.stringify(event));
    }, false);

    document.addEventListener('jpush.openNotification', (event: any) => {
      let content;
      if (this.devicePlatform == 'Android') {
        content = event.alert;
      } else {  // iOS
        if (event.aps == undefined) { // 本地通知
          content = event.content;
        } else {  // APNS
          content = event.aps.alert;
        }
      }
      alert('open notification: ' + JSON.stringify(event));
    }, false);

    document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
      // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
      let content;
      if (this.devicePlatform == 'Android') {
      } else {
        content = event.content;
      }
      alert('receive local notification: ' + JSON.stringify(event));
    }, false);
  }

  getRegistrationID() {
    this.jPush.getRegistrationID()
      .then(rId => {
        this.registerId = rId;
        alert(this.registerId)
      });

  }

  setTags() {
    this.jPush.setTags({sequence: this.sequence++, tags: ['Tag1', 'Tag2']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  addTags() {
    this.jPush.addTags({sequence: this.sequence++, tags: ['Tag3', 'Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  checkTagBindState() {
    this.jPush.checkTagBindState({sequence: this.sequence++, tag: 'Tag1'})
      .then(result => {
        let sequence = result.sequence;
        let tag = result.tag;
        let isBind = result.isBind;
        alert('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind);
      }).catch(this.errorHandler);
  }

  deleteTags() {
    this.jPush.deleteTags({sequence: this.sequence++, tags: ['Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  getAllTags() {
    this.jPush.getAllTags({sequence: this.sequence++})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  cleanTags() {
    this.jPush.cleanTags({sequence: this.sequence++})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  setAlias() {
    this.jPush.setAlias({sequence: this.sequence++, alias: 'TestAlias'})
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  getAlias() {
    this.jPush.getAlias({sequence: this.sequence++})
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  deleteAlias() {
    this.jPush.deleteAlias({sequence: this.sequence++})
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }

  addLocalNotification() {
    if (this.devicePlatform == 'Android') {
      this.jPush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
    } else {
      this.jPush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
    }
  }

  liked(item) {
    item.like = !item.like;
  }

  doCollection(item) {
    item.collection = !item.collection
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.myList.splice(0, this.myList.length);
      for (let item of HomeList.myList) {
        this.myList.push(item)
      }
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let item of HomeList.myList) {
        this.myList.push(item);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
