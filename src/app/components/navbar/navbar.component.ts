import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userLogado: any = null;
  transformedData: any = {};
  transformedArray: any = null;
  cargando: boolean = false;
  constructor(private userservice: UserService) {}
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
  ngOnInit(): void {
    this.navlinkConPermiso();
    this.cargando = false;
    this.userservice.getUser(this.username.id).subscribe(
      (data) => {
        this.userLogado = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navlinkConPermiso() {
    this.userservice
      .getPermisourlLogeado(this.username.rol)
      .subscribe((data1) => {
        data1.data.forEach((e: any) => {
          const { nombremodule, icon, route, submodulonombre } = e;
          // Verificar si ya existe una entrada para 'nombremodule' en el objeto transformado
          if (!this.transformedData[nombremodule]) {
            // Si no existe, crear una nueva entrada con 'nombremodule' y 'icon'
            this.transformedData[nombremodule] = {
              nombremodule,
              icon,
              submodulonombre: [],
            };
          }
          // Agregar 'route' y 'submodulonombre' al subarreglo correspondiente
          this.transformedData[nombremodule].submodulonombre.push({
            route,
            submodulonombre,
          });
        });
        // Obtener el resultado como un array de objetos
        this.transformedArray = Object.values(this.transformedData);
        this.cargando = true;
      });
  }
}
