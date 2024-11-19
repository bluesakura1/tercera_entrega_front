import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://your-supabase-url.supabase.co';
  private supabaseKey = 'your-anon-public-key';
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  constructor() { }

  // Obtener casas por ID de usuario
  async getCasasByUserId(userId: number) {
    const { data, error } = await this.supabase
      .from('casas')
      .select('*')
      .eq('id_usuario', userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Actualizar casa
  async updateCasa(casaId: number, updatedData: any) {
    const { data, error } = await this.supabase
      .from('casas')
      .update(updatedData)
      .eq('id', casaId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Eliminar casa
  async deleteCasa(casaId: number) {
    const { data, error } = await this.supabase
      .from('casas')
      .delete()
      .eq('id', casaId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Crear un nuevo usuario
  async createUser(username: string, password: string) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .insert([{ username, password }]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Autenticar usuario (asegúrate de manejar el hashing)
  async authenticateUser(username: string, password: string) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('username', username)
      .eq('password', password); // Asegúrate de usar un hash en producción

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
