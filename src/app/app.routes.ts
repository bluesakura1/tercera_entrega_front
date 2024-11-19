import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegistroComponent } from './auth/pages/registro/registro.component';
import { PerfilComponent } from './features/pages/perfil/perfil.component';
import { PropiedadesComponent } from './features/pages/propiedades/propiedades.component';
import { PropertyListComponent } from './features/pages/propiedades/property-list.component'; 
import { AddPropertyComponent } from './features/pages/propiedades/add-property.component';
import { EditPropertyComponent } from './features/pages/propiedades/edit-property.component';
import { NotificationsComponent } from './features/pages/notifications/notifications.component';
import { BookingComponent } from './features/pages/booking/booking.component'; 
import { MessageComponent } from './features/pages/messages/message.component';
import { ReviewFormComponent } from './features/pages/reviews/review-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent },
  { path: 'mi-perfil', component: PerfilComponent },
  { path: 'gestion-propiedades', component: PropiedadesComponent },
  { path: 'añadir-propiedad', component: AddPropertyComponent },
  { path: 'lista-de-propiedades', component: PropertyListComponent },
  { path: 'editar-propiedad/:id', component: EditPropertyComponent },
  { path: 'notificaciones', component: NotificationsComponent },
  { path: 'reservas', component: BookingComponent },
  { path: 'mensajes', component: MessageComponent },
  { path: 'valoraciones', component: ReviewFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '/login' }, // Redirige a login si la ruta no existe
];
