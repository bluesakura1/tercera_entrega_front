import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  propertyId: string = '';
  editPropertyForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.editPropertyForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      rooms: ['', Validators.required],
      image: ['', Validators.required],
      mapSrc: ['', Validators.required]
    });
  }
  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    // Cargar los datos de la propiedad por su id desde un servicio
    console.log(this.propertyId);
    
  }

  onSubmit() {
    if (this.editPropertyForm.valid) {
      console.log(this.editPropertyForm.value);
      this.router.navigate(['/property-list']);
    }
  }
}
