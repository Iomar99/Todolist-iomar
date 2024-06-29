import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-tarea',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-tarea.component.html',
  styleUrl: './agregar-tarea.component.css'
})
export class AgregarTareaComponent {
  @Input() agregarTareasRecibidas: string[]=[];

  //LocalStorage
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    let datos = localStorage?.getItem("listado");
    if (datos != null) {
      let arreglo = JSON.parse(datos);
      if (arreglo != null) {
        this.agregarTareasRecibidas = arreglo;
      }
    }
  }

  actualizarLocalStorage() {
    localStorage.setItem("listado", JSON.stringify(this.agregarTareasRecibidas));
  }

  //Método para agregar tareas
  nuevaTarea = "";

  AgregarTarea(){
    if(this.nuevaTarea.trim() !== ""){
      this.agregarTareasRecibidas.push(this.nuevaTarea);
      this.actualizarLocalStorage();
      this.nuevaTarea = "";
    }
  }
}
