import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventario } from 'src/app/interfaces/inventario';
import { InventarioService } from 'src/app/services/inventario.service';

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
    } else if (this.selectedOption === 'R') {
      this.inputValue = this.selectedOption.valueOf();
    }else if (this.selectedOption === 'M') {
      this.inputValue = this.selectedOption.valueOf();
    }else if (this.selectedOption === 'X') {
      this.inputValue = this.selectedOption.valueOf();
    }else if (this.selectedOption === 'Y') {
      this.inputValue = this.selectedOption.valueOf();
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
    } else if (this.selectedOptionC === 'B') {
      this.inputValueC = this.selectedOptionC.valueOf();
    } 
    console.log(this.inputValueC)
  }
}

