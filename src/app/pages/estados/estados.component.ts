import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventario } from 'src/app/interfaces/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent {
  codigo: string='';
  cargando: number=2 ;
  
  selectedOption: string | null = null;
  inputValue: string='';
  selectedOptionC: string | null = null;
  inputValueC: string='';

  descripcion:Inventario={
    codigo_patrimonial:"123",
    denominacion_bien:"prueba bien",
    nro_doc_adquisicion:"46647",
    fecha_adquisicion:new Date("12-04-23"),
    valor_adquisicion:"80.00",
    nro_cuenta_contable: "1503.020102",
    cta_con_seguro: "NO",
    estado_bien: "R",
    condicion: "A"

  }
  /*=======FORMULARIO==========*/
  formulario = {
    codigo_patrimonial: '',
    estado_bien1: '',
    estado_bien2: '',
    condicion1:'',
    condicion2: ''

  };

  enviarData={
    codigo_patrimonial: '',
    estado_bien: '',
    condicion: '',
  }
  descBien:any[]=[]
  constructor(private router:Router,
    private activatedRoute: ActivatedRoute,
    private inventarioService: InventarioService){
    
  }
  ngOnInit(): void {
    this.cargando=0
    this.activatedRoute.params.subscribe(params => {
      this.codigo = params['codigo'];
      console.log(this.codigo)
      
    });
    this.cargarBien(this.codigo)
  }

  cargarBien(codigo:string){
    this.inventarioService.getCodigo(codigo).subscribe((respo)=>{
      this.cargando=1
      this.descripcion=respo
      this.formulario.codigo_patrimonial=this.descripcion.codigo_patrimonial
      this.formulario.estado_bien1=this.descripcion.estado_bien
      this.formulario.condicion1=this.descripcion.condicion
      console.log(this.descripcion)
    })
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
      
    } else if (this.selectedOption === 'B') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2=this.selectedOption.valueOf();
    } else if (this.selectedOption === 'R') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2=this.selectedOption.valueOf();
    }else if (this.selectedOption === 'M') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2=this.selectedOption.valueOf();
    }else if (this.selectedOption === 'X') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2=this.selectedOption.valueOf();
    }else if (this.selectedOption === 'Y') {
      this.inputValue = this.selectedOption.valueOf();
      this.formulario.estado_bien2=this.selectedOption.valueOf();
    }
    console.log(this.inputValue)
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
      this.formulario.condicion2=this.inputValueC;
    } else if (this.selectedOptionC === 'B') {
      this.inputValueC = this.selectedOptionC.valueOf();
      this.formulario.condicion2=this.inputValueC;
    } 
    console.log(this.inputValueC)
  }
  

  enviarFormulario() {
    console.log(this.formulario)
    this.formulario.estado_bien2?this.enviarData.estado_bien=this.formulario.estado_bien2:this.enviarData.estado_bien=this.formulario.estado_bien1
    this.formulario.condicion2?this.enviarData.condicion=this.formulario.condicion2:this.enviarData.condicion=this.formulario.condicion1
    
    this.enviarData.codigo_patrimonial=this.formulario.codigo_patrimonial
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
        this.inventarioService.updateInventario(this.formulario.codigo_patrimonial,this.enviarData)
      .subscribe((respo)=>{
        swal.fire(
          'Actualizando',
          `El inventario ${this.formulario.codigo_patrimonial} ha sido actualizado`,
          'success'
        );
      })
        
        
      }
    });
    // this.inventarioService.updateInventario(this.formulario.codigo_patrimonial,this.enviarData)
    //   .subscribe((respo)=>{
    //     console.log(respo)
    //   })
    
  }

  actualizar_inventario(){

  }
}

