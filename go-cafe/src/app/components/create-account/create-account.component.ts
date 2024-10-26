import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public dataService: DataService, private router: Router) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['12345678', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['12345678', Validators.required],
      rememberMe: [false],
    });
  }

  passwordConfirmation(){
    return this.form.get('password')?.value === this.form.get('confirmPassword')?.value
  }
  
  bo: boolean = false;
  message: string = '';
  messageColor: string = '';
  loading: boolean = false;
  email : any = '';

  onSubmit(data: any) {
    if (this.form.valid && this.passwordConfirmation()) {
      this.loading = true;
        this.dataService.create_account(data).subscribe(
            response => {
                this.bo = true;
                this.message = response.message;
                this.messageColor = 'green';
                this.loading = false;

                this.email = this.form.get('email')?.value;

                // this.dataService.users.push(this.form.value);
                // this.dataService.storeToken(response.token);

                this.form.reset();

                setTimeout(() => {
                    this.bo = false;
                    this.messageColor = '';
                    this.message = '';
                    this.router.navigate(['/email_verification', this.email, response.email_verification_token]);
                }, 3000);
            },
            error => {
                this.bo = true;
                this.messageColor = 'red';
                this.loading = false;

                if (error.error && error.error.errors) {
                    if (error.error.errors.email) {
                        this.message = error.error.errors.email[0];
                    } else {
                        this.message = "Validation failed. Please check the input.";
                    }
                } else {
                    this.message = error.message || "An error occurred.";
                }

                setTimeout(() => {
                    this.bo = false;
                    this.messageColor = '';
                    this.message = '';
                }, 3000);
            }
        );
        console.log(this.form.value);
    } else {
        this.form.markAllAsTouched();
    }
}

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  togglePasswordVisibility(){
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(){
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }
}
