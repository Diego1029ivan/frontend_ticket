import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.component.html',
  styleUrls: ['./cambiar-contra.component.css'],
})
export class CambiarContraComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  usuarioSub!: FormGroup;
  usuarios: any = [];
  cargando: boolean = false;
  cargando2: boolean = false;
  permidoscrud: any = {};
  preset!: number;
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');

  constructor(private fb: FormBuilder, private userService: UserService) {}

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe((data1) => {
      this.usuarios = data1;
      this.cargando2 = true;
    });
  }
  ngOnInit() {
    this.permisosporusuario();
    this.cargando = false;
    this.cargarUsuarios();
    this.cargando2 = false;

    this.usuarioSub = this.fb.group(
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
  }
  permisosporusuario() {
    this.userService.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './ResetiarPassword'
        );
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
  editarUsuario(id1: number) {
    this.usuarioSub.reset({
      id: id1,
    });
  }

  submit() {
    if (this.usuarioSub.invalid) {
      return Object.values(this.usuarioSub.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    this.userService.updateUser(this.usuarioSub.value).subscribe(
      (data: any) => {
        swal.fire({
          title: 'Contraseña Actualizada',
          text: 'La contraseña se actualizo correctamente',
          icon: 'success',
        });

        this.closebutton.nativeElement.click();
        this.cargarUsuarios();
        this.usuarioSub.reset();
      },
      (err: any) => {
        swal.fire({
          title: 'Error',
          text: 'Error al actualizar la contraseña',
          icon: 'error',
        });
      }
    );
  }
}
