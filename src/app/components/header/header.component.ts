import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  /*======  logout========*/
  logout(): void {
    this.authService.logout();
    alert('Sesión cerrada');
    this.router.navigate(['login']);
  }
}
