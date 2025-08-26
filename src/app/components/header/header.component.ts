import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showFacebookModal = false;
  showInstagramModal = false;
  showEmailModal = false;
  isMenuOpen = false;
  isModelosOpen = false;
  isAccesoriosOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isModelosOpen = false;
    this.isAccesoriosOpen = false;
  }

  toggleModelos() {
    this.isModelosOpen = !this.isModelosOpen;
    this.isAccesoriosOpen = false;
  }

  toggleAccesorios() {
    this.isAccesoriosOpen = !this.isAccesoriosOpen;
    this.isModelosOpen = false;
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/modelos'], { fragment: category });
    this.closeMenu();
  }
}
