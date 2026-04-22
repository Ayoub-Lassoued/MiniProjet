import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Telephone } from '../model/telephone.model';
import { TelephoneService } from '../services/telephoneservice';
import { Statut } from '../model/statut.model';

@Component({
  selector: 'app-update-telephone',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-telephone.html',
  styles: ``
})
export class UpdateTelephone implements OnInit {
  currentTelephone = new Telephone();
  Status!: Statut[];
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private telephoneService: TelephoneService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // 1️⃣ تحميل قائمة الحالات
    this.telephoneService.listeStatut().subscribe(cats => {
      this.Status = cats;
    });

    // 2️⃣ تحميل بيانات الهاتف
    this.telephoneService.consulterTelephone(this.activatedRoute.snapshot.params['id'])
      .subscribe(prod => {
        this.currentTelephone = prod;

        // التأكد من وجود التاريخ
        let formattedDate = '';
        if (this.currentTelephone.dateCreation) {
          const date = new Date(this.currentTelephone.dateCreation);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toISOString().substring(0, 10);
          }
        }

        // إنشاء الفورم مع القيم المستلمة
        this.myForm = this.formBuilder.group({
          idtel: [this.currentTelephone.idtel, Validators.required],

          nomTel: [this.currentTelephone.nomTel, Validators.required],
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

    // تحديث بيانات الهاتف

    this.currentTelephone.nomTel = formValues.nomTel;
    this.currentTelephone.desTel = formValues.desTEL;
    this.currentTelephone.prixTel = formValues.prixTel;
    this.currentTelephone.dateCreation = formValues.dateCreation;
    this.currentTelephone.emailtel = formValues.emailtel;

    // تحديث الاستات
    this.currentTelephone.statut = { idSat: formValues.statut, nomSat: '' };

    // إرسال التحديث
    this.telephoneService.updateTelephone(this.currentTelephone).subscribe(() => {
      this.router.navigate(['telephoness']);
    });
  }
}
