import { Utilisateur } from "./Utilisateur";

export interface Demande {
    id: number;
    typeDemande: string;
    dateCreation: Date;
    statut: string;
    commentaire: string;
    justificatifURL: string;
    utilisateur: Utilisateur;
  }