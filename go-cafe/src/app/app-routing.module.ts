import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurstoryComponent } from './components/ourstory/ourstory.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { AltEmailVerificationComponent } from './components/alt-email-verification/alt-email-verification.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { AltForgetPasswordComponent } from './components/alt-forget-password/alt-forget-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'ourstory', component: OurstoryComponent },
  { path: '', component: FrontpageComponent},
  { path: 'create_account', component: CreateAccountComponent },
  { path: 'sign_in', component: SignInComponent },
  { path: 'email_verification/:email/:email_verification_token', component: EmailVerificationComponent },
  { path: 'email_verification', component: AltEmailVerificationComponent },
  { path: 'manage_account/:id', component: ManageAccountComponent},
  { path: 'forget_password', component: AltForgetPasswordComponent},
  { path: 'reset_password', component: ForgetPasswordComponent},
  { path: 'admin_panel', component: AdminPanelComponent,
    children: [
      { path: 'feedback', component: FeedbackComponent}
  ]},
  { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
