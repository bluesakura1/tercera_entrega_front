import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/supabase/user.service';
import { PropertyService } from '../../../services/supabase/property.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../pages/user.interface';

@Component({
  selector: 'app-owner-profile',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.less']
})
export class OwnerProfileComponent implements OnInit {
  ownerProfile: Partial<User> = { fullName: '', email: '', userName: '', password: '', bio: '', profilePicture: '' };
  properties: any[] = [];

  constructor(private userService: UserService, private propertyService: PropertyService, private router: Router) {}

  ngOnInit() {
    const userName = localStorage.getItem('currentUser');
    if (userName) {
      // Se suscribe al Observable devuelto por getProfile()
      this.userService.getProfile(userName).subscribe({
        next: (userProfile) => {
          if (userProfile) {
            this.ownerProfile = userProfile;
            this.loadProperties(userName);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Error al obtener el perfil del propietario', err);
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadProperties(userName: string) {
    this.propertyService.getPropertiesByOwner(userName).subscribe((properties) => {
      this.properties = properties;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.ownerProfile.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateOwnerProfile() {
    const { fullName, email, password, userName, bio, profilePicture } = this.ownerProfile;

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
          localStorage.setItem(userName.toLowerCase().trim(), JSON.stringify(this.ownerProfile));
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
          text: 'No se pudo actualizar el perfil del propietario',
          icon: 'error'
        });
      }
    });
  }

  editProperty(propertyId: string) {
    this.router.navigate(['/edit-property', propertyId]);
  }

  deleteProperty(propertyId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.propertyService.deleteProperty(propertyId);
        this.properties = this.properties.filter((p) => p.id !== propertyId);

        Swal.fire('Eliminado', 'La propiedad ha sido eliminada', 'success');
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
