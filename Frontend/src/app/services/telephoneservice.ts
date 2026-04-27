import { Injectable } from '@angular/core';
import { Telephone } from '../model/telephone.model';
import { Statut } from '../model/statut.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../model/Image.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class TelephoneService {
    apiTelephoneURL: string = 'http://localhost:8080/Telephones/api';
    apiStatutURL: string = 'http://localhost:8080/Telephones/api/statuts';

    constructor(private http: HttpClient) { }

    // ✅ Téléphones
    listetelephones(): Observable<Telephone[]> {
        return this.http.get<Telephone[]>(this.apiTelephoneURL + "/all");
    }

    consulterTelephone(id: number): Observable<Telephone> {
        return this.http.get<Telephone>(this.apiTelephoneURL + "/getbyid/" + id);
    }

    ajouterTelephone(tel: Telephone): Observable<Telephone> {
        return this.http.post<Telephone>(this.apiTelephoneURL + "/addtel", tel);
    }

    updateTelephone(tel: Telephone): Observable<Telephone> {
        return this.http.put<Telephone>(this.apiTelephoneURL + "/updatetel", tel);
    }

    supprimerTelephone(id: number): Observable<void> {
        return this.http.delete<void>(this.apiTelephoneURL + "/deltel/" + id);
    }

    rechercherParNom(nom: string): Observable<Telephone[]> {
        return this.http.get<Telephone[]>(this.apiTelephoneURL + "/telByName/" + nom);
    }

    rechercheParStatut(idSat: number): Observable<Telephone[]> {
        return this.http.get<Telephone[]>(`${this.apiTelephoneURL}/telStats/${idSat}`);
    }

    // ✅ Statuts
    listeStatut(): Observable<Statut[]> {
        return this.http.get<Statut[]>(this.apiStatutURL + "/all");
    }

    addStatut(statut: Statut): Observable<Statut> {
        return this.http.post<Statut>(this.apiStatutURL + "/addstatut", statut);
    }

    // ✅ Images — upload image simple
    uploadImage(file: File, filename: string): Observable<Image> {
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        return this.http.post<Image>(this.apiTelephoneURL + '/image/upload', imageFormData);
    }

    // ✅ Images — charger les détails d'une image
    loadImage(id: number): Observable<Image> {
        return this.http.get<Image>(`${this.apiTelephoneURL}/image/get/info/${id}`);
    }

    // ✅ Images — upload image liée à un téléphone (plusieurs images)
    uploadImageTel(file: File, filename: string, idTel: number): Observable<Image> {
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        return this.http.post<Image>(
            `${this.apiTelephoneURL}/image/uplaodImageTel/${idTel}`,
            imageFormData
        );
    }

    // ✅ Images — supprimer une image
    supprimerImage(id: number): Observable<void> {
        return this.http.delete<void>(
            `${this.apiTelephoneURL}/image/delete/${id}`,
            httpOptions
        );
    }
}