import { Component } from '@angular/core';
import { TelephoneService } from '../services/telephoneservice';
import { Statut } from '../model/statut.model';
import { UpdateStatut } from "../update-statut/update-statut";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-statut',
  imports: [UpdateStatut, CommonModule],
  templateUrl: './list-statut.html',
  styleUrl: './list-statut.css'
})
export class ListStatut {
  Statuts!: Statut[];
  selectedStatut!: Statut;
  ajout: boolean = true;
  updatedSatt: Statut = {
    nomSat: "",

  };  // pas d'idSat


  constructor(private telephoneService: TelephoneService) { }

  ngOnInit(): void {
    this.chargerstatut();
  }

  chargerstatut() {
    this.telephoneService.listeStatut().subscribe(deps => {
      this.Statuts = deps;  // ✅ مباشرة لأن البيانات array
      console.log(this.Statuts);
    });
  }
  updatedStatut(sat: Statut) {
    this.telephoneService.addStatut(sat).subscribe(() => this.chargerstatut());
  }
  updateSat(sat: Statut) {
    this.updatedSatt = { ...sat }; // important !
    this.ajout = false;
  }


  trackById(index: number, item: Statut) {
    return item.idSat;
  }





}
