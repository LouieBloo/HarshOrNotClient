import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';


const routes: Routes = [
  {path: '',component:HomeComponent,canActivate:[AuthGuardService]},
  {path: 'my-profile',component:MyProfileComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'login',component:LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
