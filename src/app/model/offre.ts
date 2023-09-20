import { Prospect } from "./prospect";
import { Service } from "./service";

export interface Offre{
    id : string,
    nom : string,
    type : string,
    prix : number,
    description : string,
    date : string,
    services: Service[],
    prospect: Prospect | null, // Liste des services inclus dans l'offre
    serviceNom?: string,
    editing: boolean,
}