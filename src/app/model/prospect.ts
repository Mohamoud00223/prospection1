import { Offre } from "./offre";

export interface Prospect{
    id : string,
    prenom : string,
    nom : string,
    numero : string,
    adresse : string,
    sexe : string,
    status : string,
    editing?: boolean,
    etape?: string,
    dateMiseAJour?: Date,
    offre?: Offre[]
}