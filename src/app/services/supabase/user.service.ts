import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LoginResponse, RegistroResponse } from '../../features/pages/login-response.interface';
import { User } from '../../features/pages/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/User'; // URL base para el backend

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(role:string,user: { userName: string; password: string; email: string; fullName: string }): Observable<RegistroResponse> {
    // Mapeamos el rol para que coincida con el backend
    const backendRole = role === 'admin' ? 'owner' : 'buyer';  // Asumimos que 'admin' tiene rol de propietario, si no es así, será comprador

    const registerUrl = backendRole === 'buyer' 
      ? `${this.apiUrl}/register-buyer` 
      : `${this.apiUrl}/register-owner`;

    return this.http.post<any>(registerUrl, { ...user, role: backendRole }).pipe(  // Enviamos el rol mapeado
      map(response => {
        if (response.success) {
          return { success: true };
        } else {
          return {
            success: false,
            message: response.message || 'Error al registrar usuario'
          };
        }
      })
    );
  }

  // Inicio de sesión
  login(userName: string, password: string): Observable<LoginResponse> {
    const body = { username: userName, password };

    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(  // Endpoint para login
      map(response => {
        if (response.success) {
          // Guarda el token y el usuario en sessionStorage
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('currentUser', userName.toLowerCase().trim());
          sessionStorage.setItem('currentUserRole', response.role);

          return {
            success: true,
            role: response.role
          };
        } else {
          return {
            success: false,
            message: response.message || 'Usuario o contraseña incorrectos'
          };
        }
      })
    );
  }

  // Obtener perfil de usuario
  getProfile(userName: string): Observable<User | null> {
    const token = sessionStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get<any>(`${this.apiUrl}/profile/${userName}`, { headers }).pipe(
      map(response => {
        if (response.success) {
          return response.user as User;
        } else {
          return null;
        }
      })
    );
  }

  // Actualizar perfil de usuario
  updateProfile(userName: string, updatedData: Partial<User>): Observable<{ success: boolean; message: string }> {
    const token = sessionStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.put<any>(`${this.apiUrl}/update-profile/${userName}`, updatedData, { headers }).pipe(
      map(response => {
        if (response.success) {
          return {
            success: true,
            message: 'Perfil actualizado correctamente'
          };
        } else {
          return {
            success: false,
            message: response.message || 'Error al actualizar perfil'
          };
        }
      })
    );
  }

  // Cerrar sesión
  logout(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUserRole');
    sessionStorage.removeItem('token');
  }
}
