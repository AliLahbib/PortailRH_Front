import { Demande } from "./demande";

export interface DemandeConge extends Demande {
    dateDebut: Date;
    dateFin: Date;
    motif: string;
  }