import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {
  email: string | null = null;
  email_verification_token: string | null = null;
  bo: boolean = false;
  buttonContent: string = 'Resend Email';

  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.email_verification_token = params['email_verification_token'];
    });
  }

  resendEmail() {
    if (this.email) {
      this.dataService.resend_email_verification(this.email).subscribe(
        response => {
          this.buttonContent = 'Email Resent!';
        },
        error => {
          console.error('Failed to resend email:', error);
        }
      );
  }
}
}
