import { Departement } from './departement';

export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    role: string;
    departement?: Departement;
    departementId?: number;
} 