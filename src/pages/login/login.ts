import {Component, OnInit} from "@angular/core";
import {AlertController, MenuController, NavController, NavParams, ToastController} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {ErrorStateMatcher} from "@angular/material";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";


//定义表单控件如何提示错误
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  ngOnInit(): void {

  }

  public email = "";
  public passWord = "";
  public emailFormControl: FormControl;
  public matcher: MyErrorStateMatcher;

  constructor(public toastController: ToastController,
              public alertController: AlertController,
              public statusBar: StatusBar,
              public menu: MenuController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    menu.swipeEnable(false);
    this.statusBar.backgroundColorByHexString('#66ccff');
    //toast
    //创建表单控制器并传入需要验证的规则
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.matcher = new MyErrorStateMatcher();
  }

  check() {
    if (this.emailFormControl.hasError("email") || this.emailFormControl.hasError("required")) {
      console.log("asas");
      return
    }
    if (this.passWord == "") {
      let toast = this.toastController.create({
        duration: 3000
      });
      toast.setMessage("Password is null!");
      toast.present();
    }
  }

  back(){
    this.menu.swipeEnable(true);
    this.navCtrl.pop()
  }

}
