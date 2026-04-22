import { Routes } from '@angular/router';
import { AddTelephone } from './add-telephone/add-telephone';
import { UpdateTelephone } from './update-telephone/update-telephone';
import { Telephoness } from './telephone/telephone';

import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';

import { telephoneGuard } from './telephone-guard';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { ListStatut } from './list-statut/list-statut';
import { RechercheParStatut } from './recherche-par-statut/recherche-par-statut';



export const routes: Routes = [
    { path: "telephoness", component: Telephoness },
    { path: "add_telephone", component: AddTelephone, canActivate: [telephoneGuard] },
    { path: "updateTelephone/:id", component: UpdateTelephone, canActivate: [telephoneGuard] },
    { path: "rechercheParNom", component: RechercheParNom },
    { path: "listS", component: ListStatut },


    { path: "login", component: Login },
    { path: "rechercheparStatut", component: RechercheParStatut }

    ,
    { path: 'app-forbidden', component: Forbidden },


    { path: "", redirectTo: "telephoness", pathMatch: "full" }

];
