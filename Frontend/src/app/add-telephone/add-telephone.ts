import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Telephone } from '../model/telephone.model';
import { TelephoneService } from '../services/telephoneservice';
import { Statut } from '../model/statut.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-telephone',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-telephone.html',
  styleUrls: ['./add-telephone.css']
})




export class AddTelephone {

  newTelephone = new Telephone();
  message = !String;
  Statuts!: Statut[];
  newIdSat!: number;
  newStatu!: Statut;
  myForm!: FormGroup;





  constructor(

    private telephoneService: TelephoneService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit() {

    this.telephoneService.listeStatut().
      subscribe(cats => {
        this.Statuts = cats;
        console.log(cats);
      });
    this.myForm = this.formBuilder.group({
      /*
      idtel: ['', Validators.required],*/
      nomTel: ['', [Validators.required, Validators.minLength(6)]],
      desTEL: ['', Validators.required],
      prixTel: ['', [Validators.required, Validators.min(0)]],
      dateCreation: ['', Validators.required],
      emailtel: ['', [Validators.required, Validators.email]],
      statut: ['', Validators.required],
    },);
  }

  addTelephone() {
    const form = this.myForm.value;

    this.newTelephone = {
      nomTel: form.nomTel,
      emailtel: form.emailtel,
      desTel: form.desTEL,
      prixTel: form.prixTel,
      dateCreation: form.dateCreation,
      statut: this.Statuts.find(s => s.idSat == form.statut)!
    };

    this.telephoneService.ajouterTelephone(this.newTelephone)
      .subscribe(() => {
        this.router.navigate(['telephoness']);
      });
  }


}


