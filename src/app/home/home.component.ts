import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { GaleryCardComponent } from '../components/galery-card/galery-card.component';
import { Supabase } from '../utils/images';
import { Property, PropertyService } from '../services/supabase/property.service';
import { UserService } from '../auth/services/user.service'; 

interface filtro {
city? : null|string,
country? : null|string,
price_per_nig? : null|string,
num_bedrooms? :null|string,
num_bathrooms? : null|string,
max_guests? : null|string,
searchtermn? : null|string,
}
interface user {
  isActive: boolean;
  user_id: number;
  email: string;  
  profile_picture: string;  
  is_owner: boolean;  
  bio: string;  
  created_at: string;  
  updated_at: string;  
  deleted_at: string;  
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    SearchBarComponent, 
    GaleryCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user = {
    profilePicture: '',
    fullName: '',
    email: ''
  };
  defaultProfileImage = '/assets/no-avatar.jpg';
  constructor(private propertyService: PropertyService, private userService: UserService) {}
  index="/index?search="



  // Listas que guardan el material filtrado
  casas:Property[]=[]

  // Carrusel
  images = [
    Supabase('casa3.jpeg'),
    Supabase('casa6.jpeg'),
    Supabase('casa5.jpeg'),
  ];

  currentIndex = 0;

  ngOnInit(): void {
    // Cargar los datos del usuario desde el localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      this.user.profilePicture = storedUser.profilePicture || this.defaultProfileImage;
      this.user.fullName = storedUser.fullName || 'Nombre no disponible';
      this.user.email = storedUser.email || 'Email no disponible';
    }
  }
  updateUserProfile() {
    
    const updatedUser = {
      profilePicture: this.user.profilePicture,
      fullName: this.user.fullName,
      email: this.user.email
    };

    // Guardamos la nueva imagen y el correo en el localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }


  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Valor de los filtros guardados localmente
  criterios = [''];
  title = 'Air-cn';
  searchtermn = '';
  country = '';
  city = '';
  price_per_nig = '';
  num_bedrooms = '';
  num_bathrooms = '';
  max_guests = '';

  // Función para `trackBy` en el *ngFor para identificar elementos únicos por su título
  trackByTitle(index: number, item: Property) {
    return item.title;
  }

  // Funcion que actualiza el valor de los filtros
  setFilters(event: any) {
    this.searchtermn = event['searchtermn'];
    this.country = event['country'];
    this.city = event['city'];
    this.price_per_nig = event['price_per_nig'];
    this.num_bedrooms = event['num_bedrooms'];
    this.num_bathrooms = event['num_bathrooms'];
    this.max_guests = event['max_guests'];
  }
  searchfiltered(params:any):any {  
    const user:user|null = JSON.parse(localStorage.getItem('user')!);

    this.propertyService.getPropertiesBybuyerFiltered(params).subscribe(
      (counter) => {
        this.casas=counter;
        console.log(this.casas,this.casas);
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );

  }

  updatebuyerhouse() {  

    this.propertyService.getAllProperties().subscribe(
      (counter) => {
        console.log(counter);
        this.casas=counter
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );
  
  }

  // Funcion que inicia el filtrado general en el orden
  filter() {
    let filter:filtro={}

    // Aplica todos los filtros
    if (this.country) {
      filter['country'] = this.country;
    }

    if (this.city) {
      filter['city'] = this.city;
    }

    if (this.searchtermn) {
      filter['searchtermn'] = this.searchtermn;
    }

    // Filtrado por fecha
    if (this.price_per_nig) {
      filter['city'] = this.city;
    }
    if (this.num_bedrooms) {
      filter['num_bedrooms'] = this.num_bedrooms;
    }
    // Filtrado por precio
    if (this.num_bathrooms) {
      filter['num_bathrooms'] = this.num_bathrooms;
    }
    if (this.max_guests) {
      filter['max_guests'] = this.max_guests;
    }

    console.log(filter);
    

    return this.searchfiltered(filter);
  }
}
