import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import {
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { InventarioService } from 'src/app/services/inventario.service';
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  carga: number = 0;
  items: any;
  mensaje:string='';
  @ViewChild('barChart', { static: true })
  barChart!: ElementRef<HTMLCanvasElement>;

  constructor(private inventarioService: InventarioService) {}
  ngOnInit(): void {
    
    this.inventarioService.getCondicion().subscribe((condi) => {
      //this.carga = 1;
      this.items = condi;
      //console.log(this.items)
    //   console.log(condi)
    //  console.log(this.mensaje)
    //  console.log(this.items.length)
     if(this.items[0]?.cond_activo){
      
          const ctx = this.barChart.nativeElement.getContext('2d');
          console.log(ctx);
          if (!ctx) {
            throw new Error('Error al obtener el contexto del canvas');
          }
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Bien Activo', 'Bien de Alta'],
              datasets: [
                {
                  label: '# de bienes',
                  data: [
                    parseInt(condi[0].cond_activo),
                    parseInt(condi[0].cond_baja),
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            
        },
      });
    }else{
      this.mensaje="no existe datos"
    }
    //console.log(ctx)
    });
  
}
}
