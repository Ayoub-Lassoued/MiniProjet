import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Telephone } from '../model/telephone.model';
import { TelephoneService } from '../services/telephoneservice';
import { Statut } from '../model/statut.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-telephone',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-telephone.html',
  styles: ``
})
export class UpdateTelephone implements OnInit {
  currentTelephone = new Telephone();
  Status: Statut[] = [];
  myForm!: FormGroup;
  uploadedImage!: File;
  imagePath: any; // ✅ pour l'aperçu

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private telephoneService: TelephoneService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.telephoneService.listeStatut().subscribe(cats => {
      this.Status = cats;
    });

    this.telephoneService.consulterTelephone(this.activatedRoute.snapshot.params['id'])
      .subscribe(prod => {
        this.currentTelephone = prod;

        if (!this.currentTelephone.images) {
          this.currentTelephone.images = [];
        }

        let formattedDate = '';
        if (this.currentTelephone.dateCreation) {
          const date = new Date(this.currentTelephone.dateCreation);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toISOString().substring(0, 10);
          }
        }

        this.myForm = this.formBuilder.group({
          idtel: [this.currentTelephone.idtel],
          nomTel: [this.currentTelephone.nomTel, [Validators.required, Validators.minLength(6)]],
          desTEL: [this.currentTelephone.desTel, Validators.required],
          prixTel: [this.currentTelephone.prixTel, [Validators.required, Validators.min(0)]],
          dateCreation: [formattedDate, Validators.required],
          statut: [this.currentTelephone.statut?.idSat || null, Validators.required],
          emailtel: [this.currentTelephone.emailtel, [Validators.required, Validators.email]],
        });
      });
  }

  updateTelephone() {
    if (this.myForm.invalid) return;

    const formValues = this.myForm.getRawValue();

    this.currentTelephone.nomTel = formValues.nomTel;
    this.currentTelephone.desTel = formValues.desTEL;
    this.currentTelephone.prixTel = formValues.prixTel;
    this.currentTelephone.dateCreation = formValues.dateCreation;
    this.currentTelephone.emailtel = formValues.emailtel;
    this.currentTelephone.statut = { idSat: formValues.statut, nomSat: '' };

    this.telephoneService.updateTelephone(this.currentTelephone).subscribe(() => {
      this.router.navigate(['telephoness']);
    });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];

      // ✅ Aperçu avant ajout
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.imagePath = reader.result;
      };
    }
  }

  onAddImageTelephone() {
    if (!this.uploadedImage) return;
    this.telephoneService
      .uploadImageTel(this.uploadedImage, this.uploadedImage.name, this.currentTelephone.idtel!)
      .subscribe((img: Image) => {
        this.currentTelephone.images.push(img);
        this.imagePath = null; // ✅ effacer l'aperçu après ajout
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.telephoneService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentTelephone.images.indexOf(img, 0);
        if (index > -1) {
          this.currentTelephone.images.splice(index, 1);
        }
      });
  }
}