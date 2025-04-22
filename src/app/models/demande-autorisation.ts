import { Demande } from "./demande";

export interface DemandeAutorisation extends Demande {
  dateAutorisation: Date;
  heureDebut: string;
  heureFin: string;
  raison: string;
}
