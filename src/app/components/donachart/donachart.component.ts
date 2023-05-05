import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-donachart',
  templateUrl: './donachart.component.html',
  styleUrls: ['./donachart.component.css']
})
export class DonachartComponent implements AfterViewInit, OnInit{
  @ViewChild('pieChart', { static: true })
  pieChart!: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngOnInit(): void {
    const ctx = this.pieChart.nativeElement.getContext('2d');
    if (!ctx) {
      throw new Error('Error al obtener el contexto del canvas');
    }
    const myChart = new Chart(ctx, {
    //type: 'bar',
    type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
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
  }

  ngAfterViewInit() {
    
  }
 

}
