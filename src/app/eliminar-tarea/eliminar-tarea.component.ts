import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-eliminar-tarea',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-tarea.component.html',
  styleUrl: './eliminar-tarea.component.css'
})
export class EliminarTareaComponent {
  @Input() eliminarTareaRecibida: string[] = [];
  @Input() recibirIndex: number = -1;

  //LocalStorage
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    let datos = localStorage?.getItem("listado");
    if (datos != null) {
      let arreglo = JSON.parse(datos);
      if (arreglo != null) {
        this.eliminarTareaRecibida = arreglo;
      }
    }
  }

  actualizarLocalStorage() {
    localStorage.setItem("listado", JSON.stringify(this.eliminarTareaRecibida));
  }


  //Método para eliminar tareas
  eliminarTarea(index: number){
    this.eliminarTareaRecibida.splice(index, 1);
    this.actualizarLocalStorage();
  }
}
