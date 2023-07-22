import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reporte-contable',
  templateUrl: './reporte-contable.component.html',
  styleUrls: ['./reporte-contable.component.css'],
})
export class ReporteContableComponent {
  username = JSON.parse(localStorage.getItem('usuario') || '{}');
  permidoscrud: any = {};
  cargando2: boolean = false;

  constructor(private userService: UserService) {
    this.permisosporusuario();
    this.cargando2 = false;
  }

  permisosporusuario() {
    this.userService.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './reporteContable'
        );
        this.cargando2 = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
