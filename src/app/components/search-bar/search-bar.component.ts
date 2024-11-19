import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';import { RouterOutlet } from '@angular/router';
import { Supabase } from '../../utils/images';
import { PropertyService } from '../../services/supabase/property.service';
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
  selector: 'app-search-bar',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  constructor(private propertyService: PropertyService) {}
  casas:any;
  IsGetCasas:boolean=false;
// listas de acumulacion de paices para evitar filtros con paices o ciudades repetidas
listCountrys = [""];
listCitys = [""];
ngOnInit(): void {
  if(this.IsGetCasas==false) {
    
    this.updatebuyerhouse();
    this.IsGetCasas=true;
  }
  // Verificar el rol del usuario desde localStorage
}

updatebuyerhouse() {  

  this.propertyService.getAllProperties().subscribe(
    (counter) => {
      console.log(counter);
      this.casas=counter
    },
    (error) => {
      console.error('Error al cargar historial de mensajes:', error);
    }
  );

}


// variables del reactive form
  rooms = new FormControl('');
  searchtermn = new FormControl('');
  country = new FormControl('');
  city = new FormControl('');
  price_per_nig = new FormControl('');
  num_bedrooms = new FormControl('');
  max_guests = new FormControl('');
  num_bathrooms= new FormControl('');



// variables que el componente va a devolver a la pagina que lo contendra para saber que filtros estan vigentes
@Output() setCriterios: EventEmitter<any> = new EventEmitter<string>();
@Output() setSearchtermn: EventEmitter<any> = new EventEmitter<string>();
@Output() setPrice_per_nig: EventEmitter<string> = new EventEmitter<string>();
  @Output() setMax_guests: EventEmitter<string> = new EventEmitter<string>();
  @Output() setNum_bedrooms: EventEmitter<string> = new EventEmitter<string>();
  @Output() setCity: EventEmitter<string> = new EventEmitter<string>();
  @Output() setCountry: EventEmitter<string> = new EventEmitter<string>();
  @Output() setNum_bathrooms: EventEmitter<string> = new EventEmitter<string>();

  // funcion para enviar los filtros selecionados 
  
  enviarValor() {    
        this.setCriterios.emit(
      {
        "max_guests":this.max_guests.value!,  
        "searchtermn":this.searchtermn.value!,  
        "price_per_nig":this.price_per_nig.value!,
        "num_bathrooms":this.num_bathrooms.value!,
        "num_bedrooms":this.num_bedrooms.value!,
        "city":this.city.value!,
        "country":this.country.value!,
      }
      
      );
  }

// funcion para resetear todos los filtros a 0
  setReset(){
    this.price_per_nig = new FormControl('');
    this.country = new FormControl('');
    this.city = new FormControl('');
    this.num_bedrooms = new FormControl('');
    this.num_bathrooms = new FormControl('');
    this.max_guests = new FormControl('');
    this.setCriterios.emit(
      {
        "price_per_nig":this.price_per_nig.value!,  
        "num_bedrooms":this.num_bedrooms.value!,  
        "num_bathrooms":this.num_bathrooms.value!,
        "max_guests":this.max_guests.value!,
        "searchtermn":this.searchtermn.value!,
        "city":this.city.value!,
        "country":this.country.value!,
      }
    );
  
  }
  
}
