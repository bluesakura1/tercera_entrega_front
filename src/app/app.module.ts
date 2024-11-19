import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPropertyComponent } from './features/pages/propiedades/add-property.component';
import { EditPropertyComponent } from './features/pages/propiedades/edit-property.component';
import { PropertyListComponent } from './features/pages/propiedades/property-list.component'; 

// Modificamos el archivo app.module.ts eliminando AppComponent de las declaraciones
@NgModule({
  declarations: [
    AddPropertyComponent,
    EditPropertyComponent,
    PropertyListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // Incluir ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [] // No se declara AppComponent aquí
})
export class AppModule {}
