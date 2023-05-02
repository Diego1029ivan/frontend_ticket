import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from 'src/app/interfaces/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  usuarios: any = [];
  cargando: boolean = false;

  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((data1) => {
      // console.log(data1);
      this.cargando = true;
      let data = data1;
      this.usuarios = data;
    });
    this.cargando = false;
  }
}
