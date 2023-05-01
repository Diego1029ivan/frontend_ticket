import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(data: any[], busqueda: string): any[] {
    if (!busqueda) {
      return data;
    }

    busqueda = busqueda.toLowerCase();

    return data.filter((row) => {
      return (
        row.codigo_patrimonial.toString().includes(busqueda) ||
        row.denominacion_bien.toLowerCase().includes(busqueda) ||
        row.fecha_adquisicion.toString().includes(busqueda)
      );
    });
  }
}
