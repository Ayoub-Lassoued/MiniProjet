import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class Auth {
    /*
    users: User[] = [
      { username: 'admin', password: '123', roles: ['ADMIN'] },
      { username: 'med', password: '123', roles: ['USER'] },
    ];*/
    apiURL: string = 'http://localhost:8081/users';
    token!: string;
    private helper = new JwtHelperService();
    public loggedUser!: string;
    public isloggedIn: boolean = false;
    public roles!: string[];

    constructor(
        private router: Router,
        private http: HttpClient,
    ) { }

    login(user: User) {
        return this.http.post<User>(this.apiURL + '/login', user, {
            observe: 'response',
        });
    }

    saveToken(jwt: string) {
        localStorage.setItem('jwt', jwt);
        this.token = jwt;
        this.isloggedIn = true;
        this.decodeJWT();
    }

    decodeJWT() {
        if (this.token == undefined) return;
        const decodedToken = this.helper.decodeToken(this.token);
        this.roles = decodedToken.roles;
        this.loggedUser = decodedToken.sub;
    }

    loadToken() {
        this.token = localStorage.getItem('jwt') ?? '';
        if (this.token) {
            this.isloggedIn = true;
            this.decodeJWT();
        } else {
            this.isloggedIn = false;
        }
    }

    getToken(): string {
        return this.token;
    }

    logout() {
        this.loggedUser = undefined!;
        this.roles = undefined!;
        this.token = undefined!;
        this.isloggedIn = false;
        localStorage.removeItem('jwt');
        this.router.navigate(['/login']);
    }

    isAdmin(): Boolean {
        if (!this.roles) return false;
        return this.roles.indexOf('ADMIN') >= 0;
    }

    setLoggedUserFromLocalStorage(login: string) {
        this.loggedUser = login;
        this.isloggedIn = true;
    }

    isTokenExpired(): Boolean {
        return this.helper.isTokenExpired(this.token);
    }
    public registredUser: User = new User();

    setRegistredUser(user: User) {
        this.registredUser = user;
    }

    getRegistredUser(): User {
        return this.registredUser;
    }

    registerUser(user: User) {
        return this.http.post<User>(this.apiURL + '/register', user, {
            observe: 'response'
        });
    }

    validateEmail(code: string) {
        return this.http.get<User>(this.apiURL + '/verifyEmail/' + code);
    }
}

