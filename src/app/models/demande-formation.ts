import { Demande } from "./demande";

export interface DemandeFormation extends Demande {
    nomFormation: string;
    organisme: string;
    duree: string;
    objectif: string;
  }