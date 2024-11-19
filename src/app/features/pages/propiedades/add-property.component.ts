import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
  addPropertyForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.addPropertyForm = this.fb.group({
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

  onSubmit() {
    if (this.addPropertyForm.valid) {
      console.log(this.addPropertyForm.value);
      this.router.navigate(['/property-list']);
    }
  }
}
