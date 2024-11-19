import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService, Notification } from '../../../services/supabase/notification.service';  
import { DatePipe } from '@angular/common';  
import { RouterLink } from '@angular/router';

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
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],  
  providers: [DatePipe],  
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})


export class NotificationsComponent implements OnInit {
  messages=0
  booking=22
  notifications: Notification[] = [];  

  constructor(private notificationService: NotificationService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.BookingNotification()
    this.MessagesNotification()
  }

  MessagesNotification() {  
    const user:user|null = JSON.parse(localStorage.getItem('user')!);

    this.notificationService.fetchNotificationMessage(user!.user_id).subscribe(
      (counter) => {
        this.messages = counter[0].count;
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );

  }

  BookingNotification() {  
    const user:user|null = JSON.parse(localStorage.getItem('user')!);

    this.notificationService.fetchNotificationBooking(user!.user_id).subscribe(
      (counter) => {
        this.booking = counter.counts;
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );

  }


}
