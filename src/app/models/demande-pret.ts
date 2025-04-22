import { Demande } from "./demande";

export interface DemandePret extends Demande {
    montant: number;
    nombreEcheance: number;
    motif: string;
  }