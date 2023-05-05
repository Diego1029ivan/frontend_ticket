import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
  usuarioSub!: FormGroup;
  userLogado: any = null;

  constructor(private fb: FormBuilder, private userservice: UserService) {}
  perfil() {
    return this.username;
  }

  ngOnInit(): void {
    this.usuarioSub = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.userservice.getUser(this.username.id).subscribe(
      (data) => {
        this.userLogado = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  submit() {}
}
