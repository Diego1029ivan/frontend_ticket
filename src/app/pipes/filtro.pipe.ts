import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(data: any[], busqueda: string): any[] {
    if (!busqueda) {
      return data;
    }
    
    busqueda = busqueda.toLowerCase();
    
    return data.filter(row => {
      return row.CODIGO_PATRIMONIAL.toString().includes(busqueda)
        || row.DENOMINACION_BIEN.toLowerCase().includes(busqueda)
        || row.FECHA_DOCUMENTO_ADQUIS.toString().includes(busqueda);
    });
  }

}
