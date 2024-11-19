import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.apiUrl;  

  constructor(private http: HttpClient) {}

  /**
   * Método para iniciar sesión
   * @param userData 
   * @returns 
   */
  login(userData: { email: string; password: string, username: string, is_owner: boolean }): Observable<any> {
    const loginUrl = `${this.baseUrl}/user/login`;  // Endpoint correcto para el login
    return this.http.post<any>(loginUrl, userData); // Solicitud POST con los datos en el cuerpo
  }

  /**
   * Método para registrar un nuevo usuario
   * @param userData 
   * @returns 
   */
  register(userData: { email: string; username: string; password: string; is_owner: boolean }): Observable<any> {
    const registerUrl = `${this.baseUrl}/user/register-${userData.is_owner ? 'owner' : 'buyer'}`;
    return this.http.post<any>(registerUrl, userData);  
  }
}
