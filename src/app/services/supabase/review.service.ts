import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  userId: number;  
  listingId: string;  
  rating: number;
  comment: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:3000/api/reviews';  

  constructor(private http: HttpClient) {}

  // Método para agregar una nueva reseña
  addReview(reviewData: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}/dejar-valoracion`, reviewData);
  }

  // Método para obtener todas las reseñas de una propiedad
  getReviewsByProperty(propertyId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/ver-valoraciones?propertyId=${propertyId}`);
  }
}
