export interface Notification {
  receiver_user_id: number;
  sender_user_id: number;
  message?: string;  
  timestamp?: Date;  
}
