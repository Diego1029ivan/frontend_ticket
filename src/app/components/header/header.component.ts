import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  /*======  logout========*/
  logout(): void {
    let username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    this.authService.logout();
    swal.fire(
      'Logout',
      `Hola ${username.name}, has cerrado sesión con éxito!`,
      'success'
    );
    this.router.navigate(['login']);
  }
}
