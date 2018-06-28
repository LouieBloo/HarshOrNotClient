import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';


const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'my-profile',component:MyProfileComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
