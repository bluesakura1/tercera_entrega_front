import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, Message } from '../../../services/supabase/message.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-message',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  actualuser:user|null = JSON.parse(localStorage.getItem('user')!);

  messageForm: FormGroup;
  messages: Message[] = []; 
  contacts = [
    { id: 1, name: 'Juan Pérez', avatar: 'https://randomuser.me/api/portraits/men/1.jpg'},
    // Añadir más contactos aquí
  ];
  selectedContact: any = null;
  senderUser: number = 123; 

  constructor(private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required] 
    });
  }

  
  ngOnInit(): void {
    this.loadMessages();
    this.route.queryParams.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.senderUser = parseInt(userId, 10); 
      }
    });
  }
  // Seleccionar un contacto para el chat
  apendcontacts(): void {
    this.loadMessages();
    console.log(this.messages,"");
    
    this.messages.map((message:Message) => {

      if (this.contacts.some(obj => obj.id == message.receiverUserUserId)) {
        
      }else{
        this.contacts.push({name:"propietario",id:message.receiverUserUserId,avatar:"https://randomuser.me/api/portraits/men/"+Math.floor(Math.random() * 20)+".jpg"});
      }
      console.log(message,"mensaje de");}
      
  );
  console.log(this.contacts,"frs   ");
  }
  // Seleccionar un contacto para el chat
  selectContact(contact: any): void {
    this.selectedContact = contact;
  }

  // Cargar los mensajes del historial de acuerdo al contacto seleccionado
  loadMessages(): void {
    const user:user|null = JSON.parse(localStorage.getItem('user')!);

    this.messageService.getMessageHistory(user!.user_id).subscribe(
      (messages) => {
        this.messages = messages;
        console.log('Historial de mensajes:', messages);
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );
  }
  onSubdmit(): void {
    this.apendcontacts();
    console.log(this.contacts);
  }
  // Enviar mensaje al backend
  onSubmit(): void {
    const user:user|null = JSON.parse(localStorage.getItem('user')!);
    if (this.messageForm.valid && this.selectedContact) {
      const messageData: Message = {
        ...this.messageForm.value,
        sender_user_id: user!.user_id, 
        receiver_user_id: this.selectedContact.id,
      };

      this.messageService.sendMessage(messageData).subscribe(
        (response) => {
          console.log('Mensaje enviado:', response);
          this.messageForm.reset();
          this.loadMessages(); 
        },
        (error) => {
          console.error('Error al enviar mensaje:', error);
        }
      );
    }
  }
}
