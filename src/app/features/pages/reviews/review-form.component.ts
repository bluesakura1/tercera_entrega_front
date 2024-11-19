import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../../../services/supabase/review.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      listingId: ['', Validators.required],  
      rating: [null, Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const reviewData = {
        userId: parseInt(localStorage.getItem('currentUserId') || '', 10),  
        listingId: this.reviewForm.value.listingId,  
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        createdAt: new Date(),  
      };

      // Llamar al servicio para enviar la reseña al backend
      this.reviewService.addReview(reviewData).subscribe(
        response => {
          console.log('Reseña agregada exitosamente', response);
          this.reviewForm.reset();
        },
        error => {
          console.error('Error al agregar reseña', error);
        }
      );
    }
  }
}
