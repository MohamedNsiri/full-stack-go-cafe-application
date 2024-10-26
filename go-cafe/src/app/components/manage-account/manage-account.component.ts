import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.css'
})
export class ManageAccountComponent {

  NameForm: FormGroup = new FormGroup({});
  PasswordForm: FormGroup ;

  name: string = '';
  id: string = '';

  message: string = '';
  bo: boolean = false;
  nbo: boolean = false;

  changePassword: boolean = false;

  ngOnInit(){
    this.dataservice.getUserInfo().subscribe(
      (user) => {
        this.name = user.name;
        this.id = user.id;
      },
      error => {
        console.error(error);
      }
    )
  }

  passwordConfirmation(){
    return this.PasswordForm.get('newpassword') === this.PasswordForm.get('newpasswordconfirmation')
  }

  OnSubmitName(formValue: any) {
    const name = formValue.name;
    this.dataservice.updateName(name, this.id).subscribe(
      response => {
        this.message = response.message;
        this.bo = true;
        this.cd.markForCheck();
        setTimeout(() => { this.message = ''; this.bo = false; this.cd.markForCheck();}, 1600);
        this.NameForm.reset();
      },
      error => {
        this.nbo = true;
        this.cd.markForCheck();
        setTimeout(() => {this.message = ''; this.nbo = false; this.cd.markForCheck();}, 1500);
      }
    );
  }

  OnSubmitPassword(formValue: any){
    if(this.PasswordForm.valid && this.PasswordForm.get('newPassword')?.value === this.PasswordForm.get('newpasswordconfirmation')?.value){
      this.dataservice.updatePassword(formValue).subscribe(
        response => {
          this.message = response.message;
          console.log(response.message);
          this.PasswordForm.reset();
          this.cd.markForCheck();
          setTimeout(()=>{this.cd.markForCheck(); this.message = ''}, 2000);
        },
        error => {
          this.message = 'no';
          console.log(error);
          this.PasswordForm.reset();
          this.cd.markForCheck();
          setTimeout(()=>{this.cd.markForCheck(); this.message = ''}, 2000)
        }
      )
    }else{
      this.message = 'no';
      this.PasswordForm.reset();
      this.cd.markForCheck();
      setTimeout(()=>{this.cd.markForCheck(); this.message = ''}, 2000)
    }
  }
  
  constructor(private fb: FormBuilder, public dataservice: DataService, private cd: ChangeDetectorRef) { 

    this.NameForm = this.fb.group({
      name: ['' , [Validators.required ,Validators.minLength(3)]],
    })

    this.PasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPasswordConfirmation: ['0', Validators.required],
    });
    
  }

  showDisplay(){
    this.changePassword = !this.changePassword;
  }

  readonly dialog = inject(MatDialog);

  openLogoutDialog() {
    this.dialog.open(DialogLogOutConfirmation, {
      width: '600px',
    });
  }

  openDeletionDialog() {
    this.dialog.open(DialogDeletionConfirmation, {
      width: '600px',
    });
  }
}

@Component({
  selector: 'dialog-logout-confirmation-dialog',
  templateUrl: 'dialog-logout-confirmation-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogLogOutConfirmation {

  constructor(public dataservice: DataService, private router: Router) { }  
  
  logout(){
    this.dataservice.logout();
    setTimeout(()=>this.router.navigate(['/']), 500)
  }
}

@Component({
  selector: 'dialog-deletion-confirmation-dialog',
  templateUrl: 'dialog-deletion-confirmation-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDeletionConfirmation {

  constructor(public dataservice: DataService, private router: Router) { }  
  message: string = '';

  deleteAccount(){
    this.dataservice.deleteAccount().subscribe(
      response => {
        this.message = response.message;
        setTimeout(()=>this.router.navigate(['/']), 500);
        console.log(this.message);
      },
      error => {
        console.error(error.error.message);
      }
    );
  }
}
