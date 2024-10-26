import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  form: FormGroup;
  message: string = '';
  bgcolor: string = '';

  constructor(private fb: FormBuilder, public dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(8)]]
    });
   }

  passwordFieldType: string = 'password';

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(formValue: any){
    if(this.form.valid){
      this.dataService.login(formValue).subscribe(
        response => {
          if(formValue.email === 'mohamednsiri86@gmail.com' && formValue.password === '12345678'){
            this.router.navigate(['/feedback']);
            this.dataService.storeToken(response.token);
            console.log(response.user_ip);
          }else{
            this.bgcolor = 'green';
            this.message = response.message;
            this.dataService.storeToken(response.token);
            setTimeout(() => {this.message = ''; this.bgcolor = ''}, 2000);
            setTimeout(()=>{ this.router.navigate(['/']) }, 2500);
          }
        },
        error => {
          this.bgcolor = 'red'
          this.message = error.error.message;
          if(error.error.message === 'Invalid credentials'){
            this.form.markAllAsTouched();
            this.form.reset();
          }
          setTimeout(() => {this.message = ''; this.bgcolor = ''}, 2000);
        }
      )
    }else{
      this.form.markAllAsTouched()
    }
  }

}
