import { Utilisateur } from "./Utilisateur";

export interface Demande {
    id: number;
    typeDemande: string;
    dateCreation: Date;
    statut: StatutDemande;
    commentaire: string;
    justificatifURL: string;
    utilisateur: Utilisateur;
    utilisateurId?: number;
  }


  export enum StatutDemande {
    EN_ATTENTE = 'EN_ATTENTE',
    VALIDE = 'VALIDE',
    REFUSE = 'REFUSE'
  }