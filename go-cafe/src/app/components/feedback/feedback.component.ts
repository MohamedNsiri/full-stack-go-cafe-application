import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NzRateComponent, FormsModule, CommonModule, NzTreeModule, NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbacks: any = [];
  unauthorized: boolean = false
  isExpanded: boolean = false
  isExpandedOnMobile: boolean = false
  constructor(public dataservice: DataService, private cdr: ChangeDetectorRef, private router: Router){}

  ngOnInit(){
    this.getFeedbacks();
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedOnMobile = !this.isExpandedOnMobile;
  }

  getFeedbacks(){
    this.dataservice.showFeedbacks().subscribe(
      data => {
        this.feedbacks = data;
        this.cdr.markForCheck();
      },
      error => {
        if(error.status === 403){
          this.unauthorized = true;
          this.router.navigate(['/']);
          this.cdr.markForCheck();
        }
      }
    )
  }

  openEmail(email: string){
    this.dialog.open(DialogEmail, {
      data: email
    })
  }

  readonly dialog = inject(MatDialog);

  openFeedback(name: string, email: string, rating: number, message_body: string, id:number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogFeedback, {
      data: {
        name: name,
        email: email,
        rating: rating,
        message_body: message_body,
        id: id
      },
      enterAnimationDuration,
      exitAnimationDuration, 
    });
  }

  toggleUser: boolean = false
  toggleUsers(){
    this.toggleUser = !this.toggleUser
  }
}


@Component({
  selector: 'dialog-feedback-dialog',
  templateUrl: 'dialog-feedback-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, NzRateComponent, MatCardModule, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFeedback {
  feedbacks: any = [];
  constructor(public dataservice: DataService, private cdr: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) private data: any){
    this.feedbacks = data;
  }
}

@Component({
  selector: 'dialog-email-dialog',
  templateUrl: 'dialog-email-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEmail {
  email: string = '';
  email_body: string = '';
  constructor(public dataservice: DataService,    private dialogRef: MatDialogRef<DialogEmail>, private cdr: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) private data: any){
    this.email = data;
  }

  sendEmail(email: string, email_body: string){
    console.log(email_body);
    console.log(email);
    this.dataservice.sendEmail(email, email_body).subscribe(
      response => {
        this.email_body = '';
        this.cdr.markForCheck();
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    )
  }
  
}
