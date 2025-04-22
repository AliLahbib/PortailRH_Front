import { Departement } from './departement';

export interface Utilisateur {
    id?: number;
    nom: string;
    matricule?: string;
    prenom: string;
    email: string;
    motDePasse?: string;
    role: string;
    departement?: Departement;
}
  