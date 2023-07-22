import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  username = JSON.parse(localStorage.getItem('usuario') || '{}');
  usuarioedit!: FormGroup;
  usuarioContr!: FormGroup;
  userLogado: any = null;
  cargando: boolean = false;
  correoActual: any = '';

  constructor(
    private fb1: FormBuilder,
    private userservice: UserService,
    private fb2: FormBuilder
  ) {}
  perfil() {
    return this.username;
  }

  ngOnInit(): void {
    this.usuarioedit = this.fb1.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.usuarioContr = this.fb2.group(
      {
        id: [''],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            this.customPasswordValidator,
          ],
        ],
        password_confirmation: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
    this.cargarPerfil();
    this.cargando = false;
  }

  cargarPerfil() {
    this.userservice.getUser(this.username.id).subscribe(
      (data) => {
        this.userLogado = data;
        this.usuarioedit.reset({
          name: this.userLogado.data[0].name,
          email: this.userLogado.data[0].email,
          id: this.userLogado.data[0].id,
        });
        this.usuarioContr.reset({
          id: this.userLogado.data[0].id,
        });
        this.correoActual = this.userLogado.data[0].email;
        this.cargando = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  customPasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const specialChars = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const lowerCaseChars = /[a-z]/;
    const upperCaseChars = /[A-Z]/;
    const numberChars = /[0-9]/;

    if (
      !specialChars.test(control.value) ||
      !lowerCaseChars.test(control.value) ||
      !upperCaseChars.test(control.value) ||
      !numberChars.test(control.value)
    ) {
      return { customPasswordValidator: true };
    }
    return null;
  }
  // validar que las contraseñas sean iguales
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('password_confirmation')?.value
      ? null
      : { mismatch: true };
  }

  submitedit() {
    if (this.usuarioedit.value.email == this.correoActual) {
      this.usuarioedit.value.email = '';
    }
    this.userservice.updatePerfil(this.usuarioedit.value).subscribe(
      (data) => {
        this.cargarPerfil();
        swal.fire(
          'Actualizado',
          `Hola ${this.usuarioedit.value.name}, has actualizado tu perfil con éxito!`,
          'success'
        );
      },
      (error) => {
        if (error.error.email[0] == 'The email has already been taken.') {
          swal.fire(
            'Error',
            `El Correo ${this.usuarioedit.value.email} ya existe`,
            'error'
          );
        } else if (error.ok == false) {
          swal.fire('Error', `Algo salio mal, intente de nuevo `, 'error');
        }
      }
    );
  }
  submitContr() {
    this.userservice.updatePerfil(this.usuarioContr.value).subscribe(
      (data) => {
        this.cargarPerfil();
        swal.fire(
          'Actualizado',
          `Hola ${this.usuarioedit.value.name}, has actualizado tu contraseña con éxito!`,
          'success'
        );
        this.usuarioContr.reset();
      },
      (error) => {
        if (error.ok == false) {
          swal.fire('Error', `Algo salio mal, intente de nuevo `, 'error');
        }
      }
    );
  }
}
