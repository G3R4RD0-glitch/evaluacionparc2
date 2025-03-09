import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Libro } from '../../models/libro.model';
import { LibroService } from '../../services/libro.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-libro',
  imports: [FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {

  //propiedades
  libros:any;
  libro = new Libro();

  constructor(private libroService: LibroService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.getLibros();
    }
  }


  //metodo para obtener el listado de libros
  async getLibros():Promise<void> {
    this.libros = await firstValueFrom(this.libroService.getLibros());
  }

  //metodo para insertar un libro desde el form
  insertarLibro(){
    this.libroService.agregarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  //método para seleccionar un libro de la tabla
  selectLibro(libroSeleccionado:Libro){
    this.libro = libroSeleccionado;
  }

  //metodo para modidicar un libro
  updateLibro(){
    this.libroService.modificarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  //metodo para eliminar un libro
  deleteLibro(){
    this.libroService.eliminarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

}
