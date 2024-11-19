export interface LoginResponse{
    success: boolean,
    message?: string;
    role?: 'usuario' | 'propietario';

} 

export interface RegistroResponse extends LoginResponse{
    
}