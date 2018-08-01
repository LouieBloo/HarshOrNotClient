import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { EightteenOrOlderDirective } from './directives/age/eightteen-or-older.directive';
import { UpdatePhotosComponent } from './components/users/photos/update-photos/update-photos.component';
import { UpdatePhotoSingleComponent } from './components/users/photos/update-photos/update-photo-single/update-photo-single.component';
import { SinglePhotoComponent } from './components/users/photos/show-photos/single-photo/single-photo.component';
import { SearchComponent } from './components/pages/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MyProfileComponent,
    RegisterComponent,
    LoginComponent,
    EightteenOrOlderDirective,
    UpdatePhotosComponent,
    UpdatePhotoSingleComponent,
    SinglePhotoComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NouisliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
