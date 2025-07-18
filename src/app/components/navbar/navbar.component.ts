import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  title = 'Fronth';
  searchQuery: string = '';
  isLoggedIn = false;
  username: string | null = null;

 constructor(private router:Router,private authService: UserAuthService) {
    
  }

   ngOnInit(): void {
    // Suscribirse a los cambios en las credenciales
    this.authService.credentials$.subscribe(credentials => {
      this.isLoggedIn = !!credentials;
      this.username = credentials ? credentials.username : null;
    });
    
  }


    onSearch(): void {
      
      if (this.searchQuery.trim()) {
        this.router.navigate(['/Search'], { queryParams: { query: this.searchQuery } });
      }

      
    }






    logout(): void {
      
      this.authService.clearCredentials();
      
      Swal.fire({
        title: 'Bye bye!',
        text: 'Logged out of your account ',
        background: '#2e2e2e',  // Fondo oscuro
        color: '#ffffff',
        icon: 'info',
        timer: 2500,  
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        
        this.router.navigate(['/Home']);
      });;
      
    }
}
