import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Telephone } from '../model/telephone.model';
import { TelephoneService } from '../services/telephoneservice';
import { Statut } from '../model/statut.model';
import { CommonModule } from '@angular/common';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-add-telephone',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-telephone.html',
  styleUrls: ['./add-telephone.css']
})
export class AddTelephone implements OnInit {

  newTelephone = new Telephone();
  message = '';
  Statuts: Statut[] = [];
  myForm!: FormGroup;
  uploadedImage!: File;
  imagePath: any;

  constructor(
    private telephoneService: TelephoneService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.telephoneService.listeStatut().subscribe(cats => {
      this.Statuts = cats;
      console.log(cats);
    });

    this.myForm = this.formBuilder.group({
      nomTel: ['', [Validators.required, Validators.minLength(6)]],
      desTEL: ['', Validators.required],
      prixTel: ['', [Validators.required, Validators.min(0)]],
      dateCreation: ['', Validators.required],
      emailtel: ['', [Validators.required, Validators.email]],
      statut: ['', Validators.required],
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; };
  }

  addTelephone() {
    if (this.myForm.invalid) return;

    const form = this.myForm.value;

    this.telephoneService.uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {

        this.newTelephone = {
          nomTel: form.nomTel,
          emailtel: form.emailtel,
          desTel: form.desTEL,
          prixTel: form.prixTel,
          dateCreation: form.dateCreation,
          statut: this.Statuts.find(s => s.idSat == form.statut)!,
          image: img,
          imageStr: img.name,
          images: []
        };

        this.telephoneService.ajouterTelephone(this.newTelephone)
          .subscribe(() => {
            this.router.navigate(['telephoness']);
          });
      });
  }
}