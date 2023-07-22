import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from 'src/app/interfaces/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ControUserService } from 'src/app/services/contro-user.service';
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
  correoActual: any = null;
  cargando: boolean = false;
  cargando2: boolean = false;
  edit: boolean = false;
  rolData: any = [];
  permidoscrud: any = {};
  puser!: number;

  username = JSON.parse(localStorage.getItem('usuario') || '{}');
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private controUser: ControUserService
  ) {
    this.permisosporusuario();
    this.cargando2 = false;
    this.cargarUsuarios();
    this.cargando = false;
    this.motrarRol();
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe((data1) => {
      this.usuarios = data1;
      this.cargando = true;
    });
  }
  //rol
  motrarRol() {
    this.controUser.getAllRol().subscribe((data) => {
      this.rolData = data;
    });
  }

  permisosporusuario() {
    this.userService.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './usarios'
        );
        this.cargando2 = true;
      },
      (err) => {
        console.log(err);
      }
    );
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
    this.usuarioSub.setValue({
      id: '',
      name: '',
      email: '',
      rol_id: '',
    });
  }
  editarUsuario(id1: number, users: any) {
    this.edit = false;
    this.correoActual = users.email;
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
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(usuario.id).subscribe(
            (data) => {
              swal.fire(
                'Eliminado',
                `El Usuario ${usuario.name} ha sido eliminado`,
                'success'
              );
              this.cargarUsuarios();
            },
            (error) => {
              swal.fire({
                title: 'Error',
                text: 'Error al eliminar el permiso',
                icon: 'error',
              });
            }
          );
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
        this.usuarioSub.setValue({
          id: '',
          name: '',
          email: '',
          rol_id: '',
        });
      } else {
        //editar usuario

        if (this.usuarioSub.value.email == this.correoActual) {
          this.usuarioSub.value.email = '';
        }
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
                `El Correo ${this.usuarioSub.value.email} ya existe`,
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
