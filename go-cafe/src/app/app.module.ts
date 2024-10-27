import {  ChangeDetectionStrategy, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { OurstoryComponent } from './components/ourstory/ourstory.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { SignInComponent } from './components/sign-in/sign-in.component'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { RouterModule } from '@angular/router';
import { AltEmailVerificationComponent } from './components/alt-email-verification/alt-email-verification.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AltForgetPasswordComponent } from './components/alt-forget-password/alt-forget-password.component';
import { MatButtonModule } from '@angular/material/button';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    OurstoryComponent,
    CreateAccountComponent,
    SignInComponent,
    EmailVerificationComponent,
    AltEmailVerificationComponent,
    ForgetPasswordComponent,
    AltForgetPasswordComponent,
    AdminPanelComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    RouterModule,
    ManageAccountComponent,
    NzRateComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FeedbackComponent  
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
