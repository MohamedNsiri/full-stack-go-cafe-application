import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-alt-email-verification',
  templateUrl: './alt-email-verification.component.html',
  styleUrls: ['./alt-email-verification.component.css']
})
export class AltEmailVerificationComponent {
  
  email: string | null = null;
  email_verification_token: string | null = null;
  bo: boolean = false;
  buttonContent: string = 'Resend Email';
  message: string = '';
  btn: boolean = false

  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.email_verification_token = params['token'];
    });
    this.verifyingEmail();
  }

  verifyingEmail() {
    if (this.email && this.email_verification_token && !this.bo) {
      this.dataService.email_verification(this.email, this.email_verification_token).subscribe(
        response => {
          console.log(response.message);
          if (response.message === 'Email verified successfully.') {
            this.bo = true;
            setTimeout(() => { this.router.navigate(['/']); }, 5000);
            console.log(response.message);
            this.message = response.message;
            this.dataService.storeToken(response.token)
          }
        },
        error => {
          this.bo = true;
          this.btn = true;
          this.message = error.error.message || 'An error occurred during verification.';       
          console.error('Verification failed:', error);
        }
      );
    }
  }

  resendEmail() {
    if (this.email) {
      this.dataService.resend_email_verification(this.email).subscribe(
        response => {
          this.buttonContent = 'Email Resent!';
          setTimeout(()=>this.buttonContent = 'Resend Email', 3000);
          console.log(response.message);
        },
        error => {
          console.error('Failed to resend email:', error);
        }
      );
  }
}

}
