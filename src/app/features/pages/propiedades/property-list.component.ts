import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../../services/supabase/property.service';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit  {
  propiedades = [
    { id: '1', title: 'Casa en la Playa' },
    { id: '2', title: 'Casa de Campo' },
    { id: '3', title: 'Casa en la Ciudad' }
  ];

  casas:any


  constructor(private router: Router,private propertyService: PropertyService) {}
  ngOnInit(): void {
    this.getAllMyListings();  
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  getAllMyListings() {  
    this.propertyService.getPropertiesByOwner().subscribe(
      (counter) => {
        this.casas=counter;
        console.log(counter);
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );

  }

  deleteProperty(listing:number) {  
    this.propertyService.deleteProperty(listing).subscribe(
      (counter) => {
        console.log("se elimino con exito");
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );

  }

  editProperty(id: string) {
    this.router.navigate([`/edit-property/${id}`]);
  }

}
