import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Inicializamos el formulario con las validaciones necesarias
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]],  
      username: ['', [Validators.required]],  
      is_owner: [false, [Validators.required]]  
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log("Formulario inválido", this.loginForm);  
      return;
    }

    this.loading = true;
    const { email, password, username, is_owner } = this.loginForm.value;

    console.log("Enviando datos al backend:", { email, password, username, is_owner }); 

    // Enviar los datos completos al backend
    this.userService.login({ email, password, username, is_owner }).subscribe({
      next: (response) => {
        console.log("Respuesta del backend:", response);  

        // Guardamos los datos del usuario y el token en localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);  
      },
      error: (error) => {
        this.loading = false;
        console.error("Error en el login:", error);  
        this.errorMessage = 'Invalid credentials. Please try again.';  
      }
    });
  }
}
