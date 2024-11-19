export interface LoginResponse{
    success: boolean,
    message?: string;

} 

export interface RegistroResponse extends LoginResponse{
    
}