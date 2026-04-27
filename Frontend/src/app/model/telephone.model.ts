import { Statut } from "./statut.model";
import { Image } from "./Image.model";

export class Telephone {
    idtel?: number;
    nomTel!: string;
    desTel!: String;
    prixTel!: number;
    dateCreation!: Date;
    statut!: Statut;
    emailtel!: String;
    image!: Image
    imageStr!: string
    images!: Image[];



}
