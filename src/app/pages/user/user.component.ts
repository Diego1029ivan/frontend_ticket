import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from 'src/app/interfaces/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  usuarioagrear: Users = new Users();
  usuarioSub!: FormGroup;
  usuarios: any = [];
  cargando: boolean = false;
  edit: boolean = false;
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
    this.usuarioSub = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', [Validators.required]],
    });
  }

  agregarUsuario() {
    this.edit = true;
    this.usuarioSub.reset();
  }
  editarUsuario(id1: number, users: any) {
    this.edit = false;
    this.usuarioSub.reset({
      name: users.name,
      email: users.email,
      rol_id: users.rol_id,
      id: id1,
    });
  }

  eliminarUsuario(usuario: any) {
    swal
      .fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que desea eliminar el Usuario ${usuario.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(usuario.id).subscribe((data) => {
            swal.fire(
              'Eliminado',
              `El Usuario ${usuario.name} ha sido eliminado`,
              'success'
            );
          });
          this.cargarUsuarios();
        }
      });
  }

  submit() {
    if (this.usuarioSub.valid) {
      if (this.edit) {
        //agregar usuario
        this.usuarioagrear.email = this.usuarioSub.value.email.trim();
        this.usuarioagrear.name = this.usuarioSub.value.name.trim();
        this.usuarioagrear.rol_id = this.usuarioSub.value.rol_id;
        this.usuarioagrear.password = '123456';
        this.usuarioagrear.password_confirmation = '123456';
        this.userService.addUser(this.usuarioagrear).subscribe(
          (data) => {
            swal.fire(
              'Agregado',
              `El Usuario ${this.usuarioagrear.name} ha sido agregado`,
              'success'
            );
            this.cargarUsuarios();
          },
          (error) => {
            if (error.error.email[0] == 'The email has already been taken.') {
              swal.fire(
                'Error',
                `El Correo ${this.usuarioagrear.email} ya existe`,
                'error'
              );
            } else if (error.ok == false) {
              swal.fire('Error', `Algo salio mal, intente de nuevo `, 'error');
            }
          }
        );

        this.usuarioSub.reset();
      } else {
        //editar usuario
        this.userService.updateUser(this.usuarioSub.value).subscribe(
          (data) => {
            swal.fire(
              'Actualizado',
              `El Usuario ${this.usuarioSub.value.name} ha sido actualizado`,
              'success'
            );
            this.cargarUsuarios();
          },
          (error) => {
            if (error.error.email[0] == 'The email has already been taken.') {
              swal.fire(
                'Error',
                `El Correo ${this.usuarioagrear.email} ya existe`,
                'error'
              );
            } else if (error.ok == false) {
              swal.fire('Error', `Algo salio mal, intente de nuevo `, 'error');
            }
          }
        );

        this.closebutton.nativeElement.click();
      }
    }
  }
}
