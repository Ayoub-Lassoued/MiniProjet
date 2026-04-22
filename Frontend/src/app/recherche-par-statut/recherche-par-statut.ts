import { Component } from '@angular/core';
import { Telephone } from '../model/telephone.model';
import { Statut } from '../model/statut.model';
import { TelephoneService } from '../services/telephoneservice';
import { Auth } from '../services/authservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-statut',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-statut.html',
  styleUrl: './recherche-par-statut.css'
})
export class RechercheParStatut {
  telephones: Telephone[] = [];
  Status: Statut[] = [];
  IdStatus!: number;

  constructor(private telephoneService: TelephoneService, public auth: Auth) { }

  ngOnInit(): void {
    // Charger tous les statuts
    this.telephoneService.listeStatut().subscribe(cats => {
      this.Status = cats;
      console.log('Statuts:', this.Status);
    });
  }

  // Quand l'utilisateur change le statut
  onChange(): void {
    if (!this.IdStatus) return;

    this.telephoneService.rechercheParStatut(this.IdStatus).subscribe(tels => {
      this.telephones = tels;
      console.log('Téléphones filtrés:', this.telephones);
    });
  }

  // Supprimer un téléphone
  supprimerTelephone(tel: Telephone): void {
    const conf = confirm("Voulez-vous vraiment supprimer ce téléphone ?");
    if (!conf) return;

    this.telephoneService.supprimerTelephone(tel.idtel!).subscribe(() => {
      this.telephones = this.telephones.filter(t => t.idtel !== tel.idtel);
      console.log("Téléphone supprimé :", tel.idtel);
    });
  }

  trackById(index: number, item: Telephone) {
    return item.idtel;
  }

}
