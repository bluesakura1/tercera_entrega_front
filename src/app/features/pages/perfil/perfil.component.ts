import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/supabase/user.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule], 
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {
  profile: any = { fullName: '', email: '', userName: '', password: '', bio: '', profilePicture: '' };

  constructor(private userService: UserService, private router: Router) {}



  ngOnInit() {
    const userName = localStorage.getItem('currentUser');
    if (userName) {
      this.userService.getProfile(userName).subscribe({
        next: (userProfile) => {
          if (userProfile) {
            this.profile = userProfile;
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Error al obtener el perfil', err);
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.profilePicture = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    const { fullName, email, password, userName, bio, profilePicture } = this.profile;

    if (!fullName || !email || !password || !userName) {
      Swal.fire({
        title: 'Error',
        text: 'Debe completar todos los campos',
        icon: 'error'
      });
      return;
    }

    this.userService.updateProfile(userName, { fullName, email, password, userName, bio, profilePicture }).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem(userName.toLowerCase().trim(), JSON.stringify(this.profile));
          localStorage.setItem('currentUser', userName.toLowerCase().trim());

          Swal.fire({
            title: 'Éxito',
            text: 'Perfil actualizado correctamente',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error'
          });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el perfil',
          icon: 'error'
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
