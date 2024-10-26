import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alt-forget-password',
  templateUrl: './alt-forget-password.component.html',
  styleUrl: './alt-forget-password.component.css'
})
export class AltForgetPasswordComponent {
  emailForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, public dataservice: DataService, private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]}); 
  }

  onSubmitEmail(formValue: any){
    if(this.emailForm.valid){
        this.dataservice.forgetPassword(formValue).subscribe(
          response => {
            this.message = response.message;
            this.emailForm.reset();
          },
          error => {
            console.error(error)
          }
        )
      }
    }
}
