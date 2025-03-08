import { Injectable, inject } from '@angular/core';
import { Carro  } from '../models/carro.model';
import { collection, collectionData, deleteDoc, Firestore } from '@angular/fire/firestore';
import { first, timeout } from 'rxjs';
import { addDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  borrarCarro(selectedCarroId: number) {
    throw new Error('Method not implemented.');
  }

  private db: Firestore = inject(Firestore);

  constructor() { }

  //metodo para obtener todos los documentos de la colección
  getCarros(){
    const carrosCollection = collection(this.db, 'carros');
    return collectionData((carrosCollection), {idField: 'id'})
    .pipe(first());
  }

  //metodo para agregar un nuevo documento
  agregarCarro(carro:Carro){
  const carrosCollection = collection(this.db, 'carros');  
  const carroData = {
    pieza: carro.pieza,
    descripcion: carro.descripcion,
    unidades: carro.unidades,
    precio: carro.precio
  };
  addDoc(carrosCollection, carroData);
  }

  //metodo para modificar un documento
    modificarCarro(carro:Carro){
      const documentRef = doc(this.db, 'carros', carro.id);
      updateDoc(documentRef, {
        pieza: carro.pieza,
        descripcion: carro.descripcion,
        unidades: carro.unidades,
        precio: carro.precio
      });
    }

  //metodo para borrar un documento
  eliminarCarro(carro:Carro){
    const documentRef = doc(this.db, 'carros', carro.id);
    deleteDoc(documentRef);
  }
}

