import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
  perfil() {
    return this.username;
  }
}
