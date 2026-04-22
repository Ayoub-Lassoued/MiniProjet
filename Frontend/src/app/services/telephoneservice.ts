import { Injectable } from '@angular/core';
import { Telephone } from '../model/telephone.model';
import { Statut } from '../model/statut.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './authservice';

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
        const url = `${this.apiTelephoneURL}/telStats/${idSat}`;
        return this.http.get<Telephone[]>(url);
    }

  

    listeStatut(): Observable<Statut[]> {
        return this.http.get<Statut[]>(this.apiStatutURL + "/all");
    }

    addStatut(statut: Statut): Observable<Statut> {
        return this.http.post<Statut>(this.apiStatutURL + "/addstatut", statut);
    }
}


