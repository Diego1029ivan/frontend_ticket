import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.css'],
})
export class PolarChartComponent {
  nombres2: any = [];
  valor_neto: any = [];
  id2: any = [];
  items: any;
  carga: number = 0;
  mensaje: string = '';
  @ViewChild('pieChart', { static: true })
  pieChart!: ElementRef<HTMLCanvasElement>;

  constructor(private inventarioServices: InventarioService) {}
  ngOnInit(): void {
    this.inventarioServices.getArea().subscribe((area) => {
      this.items = area;
      if (this.items[0]) {
        area.forEach((e: any, index: any) => {
          //if(e.suma_valor_neto>250000){
          this.carga = 1;
          this.id2.push(index);
          this.nombres2.push(e.desc_area);
          this.valor_neto.push(e.suma_valor_neto);
          //}
        });

        const ctx = this.pieChart.nativeElement.getContext('2d');
        if (!ctx) {
          throw new Error('Error al obtener el contexto del canvas');
        }
        const myChart = new Chart(ctx, {
          //type: 'bar',
          type: 'pie',
          data: {
            labels: this.id2,
            datasets: [
              {
                label: 'valor neto',
                data: this.valor_neto,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(75, 192, 192)',
                  'rgb(255, 205, 86)',
                  'rgb(201, 203, 207)',
                  'rgb(54, 162, 235)',
                ],
              },
            ],
          },
        });
      } else {
        this.mensaje = 'no existen valores';
      }
    });
  }

  ngAfterViewInit() {}
}
