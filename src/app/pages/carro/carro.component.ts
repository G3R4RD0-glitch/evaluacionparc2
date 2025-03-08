import { Component } from '@angular/core';
import { CarroService } from '../../services/carro.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Carro } from '../../models/carro.model';

@Component({
  selector: 'app-libro',
  imports: [FormsModule, CommonModule],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {

//PROPIEDADES

carros: any;
carro = new Carro();

constructor(private carroService:CarroService){
  this.getCarros();
}

async getCarros():Promise<void>{
  this.carros = await firstValueFrom(this.carroService.getCarros());
}
//METODO PARA INSERTAR CARRO
insertarCarro(){
  this.carroService.agregarCarro(this.carro);
  this.getCarros();
  this.carro = new Carro();
}
 //METODO PARA SELECCIONAR UN CARRO
selectCarro(carroSeleccionado:Carro){
this.carro = carroSeleccionado;
}

//METODO MODIFICAR CARRO
updateCarro(){
  this.carroService.modificarCarro(this.carro);
  this.getCarros();
  this.carro = new Carro();
}

deleteCarro(){
  this.carroService.eliminarCarro(this.carro);
  this.getCarros();
  this.carro = new this.carros();
}

validarFormulario(): boolean {
  return (
      this.carro.pieza?.trim() !== '' &&
      this.carro.descripcion?.trim() !== '' &&
      this.carro.unidades !== null &&
      this.carro.unidades !== undefined &&
      this.carro.unidades.toString().trim() !== '' &&
      this.carro.precio !== null &&
      this.carro.precio !== undefined &&
      this.carro.precio.toString().trim() !== ''
  );
}

}
