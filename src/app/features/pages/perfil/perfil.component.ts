import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../auth/services/user.service'; 
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule ], 
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {
  profile: any = { fullName: '', email: '', userName: '', password: '', bio: '', profilePicture: '' };

  constructor(private userService: UserService, private router: Router) {}



  ngOnInit() {
    this.userService.getProfile(this.userService.currentUserName).subscribe({
      next: (profile) => (this.profile = profile),
      error: () => this.router.navigate(['/login']),
    });
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
    this.userService.updateProfile(this.profile).subscribe({
      next: () => Swal.fire('Éxito', 'Perfil actualizado', 'success'),
      error: () => Swal.fire('Error', 'No se pudo actualizar el perfil', 'error'),
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
