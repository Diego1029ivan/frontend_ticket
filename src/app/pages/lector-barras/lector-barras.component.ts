import { Component } from '@angular/core';
// import * as Quagga from 'quagga';
@Component({
  selector: 'app-lector-barras',
  templateUrl: './lector-barras.component.html',
  styleUrls: ['./lector-barras.component.css']
})
export class LectorBarrasComponent {
  barcodeData: string='';

  ngOnInit() {
    // Quagga.init({
    //   inputStream: {
    //     name: "Live",
    //     type: "LiveStream",
    //     target: document.querySelector("#scanner"),
    //     constraints: {
    //       facingMode: "environment"
    //     }
    //   },
    //   decoder: {
    //     readers: ["ean_reader"] // Tipo de código de barras a escanear, en este caso, EAN
    //   }
    // }, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   Quagga.start();

    //   Quagga.onDetected((result) => {
    //     this.barcodeData = result.codeResult.code;
    //     // Puedes realizar acciones adicionales con los datos del código de barras aquí
    //   });
    // });
  }
}
