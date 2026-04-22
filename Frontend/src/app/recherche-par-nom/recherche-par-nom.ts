import { Component, OnInit } from '@angular/core';
import { Telephone } from '../model/telephone.model';
import { TelephoneService } from '../services/telephoneservice';
import { Auth } from '../services/authservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-nom.html',
  styleUrl: './recherche-par-nom.css'
})
export class RechercheParNom implements OnInit {
  nomTel!: string;
  telephone: Telephone[] = [];
  allTels: Telephone[] = [];
  searchTerm!: string;

  constructor(private telephoneService: TelephoneService, public auth: Auth) { }

  ngOnInit(): void {
    this.telephoneService.listetelephones().subscribe((tels: Telephone[]) => {
      this.allTels = tels;
      this.telephone = [...tels];
      console.log(tels);
    });
  }

  onKeyUp(filterText: string) {
    this.telephone = this.allTels.filter(item =>
      item.nomTel?.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  trackById(index: number, item: Telephone) {
    return item.idtel;
  }

  supprimerTelephone(tel: Telephone): void {
    const conf = confirm("Etes-vous sûr ?");
    if (!conf) return;

    this.telephoneService.supprimerTelephone(tel.idtel!).subscribe(() => {
      this.telephone = this.telephone.filter(t => t.idtel !== tel.idtel);
      this.allTels = this.allTels.filter(t => t.idtel !== tel.idtel);
      console.log("Téléphone supprimé");
    });
  }
}