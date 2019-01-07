import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { SearchComponent } from './components/pages/search/search.component';
import { DateComponent } from './components/pages/date/date.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { MatchesComponent } from './components/pages/matches/matches.component';
import { MessagingComponent } from './components/pages/messaging/messaging.component';
import { ChannelComponent } from './components/pages/messaging/channel/channel.component';
import { VerifyEmailComponent } from './components/pages/verify-email/verify-email.component';
import { SupportFeedbackComponent } from './components/pages/support/support-feedback/support-feedback.component';


const routes: Routes = [
  {path: '',component:HomeComponent,canActivate:[AuthGuardService]},
  {path: 'my-profile',component:MyProfileComponent,canActivate:[AuthGuardService]},
  {path: 'register',component:RegisterComponent},
  {path: 'login',component:LoginComponent},
  {path: 'search',component:SearchComponent,canActivate:[AuthGuardService]},
  {path: 'date',component:DateComponent,canActivate:[AuthGuardService]},
  {path: 'feedback',component:FeedbackComponent,canActivate:[AuthGuardService]},
  {path: 'profile/:id',component:ProfileComponent,canActivate:[AuthGuardService]},
  {path: 'matches',component:MatchesComponent,canActivate:[AuthGuardService]},
  {path: 'messaging',component:MessagingComponent,canActivate:[AuthGuardService]},
  {path: 'support-feedback',component:SupportFeedbackComponent,canActivate:[AuthGuardService]},
  {path: 'messaging/channel/:sid',component:ChannelComponent,canActivate:[AuthGuardService]},
  {path: 'verify-email/:token',component:VerifyEmailComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
