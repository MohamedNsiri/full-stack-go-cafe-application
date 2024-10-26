import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  PasswordForm: FormGroup;
  message: string = '';
  email: string = '';
  token: string = ''

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  constructor(private fb: FormBuilder, public dataservice: DataService, private route: ActivatedRoute, private router: Router) {
    this.PasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPasswordConfirmation: ['', Validators.required]}); 
  }

  newPasswordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  toggleNewPasswordVisibility(): void {
    this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  OnSubmitPassword() {
    if (this.PasswordForm.valid) {
        if (this.PasswordForm.get('newPassword')?.value === this.PasswordForm.get('newPasswordConfirmation')?.value) {
            const password = this.PasswordForm.get('newPassword')?.value;
            this.dataservice.resetPassword(password, this.email, this.token).subscribe(
                response => {
                    console.log(response.message);
                    this.message = response.message;
                    setTimeout(()=>{this.message = '', this.router.navigate(['/sign_in'])}, 3000)
                },
                error => {
                    console.error(error.error);
                }
            );
        } else {
            console.log('Passwords do not match.');
            this.PasswordForm.get('newPasswordConfirmation')?.markAsTouched();
        }
    } else {
        console.log('Form is invalid.');
        this.PasswordForm.markAllAsTouched();
    }
}

}
