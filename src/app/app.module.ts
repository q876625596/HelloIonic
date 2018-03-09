import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, AlertController} from 'ionic-angular';
import {MyApp} from './app.component';

import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoginPage} from "../pages/login/login";

@NgModule({
  //模块内部Components/Directives/Pipes的列表，声明一下这个模块内部成员
  //类似android中manifest文件中声明activity
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage
  ],
  // 导入其他module，
  // 其它module暴露的出的Components、Directives、Pipes等可以在本module的组件中被使用。
  // 比如导入CommonModule后就可以使用NgIf、NgFor等指令。
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  //用来控制将哪些内部成员暴露给外部使用。
  exports:[],
  // 通常是app启动的根组件，
  // 一般只有一个component。
  // bootstrap中的组件会自动被放入到entryComponents中。
  bootstrap: [IonicApp],
  // 不会再模板中被引用到的组件。
  // 这个属性一般情况下只有ng自己使用，
  // 一般是bootstrap组件或者路由组件，
  // ng会自动把bootstrap、路由组件放入其中。

  //在Angular中是通过RouterModule.forRoot()来设置路由
  //但是在ionic中，使用IonicModule.forRoot()来替代，
  //因此在ionic中必须手动将component添加到enterComponent中
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage
  ],
  // 模块内部成员能够访问使用的Service；
  // 内部和外部Service都可以放在这里声明，
  // 因为Service的权限控制依赖于ng的DI而不是module。
  // ng会把这些providers注册到module运行上下文的根级injector
  providers: [
    AlertController,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
