import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Property {
  id?: string;
  title?: string;
  description?: string;
  ownerUserName?: string;
  pricePerNight?: number;
  location?: string;
  images?: string[];
  createdAt?: Date;
  address?: string;
  city?: string;
  country?: string;
  able?: false;
  latitude?: number;
  longitude?: number;
  price_per_nig?: number;
  num_bedrooms?: number;
  num_bathrooms?: number;
  max_guests?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/api/listings';

  constructor(private http: HttpClient) {}

  // Obtener todas las propiedades de un propietario específico
  getPropertiesByOwner(): Observable<Property[]> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')!);
    return this.http.post<Property[]>(
      `${this.apiUrl}/obtener-propiedaded-owner`,
      { userid: user.id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  // Obtener todas las propiedades que existen filtradas
  getPropertiesBybuyerFiltered({
    city,
    country,
    price_per_nig,
    num_bedrooms,
    num_bathrooms,
    max_guests,
    searchtermn,
  }: {
    city?: string;
    country?: string;
    price_per_nig?: string;
    num_bedrooms?: string;
    num_bathrooms?: string;
    max_guests?: string;
    searchtermn?: string;
  }): Observable<Property[]> {
    const token = localStorage.getItem('token');
    return this.http.post<Property[]>(
      `${this.apiUrl}/obtener-propiedaded-filtradas`,

      {
        city,
        country,
        price_per_nig,
        num_bedrooms,
        num_bathrooms,
        max_guests,
        searchtermn,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Agregar una nueva propiedad
  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(
      `${this.apiUrl}/agregar-propiedad`,
      property
    );
  }

  // Editar una propiedad existente
  editProperty(
    user_id: number,
    listing_id: number,
    title?: string,
    max_guests?: string,
    num_bathrooms?: string,
    num_bedrooms?: string,
    price_per_nig?: string,
    latitude?: string,
    longitude?: string,
    address?: string,
    description?: string,
    country?: string,
    city?: string
  ): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.post<void>(
      `${this.apiUrl}/update-propiedad`,
      {
        userid: user_id,
        listing_id: listing_id,
        title: title,
        city: city,
        country: country,
        description: description,
        address: address,
        latitude: latitude,
        longitude: longitude,
        price_per_nig: price_per_nig,
        num_bedrooms: num_bedrooms,
        num_bathrooms: num_bathrooms,
        max_guests: max_guests,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Eliminar una propiedad
  deleteProperty( listing_id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')!);
    return this.http.post<void>(
      `${this.apiUrl}/eliminar-propiedad`,
      {
        userid: user.id,
        listing_id: listing_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Obtener una propiedad por su ID
  getPropertyById(propertyId: string): Observable<Property> {
    return this.http.get<Property>(
      `${this.apiUrl}/obtener-propiedad-buyer/${propertyId}`
    );
  }

  // Filtrar propiedades
  getAllProperties(): Observable<Property[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Property[]>(
      `${this.apiUrl}/obtener-propiedaded-buyer`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
