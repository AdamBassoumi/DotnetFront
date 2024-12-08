import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isOpen = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  navigateTo(section: string) {
    if (section === 'members') {
      this.router.navigate(['/members']);
    } else if (section === 'books') {
      this.router.navigate(['/books']);
    } else if (section === 'authors') {
      this.router.navigate(['/authors']);
    }
    this.isOpen = false; // Close the dropdown after selection
  }
}
