import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GaleryCardComponent } from './components/galery-card/galery-card.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegistroComponent } from './auth/pages/registro/registro.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/componets/footer/footer.component';

interface Casa {
  id: string;
  rooms: string;
  title: string;
  description: string;
  price: string;
  country: string;
  city: string;
  owner: string;
  area: string;
  negotiable: string;
  type: string;
  image: string;
  mapSrc: string;
  date: string;
  searchTerm?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    SearchBarComponent, 
    GaleryCardComponent, 
    FooterComponent, 
    LoginComponent, 
    RegistroComponent, 
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // listas que guardan el material filtrado
  listFilterCountry: Casa[] = [];
  listFilterCity: Casa[] = [];
  listFilterRooms: Casa[] = [];
  listFilterMaxPrice: Casa[] = [];
  listFilterMinPrice: Casa[] = [];
  listFilterMaxDate: Casa[] = [];
  listFilterMinDate: Casa[] = [];

  casas: Casa[] = [
    {
      id: "1",
      title: 'Casa en la Playa',
      rooms: '1',
      image: '',
      description: 'Una hermosa casa frente al mar con acceso privado a la playa.',
      price: '200000',
      country: 'colombia',
      city: 'bogoto',
      owner: 'Juan Pérez',
      date: '2022-10-03',
      area: 'Zona residencial segura',
      negotiable: 'Sí',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa1Ubicacion',
    },
    {
      id: "2",
      title: 'Casa de Campo',
      rooms: '1',
      image: '',
      country: 'colombia',
      city: 'bogoto',
      description: 'Una acogedora casa de campo con vistas espectaculares.',
      price: '$150,000',
      owner: 'Maria López',
      date: '2022-10-09',
      area: 'Zona rural tranquila',
      negotiable: 'No',
      type: 'Renta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa2Ubicacion',
    },
    {
      id: "3",
      title: 'Casa en la Ciudad',
      rooms: '2',
      image: '',
      description: 'Una moderna casa en el corazón de la ciudad.',
      price: '$300,000',
      country: 'UUEE',
      city: 'florida',
      date: '2024-10-03',
      owner: 'María López',
      area: 'Centro de la ciudad',
      negotiable: 'Sí',
      type: 'Venta/Renta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa3Ubicacion',
    },
    {
      id: "4",
      title: 'Casa en la Montaña',
      rooms: '2',
      image: '',
      description: 'Casa acogedora rodeada de naturaleza.',
      price: '150000',
      country: 'UUEE',
      city: 'florida',
      date: '2024-10-03',
      owner: 'María López',
      area: 'Zona tranquila',
      negotiable: 'No',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa2Ubicacion',
    },
    {
      id: "5",
      title: 'Casa Moderna',
      rooms: '6',
      image: '',
      description: 'Casa con diseño contemporáneo y todas las comodidades.',
      price: '300000',
      date: '2024-10-08',
      country: 'colombia',
      city: 'popayan',
      owner: 'Carlos Gómez',
      area: 'Zona de lujo',
      negotiable: 'Sí',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa3Ubicacion',
    },
    // Agrega más casas aquí
  ];

  // valor de los filtros guardados localmente 
  criterios = [''];
  title = 'Air-cn';
  rooms = '';
  searchTerm = '';
  country = '';
  city = '';
  mindate = '';
  maxdate = '';
  minprice = '';
  maxprice = '';

  // funcion actualiza el valor de los filtros
  setFilters(event: any) {
    this.rooms = event['rooms'];
    this.searchTerm = event['searchTerm'];
    this.country = event['country'];
    this.city = event['city'];
    this.mindate = event['mindate'];
    this.maxdate = event['maxdate'];
    this.minprice = event['minprice'];
    this.maxprice = event['maxprice'];
  }

  // funcion que inicia el filtrado general en el orden
  // locations(ubicacion) => filterRooms(habitaciones) => filterMinPrice(precio minimo) =>filterMaxPrice(precio maximo)  => filterMinDate(fecha minima) => filterMaxDate(fecha maxima)  => 
  filter() {
    // limpio las listas
    this.listFilterCountry = [];
    this.listFilterCity = [];
    this.listFilterRooms = [];
    this.listFilterMaxPrice = [];
    this.listFilterMinPrice = [];
    this.listFilterMaxDate = [];
    this.listFilterMinDate = [];
    // inicio las llamadas
    this.filterCountry(this.casas);
    this.filterCity(this.listFilterCountry);
    this.filterRooms(this.listFilterCity);
    this.filterMinPrice(this.listFilterRooms);
    this.filterMaxPrice(this.listFilterMinPrice);
    this.filterMinDate(this.listFilterMaxPrice);
    this.filterMaxDate(this.listFilterMinDate);
    
    return this.listFilterMaxDate;
  }

  // funcion que filtra las casas por una fecha maxima
  filterMaxDate(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.maxdate !== ''
        ? new Date(list[index].date) <= new Date(this.maxdate)
          ? this.listFilterMaxDate.push(list[index])
          : null
        : this.listFilterMaxDate.push(list[index]);
    }
  }

  // funcion que filtra las casas por una fecha minima
  filterMinDate(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.mindate !== ''
        ? new Date(list[index].date) >= new Date(this.mindate)
          ? this.listFilterMinDate.push(list[index])
          : null
        : this.listFilterMinDate.push(list[index]);
    }
  }

  // funcion que hace efecto sobre las casas con el filtro de maximo precio y minimo precio
  filterMaxPrice(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.maxprice !== ''
        ? Number(list[index].price) < Number(this.maxprice)
          ? this.listFilterMaxPrice.push(list[index])
          : null
        : this.listFilterMaxPrice.push(list[index]);
    }
  }

  // funcion que hace efecto sobre las casas con el filtro de minimo precio y minimo precio
  filterMinPrice(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.minprice !== ''
        ? Number(list[index].price) > Number(this.minprice)
          ? this.listFilterMinPrice.push(list[index])
          : null
        : this.listFilterMinPrice.push(list[index]);
    }
  }

  // funcion que hace efecto sobre las casas con el filtro de habitaciones
  filterRooms(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.rooms !== ''
        ? list[index].rooms == this.rooms
          ? this.listFilterRooms.push(list[index])
          : Number(list[index].rooms) > 3 && this.rooms == "4+"
          ? this.listFilterRooms.push(list[index])
          : null
        : this.listFilterRooms.push(list[index]);
    }
  }

  // funcion que hace efecto sobre las casas con el filtro de ciudad
  filterCity(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.city !== ''
        ? list[index].city == this.city
          ? this.listFilterCity.push(list[index])
          : null
        : this.listFilterCity.push(list[index]);
    }
  }

  // funcion que hace efecto sobre las casas con el filtro de pais
  filterCountry(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.country !== ''
        ? list[index].country == this.country
          ? this.listFilterCountry.push(list[index])
          : null
        : this.listFilterCountry.push(list[index]);
    }
  }
}

