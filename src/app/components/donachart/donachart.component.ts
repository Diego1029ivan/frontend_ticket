import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { InventarioService } from 'src/app/services/inventario.service';
@Component({
  selector: 'app-donachart',
  templateUrl: './donachart.component.html',
  styleUrls: ['./donachart.component.css']
})
export class DonachartComponent implements AfterViewInit, OnInit{
  @ViewChild('pieChart', { static: true })
  pieChart!: ElementRef<HTMLCanvasElement>;

  constructor(private inventarioServices:InventarioService) {}
  ngOnInit(): void {
    this.inventarioServices.getEstado().subscribe((estado)=>{
      //console.log("condiciones",estado)
    
          const ctx = this.pieChart.nativeElement.getContext('2d');
          if (!ctx) {
            throw new Error('Error al obtener el contexto del canvas');
          }
          const myChart = new Chart(ctx, {
          //type: 'bar',
          type: 'doughnut',
            data: {
              labels: ['Bueno', 'Malo', 'Regular','Nuevo'],
              datasets: [{
                label: '# de bienes',
                data: [parseInt(estado[0].cant_bueno),
                       parseInt(estado[0].cant_malo),
                       parseInt(estado[0].cant_regular),
                       parseInt(estado[0].cant_nuevo)],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(120, 100, 86, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(120, 100, 86, 1)'
                ],
                borderWidth: 1
              }]
            },
            
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  
                },
                
                title: {
                  display: true,
                  text: 'Gráfico de Dona'
                }
              }
            }
        
        });
      })
  }

  ngAfterViewInit() {
    
  }
 

}
