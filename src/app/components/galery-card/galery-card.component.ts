import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';import { RouterOutlet } from '@angular/router';
import { Property } from '../../services/supabase/property.service';

interface Casa {
  id:string;
  rooms: string;
  title: string;
  description: string;
  price: string;
  country: string;
  city: string;
  owner: string;
  area: string;
  negotiable: string;
  type: string;
  image: string;
  mapSrc: string;
  date: string;
  searchTerm?: string;
}

@Component({
  selector: 'app-galery-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './galery-card.component.html',
  styleUrl: './galery-card.component.css'
})
export class GaleryCardComponent {

  index="/index?search="

  name = new FormControl('');

  // input que trae los datos que se 
  @Input({ required: true }) cardCasainfo!: Property;

}
