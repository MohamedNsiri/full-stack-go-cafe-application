import { Component, ChangeDetectionStrategy, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {MatButtonModule} from '@angular/material/button';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.css',
})
export class FrontpageComponent {
  menuOpen = true
  hidden = false
  selectedTab = 'women';
  foodMenuOpen = false;
  marketMenuOpen = false;
  user: any;
  rating: number = 0;
  message_body: string ='';

  constructor(private router : Router, public dataService: DataService) {}

  

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    
    if (!this.menuOpen) {
      setTimeout(() => { this.hidden = true }, 300);
    } else {
      this.hidden = false;
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }


  ngOnInit() {
    this.dataService.getUserInfo().subscribe(
      (data) => {
        this.user = this.capitalizeUserName(data);
      },
      (error) => {
        if (error.status === 401) {
          console.log("User is not authenticated. Redirecting to login.");
          this.router.navigate(['/login']);
        } else if (error.status === 500) {
          console.error("Server error:", error.message);
          // Optional: Show a user-friendly message or retry option
        }
      }
    );
  }

  capitalizeUserName(user: any) {
    if (user && user.name) {
      user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
    }
    return user;
  }

  goToManageAccount(){
    this.router.navigate(['/manage_account', this.user.id])
  }

  toggleMarketMenu(){
    this.marketMenuOpen = !this.marketMenuOpen
    this.foodMenuOpen = false
  }

  toggleFoodMenu(){
    this.foodMenuOpen = !this.foodMenuOpen;
    this.marketMenuOpen = false;
  }
  onRatingChange(newRating: number): void {
    console.log('Selected rating:', newRating);
    this.rating = newRating;  // You can handle the new rating here
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

  
  openDiag1(src: any) {
    console.log("loula")
    this.dialog.open(Diag1, {
        data: src
    });
  }

  openDiag2(src: any) {
    console.log("thenia")
    this.dialog.open(Diag2, {
      data: src
    });
  }

  openDiag3(src: any) {
    console.log("3")
    this.dialog.open(Diag3, {
      data: src
    });
  }

  submitFeedback(email: string, message_body: string, rating: number){
    this.dataService.submitFeedback(email, message_body, rating).subscribe(
      response => {
        console.log(response.message)
        this.rating = 0;
        this.message_body = '';
      },
      error => {
        console.log(error)
      }
    )
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

@Component({
  selector: 'dialog-one-confirmation-dialog',
  templateUrl: 'dialog-one-confirmation-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Diag1 {
  src: any 
  constructor(public dataservice: DataService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.src = data
   }  
}

@Component({
  selector: 'dialog-two-confirmation-dialog',
  templateUrl: 'dialog-two-confirmation-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Diag2 {
  src: any
  constructor(public dataservice: DataService, @Inject(MAT_DIALOG_DATA) private data: any) { 
    this.src = data
  }  
}

@Component({
  selector: 'dialog-three-confirmation-dialog',
  templateUrl: 'dialog-three-confirmation-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Diag3 {
  src: any
  constructor(public dataservice: DataService, @Inject(MAT_DIALOG_DATA) private data: any) { 
    this.src = data
  }   
}


