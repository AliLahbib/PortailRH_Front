import { Demande } from "./demande";

export interface DemandeChangementSituation extends Demande {
    champModifie: string;
    nouvelleValeur: string;
    justification: string;
  }