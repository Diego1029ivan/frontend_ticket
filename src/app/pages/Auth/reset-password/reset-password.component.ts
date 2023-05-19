import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../../interfaces/users';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  loginForm!: FormGroup;
  users: Users;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.users = new Users();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login(): void {
    this.users.email = this.loginForm.value.email.trim();
    this.userService.resetPassword(this.users).subscribe(
      (response) => {
        console.log(response);
        if (response.success === true) {
          swal.fire({
            title: 'Success',
            text: 'Email enviado con exito a su correo',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['/login']);
        } else if (response.success === false) {
          this.loginForm.reset();
          swal.fire({
            title: 'Error',
            text: 'Email does not exist',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      },
      (error) => {
        console.log(error);
        swal.fire({
          title: 'Error',
          text: 'Algo salio mal',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }
}
