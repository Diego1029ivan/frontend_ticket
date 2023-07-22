import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent {
  permidoscrud: any = {};
  cargando2: boolean = false;
  constructor(private userservice: UserService) {}

  username = JSON.parse(localStorage.getItem('usuario') || '{}');

  ngOnInit(): void {
    this.permisosporusuario();
    this.cargando2 = false;
  }

  permisosporusuario() {
    this.userservice.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './reporte'
        );
        this.cargando2 = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
