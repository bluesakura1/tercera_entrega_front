export interface User{
    userName: string;
    password: string;
    email?: string;
    fullName?: string; 
    confirmPassword?: string;
    bio?: string;  
    profilePicture?: string; 
}