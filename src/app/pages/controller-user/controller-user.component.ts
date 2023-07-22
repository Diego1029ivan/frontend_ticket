import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControUserService } from 'src/app/services/contro-user.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-controller-user',
  templateUrl: './controller-user.component.html',
  styleUrls: ['./controller-user.component.css'],
})
export class ControllerUserComponent {
  @ViewChild('closebuttonRol') closebutton: any;
  @ViewChild('closebuttonModulo') closebutton2: any;
  @ViewChild('closebuttonSubmodulo') closebutton3: any;
  @ViewChild('closebuttonPermiso') closebutton4: any;

  username = JSON.parse(localStorage.getItem('usuario') || '{}');

  cargando: boolean = false;
  cargando2: boolean = false;
  pRol!: number;
  pModulo!: number;
  pSubmodulo!: number;
  pPermiso!: number;

  rolData: any = [];
  moduloData: any = [];
  submoduloData: any = [];
  permisoData: any = [];
  permidoscrud: any = {};

  rolContr!: FormGroup;
  moduloContr!: FormGroup;
  submoduloContr!: FormGroup;
  permisoContr!: FormGroup;

  editRol: boolean = false;
  editModulo: boolean = false;
  editSubmodulo: boolean = false;
  editPermiso: boolean = false;

  crudSubmodulo: any = {};

  constructor(
    private rolForm: FormBuilder,
    private moduloForm: FormBuilder,
    private submoduloForm: FormBuilder,
    private permisoForm: FormBuilder,
    private userService: UserService,
    private controUser: ControUserService
  ) {}

  ngOnInit(): void {
    this.rolContr = this.rolForm.group({
      idrol: [''],
      name: ['', [Validators.required]],
    });
    this.moduloContr = this.moduloForm.group({
      idmodulo: [''],
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
    });
    this.submoduloContr = this.submoduloForm.group({
      idsubmodulo: [''],
      name: ['', [Validators.required]],
      route: ['', [Validators.required]],
      read: [''],
      create: [''],
      update: [''],
      delete: [''],
      module_id: ['', [Validators.required]],
    });
    this.permisoContr = this.permisoForm.group({
      idpermiso: [''],
      namepermido: ['', [Validators.required]],
      submodules_id: ['', [Validators.required]],
      rols_id: ['', [Validators.required]],
      read: [''],
      create: [''],
      update: [''],
      delete: [''],
    });
    this.permisosporusuario();
    this.cargando2 = false;
    this.motrarRol();
    this.cargando = false;
    this.mostrarModulo();

    this.mostrarSubmodulo();
    this.mostrarPermisos();
  }
  //permisos por usuario logeado de la url
  permisosporusuario() {
    this.userService.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './ControllerUsuario'
        );
        this.cargando2 = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //rol
  motrarRol() {
    this.controUser.getAllRol().subscribe((data) => {
      this.rolData = data;
      this.cargando = true;
    });
  }

  editarRol(rol: any) {
    this.editRol = false;
    this.rolContr.setValue({
      idrol: rol.id,
      name: rol.name,
    });
  }
  eliminarRol(rol: any) {
    swal
      .fire({
        title: '¿Estas seguro?',
        text: `¿Estas seguro que desea eliminar el rol ${rol.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.controUser.deleteRol(rol.id).subscribe(
            (data) => {
              swal.fire({
                title: 'Rol eliminado',
                text: 'Rol eliminado correctamente',
                icon: 'success',
              });
              this.motrarRol();
            },
            (err) => {
              swal.fire({
                title: 'Error',
                text: 'Error al eliminar el rol',
                icon: 'error',
              });
            }
          );
        }
      });
  }
  agregarRol() {
    this.editRol = true;
    this.rolContr.reset();
  }
  submitRol() {
    if (this.rolContr.valid) {
      if (this.editRol) {
        //agregar rol
        this.controUser.addRol(this.rolContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Rol agregado',
              text: 'Rol agregado correctamente',
              icon: 'success',
            });
            this.motrarRol();
            this.rolContr.reset();
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al agregar el rol',
              icon: 'error',
            });
          }
        );
      } else {
        //editar rol

        this.controUser.updateRol(this.rolContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Rol editado',
              text: 'Rol editado correctamente',
              icon: 'success',
            });
            this.motrarRol();
            this.rolContr.reset();
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al editar el rol',
              icon: 'error',
            });
          }
        );
        this.closebutton.nativeElement.click();
      }
    }
  }

  //modulo
  mostrarModulo() {
    this.controUser.getAllModulo().subscribe((data) => {
      this.moduloData = data;
    });
  }

  editarModulo(modulo: any) {
    this.editModulo = false;
    this.moduloContr.setValue({
      idmodulo: modulo.id,
      name: modulo.name,
      icon: modulo.icon,
    });
  }
  eliminarModulo(modulo: any) {
    swal
      .fire({
        title: '¿Estas seguro?',
        text: `¿Estas seguro que desea eliminar el modulo ${modulo.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.controUser.deleteModulo(modulo.id).subscribe(
            (data) => {
              swal.fire({
                title: 'Modulo eliminado',
                text: 'Modulo eliminado correctamente',
                icon: 'success',
              });
              this.mostrarModulo();
            },
            (err) => {
              swal.fire({
                title: 'Error',
                text: 'Error al eliminar el modulo',
                icon: 'error',
              });
            }
          );
        }
      });
  }
  agregarModulo() {
    this.editModulo = true;
    this.moduloContr.reset();
  }
  submitModulo() {
    if (this.moduloContr.valid) {
      if (this.editModulo) {
        this.controUser.addModulo(this.moduloContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Modulo agregado',
              text: 'Modulo agregado correctamente',
              icon: 'success',
            });
            this.mostrarModulo();
            this.moduloContr.reset();
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al agregar el modulo',
              icon: 'error',
            });
          }
        );
        this.closebutton2.nativeElement.click();
      } else {
        this.controUser.updateModulo(this.moduloContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Modulo editado',
              text: 'Modulo editado correctamente',
              icon: 'success',
            });
            this.mostrarModulo();
            this.moduloContr.reset();
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al editar el modulo',
              icon: 'error',
            });
          }
        );
        this.closebutton2.nativeElement.click();
      }
    }
  }

  //submodulo
  mostrarSubmodulo() {
    this.controUser.getAllSubmodulo().subscribe((data) => {
      this.submoduloData = data;
    });
  }
  editarSubmodulo(submodulo: any) {
    this.editSubmodulo = false;
    this.submoduloContr.setValue({
      idsubmodulo: submodulo.id,
      name: submodulo.name,
      route: submodulo.route,
      read: submodulo.read,
      create: submodulo.create,
      update: submodulo.update,
      delete: submodulo.delete,
      module_id: submodulo.module_id,
    });
  }
  eliminarSubmodulo(submodulo: any) {
    swal
      .fire({
        title: '¿Estas seguro?',
        text: `¿Estas seguro que desea eliminar el submodulo ${submodulo.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.controUser.deleteSubmodulo(submodulo.id).subscribe(
            (data) => {
              swal.fire({
                title: 'Submodulo eliminado',
                text: 'Submodulo eliminado correctamente',
                icon: 'success',
              });
              this.mostrarSubmodulo();
            },
            (err) => {
              swal.fire({
                title: 'Error',
                text: 'Error al eliminar el submodulo',
                icon: 'error',
              });
            }
          );
        }
      });
  }
  agregarSubmodulo() {
    this.editSubmodulo = true;
    this.submoduloContr.reset();
    this.submoduloContr.setValue({
      idsubmodulo: '',
      name: '',
      route: '',
      read: 0,
      create: 0,
      update: 0,
      delete: 0,
      module_id: '',
    });
  }
  submitSubmodulo() {
    if (this.submoduloContr.valid) {
      if (this.editSubmodulo) {
        //agregar  submodulo

        this.submoduloContr.value.read = this.submoduloContr.value.read ? 1 : 0;
        this.submoduloContr.value.create = this.submoduloContr.value.create
          ? 1
          : 0;
        this.submoduloContr.value.update = this.submoduloContr.value.update
          ? 1
          : 0;
        this.submoduloContr.value.delete = this.submoduloContr.value.delete
          ? 1
          : 0;

        this.controUser.addSubmodulo(this.submoduloContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Submodulo agregado',
              text: 'Submodulo agregado correctamente',
              icon: 'success',
            });
            this.mostrarSubmodulo();
            this.submoduloContr.reset();
            this.submoduloContr.setValue({
              idsubmodulo: '',
              name: '',
              route: '',
              read: 0,
              create: 0,
              update: 0,
              delete: 0,
              module_id: '',
            });
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al agregar el submodulo',
              icon: 'error',
            });
          }
        );
        this.closebutton3.nativeElement.click();
      } else {
        //editar submodulo
        this.submoduloContr.value.read = this.submoduloContr.value.read ? 1 : 0;
        this.submoduloContr.value.create = this.submoduloContr.value.create
          ? 1
          : 0;
        this.submoduloContr.value.update = this.submoduloContr.value.update
          ? 1
          : 0;
        this.submoduloContr.value.delete = this.submoduloContr.value.delete
          ? 1
          : 0;
        this.controUser.updateSubmodulo(this.submoduloContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Submodulo editado',
              text: 'Submodulo editado correctamente',
              icon: 'success',
            });
            this.mostrarSubmodulo();
            this.submoduloContr.reset();
            this.submoduloContr.setValue({
              idsubmodulo: '',
              name: '',
              route: '',
              read: 0,
              create: 0,
              update: 0,
              delete: 0,
              module_id: '',
            });
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al editar el submodulo',
              icon: 'error',
            });
          }
        );
        this.closebutton3.nativeElement.click();
      }
    }
  }

  //permisos
  mostrarPermisos() {
    this.controUser.getAllPermisos().subscribe((data) => {
      this.permisoData = data;
    });
  }
  editarPermiso(permiso: any) {
    this.editPermiso = false;
    this.permisoContr.setValue({
      idpermiso: permiso.id,
      namepermido: permiso.namepermido,
      submodules_id: permiso.submoduloid,
      rols_id: permiso.rols_id,
      read: permiso.read,
      create: permiso.create,
      update: permiso.update,
      delete: permiso.delete,
    });
  }
  eliminarPermiso(permiso: any) {
    swal
      .fire({
        title: '¿Estas seguro?',
        text: `¿Estas seguro que desea eliminar el permiso ${permiso.submodulonombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
      })
      .then((result) => {
        if (result.value) {
          this.controUser.deletePermiso(permiso.id).subscribe(
            (data) => {
              swal.fire({
                title: 'Permiso eliminado',
                text: 'Permiso eliminado correctamente',
                icon: 'success',
              });
              this.mostrarPermisos();
            },
            (err) => {
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
  agregarPermiso() {
    this.editPermiso = true;
    this.permisoContr.reset();
    this.permisoContr.setValue({
      idpermiso: '',
      namepermido: '',
      submodules_id: '',
      rols_id: '',
      read: 0,
      create: 0,
      update: 0,
      delete: 0,
    });
  }
  submitPermiso() {
    if (this.permisoContr.valid) {
      if (this.editPermiso) {
        // agregar permiso
        this.permisoContr.value.read = this.permisoContr.value.read ? 1 : 0;
        this.permisoContr.value.create = this.permisoContr.value.create ? 1 : 0;
        this.permisoContr.value.update = this.permisoContr.value.update ? 1 : 0;
        this.permisoContr.value.delete = this.permisoContr.value.delete ? 1 : 0;

        this.controUser.addPermiso(this.permisoContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Permiso agregado',
              text: 'Permiso agregado correctamente',
              icon: 'success',
            });
            this.mostrarPermisos();
            this.permisoContr.reset();
            this.permisoContr.setValue({
              idpermiso: '',
              namepermido: '',
              submodules_id: '',
              rols_id: '',
              read: 0,
              create: 0,
              update: 0,
              delete: 0,
            });
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al agregar el permiso',
              icon: 'error',
            });
          }
        );
        this.closebutton4.nativeElement.click();
      } else {
        //editar permiso
        this.permisoContr.value.read = this.permisoContr.value.read ? 1 : 0;
        this.permisoContr.value.create = this.permisoContr.value.create ? 1 : 0;
        this.permisoContr.value.update = this.permisoContr.value.update ? 1 : 0;
        this.permisoContr.value.delete = this.permisoContr.value.delete ? 1 : 0;
        this.controUser.updatePermiso(this.permisoContr.value).subscribe(
          (data) => {
            swal.fire({
              title: 'Permiso editado',
              text: 'Permiso editado correctamente',
              icon: 'success',
            });
            this.mostrarPermisos();
            this.permisoContr.reset();
            this.permisoContr.setValue({
              idpermiso: '',
              namepermido: '',
              submodules_id: '',
              rols_id: '',
              read: 0,
              create: 0,
              update: 0,
              delete: 0,
            });
          },
          (err) => {
            swal.fire({
              title: 'Error',
              text: 'Error al editar el permiso',
              icon: 'error',
            });
          }
        );
        this.closebutton4.nativeElement.click();
      }
    }
  }
}
