import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  isExpanded: boolean = false
  isExpandedOnMobile: boolean = false
  
  toggleUser: boolean = false
  toggleUsers(){
    this.toggleUser = !this.toggleUser
  }

  
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedOnMobile = !this.isExpandedOnMobile;
  }
}
