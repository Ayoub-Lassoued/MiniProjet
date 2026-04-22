import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/authservice';

export const produitGuard: CanActivateFn = (route, state) => {
    const authservice = inject(Auth);
    const router = inject(Router);
    if (authservice.isAdmin()) return true;
    else {
        router.navigate(['app-forbidden']);
        return false;
    }
};