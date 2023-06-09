import { Component, ElementRef, ViewChild } from '@angular/core';
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
id:any=[]
  @ViewChild('barChart', { static: true })
  pieChart!: ElementRef<HTMLCanvasElement>;
  
  constructor(private inventarioService:InventarioService) {}
  ngOnInit(): void {
    this.inventarioService.getArea().subscribe((area)=>{
      console.log(area)

          area.forEach((e:any,index:any)=> {
            if(e.repeticiones>500){
              this.id.push(index)
              this.nombres.push(e.desc_area)
              this.cantidad.push(e.repeticiones)
            }
          });
          //console.log(this.id,this.nombres,this.cantidad)
        //console.log(condi)
          const ctx = this.pieChart.nativeElement.getContext('2d');
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
      })
  }
}
