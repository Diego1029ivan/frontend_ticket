import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
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
        this.closebutton.nativeElement.click();
        swal.fire({
          title: 'Contraseña Actualizada',
          text: 'La contraseña se actualizo correctamente',
          icon: 'success',
        });
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
