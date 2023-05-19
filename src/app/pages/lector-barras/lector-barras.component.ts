import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inventario } from 'src/app/interfaces/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
// import * as Quagga from 'quagga';
@Component({
  selector: 'app-lector-barras',
  templateUrl: './lector-barras.component.html',
  styleUrls: ['./lector-barras.component.css']
})
export class LectorBarrasComponent {
  codigo: string='';
  cargando: number=2 ;
  inputValue: string='';
  listaBienes:any[]=[]
  existe:number=0;
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventarioService: InventarioService){
    
  }
  ngOnInit() {
    
  }
  cargarBien(){
    this.cargando=0
    if(this.inputValue.length==12){
    this.inventarioService.getCodigo(this.inputValue.valueOf()).subscribe((respo)=>{
      this.cargando=1
      this.descripcion=respo
     
      this.listaBienes.forEach(bien => {
        //console.log(bien,respo)
        if(bien.codigo_patrimonial===respo.codigo_patrimonial){
          this.existe=1
        }
        
        console.log(bien)
      });
      if(this.existe==0){
        this.listaBienes.push(this.descripcion)
        
        }
      
      this.existe=0;
      this.inputValue='';
      //console.log(this.listaBienes)
      //console.log(this.descripcion)
    })
    }
  }
  

  
}
