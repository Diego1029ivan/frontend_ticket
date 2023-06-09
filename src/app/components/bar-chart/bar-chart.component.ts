import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


import { Chart } from 'chart.js';
import { BarController, BarElement,CategoryScale,LinearScale   } from 'chart.js';
import { InventarioService } from 'src/app/services/inventario.service';
Chart.register(BarController, BarElement,CategoryScale,LinearScale );

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  
carga:number=0

  @ViewChild('barChart', { static: true })
  pieChart!: ElementRef<HTMLCanvasElement>;
  
  constructor(private inventarioService:InventarioService) {}
  ngOnInit(): void {
    
    this.inventarioService.getCondicion().subscribe((condi)=>{
      this.carga=1
        //console.log(condi)
          const ctx = this.pieChart.nativeElement.getContext('2d');
          console.log(ctx)
          if (!ctx) {
            throw new Error('Error al obtener el contexto del canvas');
          }
          const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Bien Activo', 'Bien de Alta'],
            datasets: [{
              label: '# de bienes',
              data: [parseInt(condi[0].cond_activo),parseInt(condi[0].cond_baja)],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
                
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
                
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
      
        //console.log(ctx)
      })
      
  }

}
