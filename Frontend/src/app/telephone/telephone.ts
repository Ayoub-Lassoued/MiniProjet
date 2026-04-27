import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Telephone } from '../model/telephone.model';
import { TelephoneService } from '../services/telephoneservice';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/authservice';

@Component({
  selector: 'app-telephones',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './telephone.html',
  styleUrl: './telephone.css'
})
export class Telephoness implements OnInit {
  telephones!: Telephone[];

  constructor(private telephoneService: TelephoneService, public auth: Auth) { }

  ngOnInit(): void {
    this.chargerTelephone();
  }

  chargerTelephone() {
    this.telephoneService.listetelephones().subscribe(prods => {
      this.telephones = prods;

      // ✅ Comme le prof : première image de la liste images[]
      this.telephones.forEach(tel => {
        if (tel.images && tel.images.length > 0) {
          tel.imageStr = 'data:' + tel.images[0].type + ';base64,' + tel.images[0].image;
        }
      });
    });
  }

  supprimerTelephone(tel: Telephone) {
    let conf = confirm("Voulez-vous vraiment supprimer ce téléphone ?");
    if (conf) {
      this.telephoneService.supprimerTelephone(tel.idtel!).subscribe(() => {
        this.chargerTelephone();
      });
    }
  }
}