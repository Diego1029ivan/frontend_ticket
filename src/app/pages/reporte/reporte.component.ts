import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent {
  permidoscrud: any = {};

  constructor(private userservice: UserService) {}
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
  ngOnInit(): void {
    this.userservice.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './reporte'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
