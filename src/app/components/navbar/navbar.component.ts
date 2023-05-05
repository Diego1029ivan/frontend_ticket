import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userLogado: any = null;
  constructor(private userservice: UserService) {}
  ngOnInit(): void {
    this.userservice.getUser(this.username.id).subscribe(
      (data) => {
        this.userLogado = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
  perfil() {
    return this.username;
  }
}
