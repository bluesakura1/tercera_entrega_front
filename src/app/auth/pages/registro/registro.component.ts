// registro.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      is_owner: [false] 
    });
  }

  onSubmit() {
   
    if (this.registroForm.invalid) {
      return;
    }

   
    this.loading = true;
    const { email, username, password, is_owner } = this.registroForm.value;

    
    this.userService.register({ email, username, password, is_owner }).subscribe({
      next: (response) => {
        // Si el registro es exitoso, mostramos una alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Registro Exitoso!',
          text: 'El usuario ha sido registrado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        
        this.loading = false;
        this.errorMessage = 'Hubo un error en el registro. Por favor, inténtalo nuevamente.';
        
        if (error.status === 400) {
          // Error de correo ya registrado
          if (error.error.message && error.error.message.includes("already exists")) {
            Swal.fire({
              icon: 'error',
              title: 'Correo ya registrado',
              text: `El correo ${this.registroForm.value.email} ya está registrado. Intenta con otro.`,
              confirmButtonText: 'Aceptar'
            });
          } else {
            // Otro tipo de error
            Swal.fire({
              icon: 'error',
              title: 'Error en el registro',
              text: 'Hubo un problema al procesar tu solicitud. Intenta de nuevo más tarde.',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          // Error de conexión o cualquier otro tipo de error
          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'Hubo un problema con la conexión al servidor. Por favor, inténtalo de nuevo.',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    });
  }
}
