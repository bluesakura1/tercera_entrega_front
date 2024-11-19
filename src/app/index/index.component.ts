import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../services/supabase/supabase.service';
import { Supabase } from '../utils/images';
import { ReviewService } from '../services/supabase/review.service';

interface Casa {
  id: string;
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
  rating?: number; 
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],  
})
export class IndexComponent {
  paramLabel = '';
  
  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.paramLabel = params['search'] || this.paramLabel;
    });
  }

  casas: Casa[] = [
    {
      id: "1",
      title: 'Casa en la Playa',
      rooms: '1',
      image: Supabase("casa1.jpeg"),
      description: 'Una hermosa casa frente al mar con acceso privado a la playa.',
      price: '200000',
      country: 'colombia',
      city: 'bogoto',
      owner: 'Juan Pérez',
      date: '2022-10-03',
      area: 'Zona residencial segura',
      negotiable: 'Sí',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa1Ubicacion',
    },
    {
      id: "2",
      title: 'Casa de Campo',
      rooms: '1',
      image: Supabase("casa2.jpeg"),
      country: 'colombia',
      city: 'bogoto',
      description: 'Una acogedora casa de campo con vistas espectaculares.',
      price: '$150,000',
      owner: 'Maria López',
      date: '2022-10-09',
      area: 'Zona rural tranquila',
      negotiable: 'No',
      type: 'Renta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa2Ubicacion',
    },
    {
      id: "3",
      title: 'Casa en la Ciudad',
      rooms: '2',
      image: Supabase("casa3.jpeg"),
      description: 'Una moderna casa en el corazón de la ciudad.',
      price: '$300,000',
      country: 'UUEE',
      city: 'florida',
      date: '2024-10-03',
      owner: 'María López',
      area: 'Centro de la ciudad',
      negotiable: 'Sí',
      type: 'Venta/Renta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa3Ubicacion',
    },
    {
      id: "4",
      title: 'Casa en la Montaña',
      rooms: '2',
      image: Supabase("casa4.jpeg"),
      description: 'Casa acogedora rodeada de naturaleza.',
      price: '150000',
      country: 'UUEE',
      city: 'florida',
      date: '2024-10-03',
      owner: 'María López',
      area: 'Zona tranquila',
      negotiable: 'No',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa2Ubicacion',
    },
    {
      id: "5",
      title: 'Casa Moderna',
      rooms: '6',
      image: Supabase("casa5.jpeg"),
      description: 'Casa con diseño contemporáneo y todas las comodidades.',
      price: '300000',
      date: '2024-10-08',
      country: 'colombia',
      city: 'popayan',
      owner: 'Carlos Gómez',
      area: 'Zona de lujo',
      negotiable: 'Sí',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa3Ubicacion',
    },
  ];

  getHomeInfo() {
    switch (Number(this.paramLabel)) {
      case 1:
        return this.casas[0];
      case 2:
        return this.casas[1];
      case 3:
        return this.casas[2];
      case 4:
        return this.casas[3];
      case 5:
        return this.casas[4];
      default:
        return this.casas[0];
    }
  }

  casass: any[] = [];
}
