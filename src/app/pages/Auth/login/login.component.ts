import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../../interfaces/users';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users: Users;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.users = new Users();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    this.users.name = this.loginForm.value.name.trim();
    this.users.password = this.loginForm.value.password.trim();

    this.authService.login(this.users).subscribe(
      (response) => {
        if (response.success == false) {
          alert(response.msg);
          return;
        }

        this.router.navigate(['/inventario_off']);
        this.authService.guardarToken(response.access_token);
        this.authService.guardarUsuario(response.user);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
