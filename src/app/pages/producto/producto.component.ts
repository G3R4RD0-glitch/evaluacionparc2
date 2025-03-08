import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto',
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  //propiedades
  productos:any;
  producto = new Producto();

  constructor(private productoService:ProductoService){
    this.getProductos();
  }

  //metodo para obtener el listado de libros
  async getProductos():Promise<void> {
    this.productos = await firstValueFrom(this.productoService.getProductos());
  }

  //metodo para insertar un libro desde el form
  insertarProducto(){
    this.productoService.agregarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  //método para seleccionar un libro de la tabla
  selectProducto(productoSeleccionado:Producto){
    this.producto = productoSeleccionado;
  }

  //metodo para modificar un producto
  updateProducto(){
    this.productoService.modificarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  //metodo para eliminar un libro
  deleteProducto(){
    this.productoService.eliminarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

}
