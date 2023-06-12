import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventario } from 'src/app/interfaces/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import { UserService } from 'src/app/services/user.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'],
})
export class EstadosComponent {
  codigo: string = '';
  cargando: number = 2;

  selectedOption: string | null = null;
  inputValue: string = '';
  selectedOptionC: string | null = null;
  inputValueC: string = '';
  inputFecha: string = '';
  inputArea: string = '';
  selectedFecha: string | null = null;
  selectedArea: string | null = null;
  cargando2: boolean = false;
  permidoscrud: any = {};
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');

  descripcion: Inventario = {
    codigo_patrimonial: '123',
    denominacion_bien: 'prueba bien',
    nro_doc_adquisicion: '46647',
    fecha_adquisicion: new Date('12-04-23'),
    valor_adquisicion: '80.00',
    nro_cuenta_contable: '1503.020102',
    cta_con_seguro: 'NO',
    estado_bien: 'R',
    condicion: 'A',
    fecha_inventario: new Date('2023-04-23'),
    desc_area: 'UNSM',
    valor_neto: '1000',
  };
  /*=======FORMULARIO==========*/
  formulario = {
    codigo_patrimonial: '',
    estado_bien1: '',
    estado_bien2: '',
    condicion1: '',
    condicion2: '',
    fecha1: '',
    fecha2: '',
    area1: '',
    area2: '',
  };
  currentDateTime = '';
  currentDateTime1 = '';
  hoy = new Date();
  enviarData = {
    codigo_patrimonial: '',
    estado_bien: '',
    condicion: '',
    fecha_inventario: '',
    desc_area: '',
  };
  descBien: any[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inventarioService: InventarioService,
    private userService: UserService
  ) {
    this.hoy = new Date();
    const year = this.hoy.getFullYear();
    const month = (this.hoy.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses en JavaScript son base 0
    const day = this.hoy.getDate().toString().padStart(2, '0');
    this.currentDateTime = `${year}-${month}-${day}`;
    //console.log(this.currentDateTime )
    // Actualizar cada segundo (1000 ms)
  }
  ngOnInit(): void {
    this.permisosporusuario();
    this.cargando2 = false;
    this.cargando = 0;
    this.activatedRoute.params.subscribe((params) => {
      this.codigo = params['codigo'];
      //console.log(this.codigo)
    });
    this.cargarBien(this.codigo);

    this.cargarArea();
  }
  permisosporusuario() {
    this.userService.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './cambioQR/746481192129'
        );
        this.cargando2 = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cargarBien(codigo: string) {
    this.inventarioService.getCodigo(codigo).subscribe((respo) => {
      this.cargando = 1;
      this.descripcion = respo;
      //console.log(this.descripcion)
      this.formulario.codigo_patrimonial = this.descripcion.codigo_patrimonial;
      this.formulario.estado_bien1 = this.descripcion.estado_bien;
      this.formulario.condicion1 = this.descripcion.condicion;
      this.hoy = new Date(this.descripcion.fecha_inventario);
      this.hoy.setDate(this.hoy.getDate() + 1); // Agregar 1 día
      const year = this.hoy.getFullYear();
      const month = (this.hoy.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses en JavaScript son base 0
      const day = this.hoy.getDate().toString().padStart(2, '0');
      this.currentDateTime1 = `${year}-${month}-${day}`;

      this.formulario.fecha1 = this.currentDateTime1;
      this.formulario.area1 = this.descripcion.desc_area;
    });
  }
  onSelectOption(event: any) {
    this.selectedOption = event.target['value'];
    this.updateInputValue(); // Llama a la función para actualizar el valor del input
  }

  updateInputValue() {
    // Realiza las modificaciones necesarias al valor del input
    // utilizando this.selectedOption y asigna el resultado a this.inputValue
    // Por ejemplo:
    if (this.selectedOption === 'N') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2 = this.selectedOption.valueOf();
    } else if (this.selectedOption === 'B') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2 = this.selectedOption.valueOf();
    } else if (this.selectedOption === 'R') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2 = this.selectedOption.valueOf();
    } else if (this.selectedOption === 'M') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2 = this.selectedOption.valueOf();
    } else if (this.selectedOption === 'X') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2 = this.selectedOption.valueOf();
    } else if (this.selectedOption === 'Y') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2 = this.selectedOption.valueOf();
    }
    //console.log(this.inputValue)
  }
  onSelectOptionC(event: any) {
    this.selectedOptionC = event.target['value'];
    this.updateInputValueC(); // Llama a la función para actualizar el valor del input
  }

  updateInputValueC() {
    // Realiza las modificaciones necesarias al valor del input
    // utilizando this.selectedOption y asigna el resultado a this.inputValue
    // Por ejemplo:
    if (this.selectedOptionC === 'A') {
      this.inputValueC = this.selectedOptionC.valueOf();
      this.formulario.condicion2 = this.inputValueC;
    } else if (this.selectedOptionC === 'B') {
      this.inputValueC = this.selectedOptionC.valueOf();
      this.formulario.condicion2 = this.inputValueC;
    }
    console.log(this.inputValueC);
  }

  /*========actualizar FECHA===========*/

  onFecha(event: any) {
    this.selectedFecha = event.target['value'];
    this.updateFecha(); // Llama a la función para actualizar el valor del input
  }

  updateFecha() {
    this.inputFecha = this.currentDateTime;
    this.formulario.fecha2 = this.currentDateTime;
    console.log(this.currentDateTime);
  }

  /*========actualizar AREA===========*/

  onArea(event: any) {
    this.selectedArea = event.target['value'];
    this.updateArea(); // Llama a la función para actualizar el valor del input
  }

  updateArea() {
    if (this.selectedArea) {
      this.inputArea = this.selectedArea.valueOf();
      this.formulario.area2 = this.selectedArea.valueOf();
    } else {
      // Manejar el caso en el que this.selectedArea es null
      // Por ejemplo, puedes asignar un valor predeterminado a this.inputArea
      this.inputArea = ''; // Valor predeterminado vacío
    }

    //console.log(this.formulario.area2)
  }

  enviarFormulario() {
    //console.log(this.formulario)
    this.formulario.estado_bien2
      ? (this.enviarData.estado_bien = this.formulario.estado_bien2)
      : (this.enviarData.estado_bien = this.formulario.estado_bien1);
    this.formulario.condicion2
      ? (this.enviarData.condicion = this.formulario.condicion2)
      : (this.enviarData.condicion = this.formulario.condicion1);
    this.formulario.fecha2
      ? (this.enviarData.fecha_inventario = this.formulario.fecha2)
      : (this.enviarData.fecha_inventario = this.formulario.fecha1);
    this.formulario.area2
      ? (this.enviarData.desc_area = this.formulario.area2)
      : (this.enviarData.desc_area = this.formulario.area1);

    this.enviarData.codigo_patrimonial = this.formulario.codigo_patrimonial;
    console.log(this.enviarData);
    swal
      .fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que desea actualizar el bien ${this.formulario.codigo_patrimonial}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.inventarioService
            .updateInventario(
              this.formulario.codigo_patrimonial,
              this.enviarData
            )
            .subscribe((respo) => {
              //this.router.navigate([this.router.url]);
              swal.fire(
                'Actualizando',
                `El inventario ${this.formulario.codigo_patrimonial} ha sido actualizado`,
                'success'
              );

              console.log(respo);
              this.formulario.condicion1 = respo[0].condicion1;
            });
        }
      });
    // this.inventarioService.updateInventario(this.formulario.codigo_patrimonial,this.enviarData)
    //   .subscribe((respo)=>{
    //     console.log(respo)
    //   })

    this.inputValue = '';
    this.inputFecha = '';
    this.inputValueC = '';
    this.inputArea = '';
  }
  /*=========ÁREA===========*/
  area: any;
  cargarArea() {
    this.inventarioService.getArea().subscribe((respo) => {
      this.area = respo;
    });
  }
}
