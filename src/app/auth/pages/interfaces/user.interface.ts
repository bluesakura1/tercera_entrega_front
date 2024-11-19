export interface Property {
    id: string;
    name: string;
    description: string;
    price: number;
    location: string;
  }
  
  export interface User {
    userName: string;
    nombreCompleto?: string;
    profileImage?: string;
    password: string;
    email?: string;
    confirmPassword?: string;
    role: 'usuario' | 'propietario';
    properties?: Property[];  
  }
  