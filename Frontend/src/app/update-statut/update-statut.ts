import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Statut } from '../model/statut.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-statut',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-statut.html',
  styleUrl: './update-statut.css'
})
export class UpdateStatut {
  @Input() statut!: Statut;
  @Input() ajout!: boolean;
  @Output() StatuttUpdated = new EventEmitter<Statut>();
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateStatut ", this.statut);
  }


  saveStatut() {
    this.StatuttUpdated.emit(this.statut);
  }


}
