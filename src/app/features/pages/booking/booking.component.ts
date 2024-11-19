  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
  import { BookingService } from '../../../services/supabase/booking.service';
  import { ActivatedRoute, Router, RouterLink } from '@angular/router';
  import { CommonModule } from '@angular/common';
  interface user {
    isActive: boolean;
    user_id: number;
    email: string;  
    profile_picture: string;  
    is_owner: boolean;  
    bio: string;  
    created_at: string;  
    updated_at: string;  
    deleted_at: string;  
  }
  interface book {
  Isread: boolean,
  booking_id: number,
  created_at: string,
  deleted_at: string,
  end_date: string,
  start_date: string,
  total_price: number,
  updated_at: string
}
  @Component({
    selector: 'app-booking',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule,RouterLink],
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
  })
  export class BookingComponent implements OnInit {
    booking:any=[]
    actualuser:user|null = JSON.parse(localStorage.getItem('user')!);

    bookingForm: FormGroup;
    propertyId: string = '';

    constructor(
      private fb: FormBuilder,
      private bookingService: BookingService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      // Definir el formulario con los controles necesarios
      this.bookingForm = this.fb.group({
        listingId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        totalPrice: ['', [Validators.required, Validators.min(0)]]
      });
    }

    ngOnInit(): void {
      // Obtener el ID de la propiedad desde la URL
      this.propertyId = this.route.snapshot.paramMap.get('id') || '';
    }

    // Método para realizar la reserva
    onSubmit(): void {
      if (this.bookingForm.valid) {
        // Obtener las fechas como cadenas en formato YYYY-MM-DD
        const startDate = this.bookingForm.value.startDate;
        const endDate = this.bookingForm.value.endDate;
    
        // Validar que las fechas no sean inválidas
        if (!startDate || !endDate) {
          console.error('Las fechas de inicio o fin son inválidas');
          return;
        }
    
        //aqui establecmos un precio pr defecto para proba
        const totalPrice = this.bookingForm.value.totalPrice || 56437;
    
        // Obtener el user_id del localStorage (asegúrate que el usuario esté autenticado)
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = currentUser?.user_id;
    
        // Validar que se obtuvo el user_id
        if (!userId) {
          console.error('No se pudo obtener el user_id del usuario');
          return;
        }

        // Preparar los datos de la reserva, asegurándose de que las fechas estén en formato correcto
        const bookingData = {
          listing_id: parseInt(this.bookingForm.value.listingId, 10),
          user_id: userId,  
          start_date: startDate,  
          end_date: endDate,  
          total_price: totalPrice
        };
    
        // Llamar al servicio para realizar la reserva
        this.bookingService.realizarReserva(bookingData).subscribe(response => {
          console.log('Reserva realizada con éxito', response);
          this.router.navigate(['/property-list']);  
        }, error => {
          console.error('Error al realizar la reserva', error);
          if (error.error && error.error.message) {
            console.error('Errores específicos:', error.error.message);
          }
        });
      } else {
        console.error('Formulario inválido');
      }
    }

    // Método para cancelar una reserva
    cancelarReserva(bookingId: number): void {
      this.bookingService.cancelarReserva(bookingId).subscribe(response => {
        console.log('Reserva cancelada', response);
        
      }, error => {
        console.error('Error al cancelar la reserva', error);
      });
    }
  submitget(){
    this.bookingService.obtenerReservasBuyer(this.actualuser!.user_id).subscribe(response => {
      console.log('Reserva cancelada', response);
      this.booking.push(response)
      
    }, error => {
      console.error('Error al cancelar la reserva', error);
    });
}
print(reu:any){
  console.log(reu);
  
}
  ObtenerReserva(bookingId: string): void {
      console.log("w");

    }
  }
