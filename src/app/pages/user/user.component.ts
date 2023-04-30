import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe((data) => {
      console.log(data);
    });
  }
}
