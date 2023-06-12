import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BarController, BarElement,CategoryScale,LinearScale   } from 'chart.js';
import { InventarioService } from 'src/app/services/inventario.service';
Chart.register(BarController, BarElement,CategoryScale,LinearScale );
@Component({
  selector: 'app-bar-conta-chart',
  templateUrl: './bar-conta-chart.component.html',
  styleUrls: ['./bar-conta-chart.component.css']
})
export class BarContaChartComponent {

nombres:any=[]
cantidad:any=[]
items:any;
id:any=[]


mensaje:string='';
  @ViewChild('barChart', { static: true })
  barChart!: ElementRef<HTMLCanvasElement>;
  
  constructor(private inventarioService:InventarioService) {}
  ngOnInit(): void {
    if (this.barChart && this.barChart.nativeElement) {
          this.inventarioService.getArea().subscribe((area)=>{
            this.items = area;
            console.log(this.items)
            //console.log(area)
            if(this.items[0]){
                area.forEach((e:any,index:any)=> {
                  //if(e.repeticiones>500){
                    this.id.push(index)
                    this.nombres.push(e.desc_area)
                    this.cantidad.push(e.repeticiones)
                  //}
                });
                //console.log(this.id,this.nombres,this.cantidad)
              //console.log(condi)
                const ctx = this.barChart.nativeElement.getContext('2d');
                if (!ctx) {
                  throw new Error('Error al obtener el contexto del canvas');
                }
                const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: this.id,
                  datasets: [{
                    label: '# de bienes',
                    data: this.cantidad,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 0, 0, 0.2)',
                      'rgba(0, 255, 0, 0.2)',
                      'rgba(0, 0, 255, 0.2)',
                      'rgba(255, 255, 0, 0.2)',
                      'rgba(255, 0, 255, 0.2)',
                      'rgba(0, 255, 255, 0.2)',
                      'rgba(128, 128, 128, 0.2)',
                      'rgba(255, 128, 0, 0.2)',
                      'rgba(128, 0, 255, 0.2)',
                      'rgba(0, 128, 255, 0.2)'
                      
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 0, 0, 1)',
                      'rgba(0, 255, 0, 1)',
                      'rgba(0, 0, 255, 1)',
                      'rgba(255, 255, 0,1)',
                      'rgba(255, 0, 255, 1)',
                      'rgba(0, 255, 255, 1)',
                      'rgba(128, 128, 128, 1)',
                      'rgba(255, 128, 0, 1)',
                      'rgba(128, 0, 255, 1)',
                      'rgba(0, 128, 255, 1)'
                      
                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            }else{
              this.mensaje="no existen valores"
            }
            })
        
        }
      }
}
