import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Telephone } from '../model/telephone.model';
import { TelephoneService } from '../services/telephoneservice';
import { Statut } from '../model/statut.model';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-telephone',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-telephone.html',
  styleUrls: ['./add-telephone.css']
})
export class AddTelephone implements OnInit {

  newTelephone = new Telephone();
  Statuts: Statut[] = [];
  uploadedImage!: File;
  imagePath: any;

  constructor(
    private telephoneService: TelephoneService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.telephoneService.listeStatut().subscribe(cats => {
      this.Statuts = cats;
    });


    this.newTelephone.statut = null!;
    this.newTelephone.images = [];
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadedImage = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; };
    }
  }

  addTelephone(form: NgForm) {
    if (form.invalid) return;


    this.telephoneService.ajouterTelephone(this.newTelephone)
      .subscribe((tel) => {

    
        if (this.uploadedImage) {
          this.telephoneService
            .uploadImageTel(this.uploadedImage, this.uploadedImage.name, tel.idtel!)
            .subscribe(() => {
              this.router.navigate(['telephoness']);
            });
        } else {
          this.router.navigate(['telephoness']);
        }
      });
  }
}