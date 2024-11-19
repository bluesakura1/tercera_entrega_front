import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../../auth/pages/interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:3000/api/bookings'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
  }

  realizarReserva(bookingData: Booking): Observable<any> {
    // Agregar la propiedad created_at antes de enviar la solicitud
    const bookingWithCreatedAt = {
      ...bookingData,
      created_at: new Date().toISOString()  
    };

    // Enviar el objeto con created_at
    return this.http.post(`${this.baseUrl}/realizar-reserva`, bookingWithCreatedAt, {
      headers: this.getAuthHeaders()
    });
  }

  cancelarReserva(bookingId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/cancelar-reserva`, { "booking_id":bookingId },{headers: {'Authorization': `Bearer ${token}`}});
  }

  obtenerReservasBuyer(userId: number): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.baseUrl}/todas-las-reserva-buyer`, { 
      user_id:  userId ,
    },{headers: {'Authorization': `Bearer ${token}`}});
  }

  obtenerReservasOwner(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/todas-las-reserva-owner`, { 
      params: { userId },
      headers: this.getAuthHeaders()
    });
  }

  obtenerEstadoReserva(bookingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/estado-reserva`, { 
      params: { bookingId },
      headers: this.getAuthHeaders()
    });
  }

  obtenerMensajesReservaDueno(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/mensaje-reserva-dueno`, { 
      params: { userId },
      headers: this.getAuthHeaders()
    });
  }

  cambiarEstadoReservaOwner(userId: string, bookingIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/estado-reserva`, { userId, bookingIds }, {
      headers: this.getAuthHeaders()
    });
  }
}
