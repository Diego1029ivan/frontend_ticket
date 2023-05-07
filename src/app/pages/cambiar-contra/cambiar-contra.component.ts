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
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.cargarUsuarios();
    this.cargando = false;
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe((data1) => {
      this.usuarios = data1;
      this.cargando = true;
    });
  }
  ngOnInit() {
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
