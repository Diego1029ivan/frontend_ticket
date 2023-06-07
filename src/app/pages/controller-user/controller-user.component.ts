import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ControUserService } from 'src/app/services/contro-user.service';
import Swal from 'sweetalert2';
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

  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');

  cargando: boolean = false;

  rolData: any = [];
  moduloData: any = [];
  submoduloData: any = [];
  permisoData: any = [];

  rolContr!: FormGroup;
  moduloContr!: FormGroup;
  submoduloContr!: FormGroup;
  permisoContr!: FormGroup;

  editRol: boolean = false;
  editModulo: boolean = false;
  editSubmodulo: boolean = false;
  editPermiso: boolean = false;

  constructor(
    private rolForm: FormBuilder,
    private moduloForm: FormBuilder,
    private submoduloForm: FormBuilder,
    private permisoForm: FormBuilder,
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
    this.motrarRol();
    this.cargando = false;
    this.mostrarModulo();
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
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro que desea eliminar el rol ${rol.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
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
        // console.log(this.rolContr.value);
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
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Estas seguro que desea eliminar el modulo ${modulo.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
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
}
