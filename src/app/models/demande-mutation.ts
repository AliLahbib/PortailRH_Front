import { Demande } from "./demande";

export interface DemandeMutation extends Demande {
    serviceActuel: string;
    serviceSouhaite: string;
    motif: string;
  }