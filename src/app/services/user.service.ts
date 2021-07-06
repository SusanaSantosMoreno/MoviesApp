import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from "@capacitor/storage";
import { User } from '../Interfaces/interfaces';

const url_users = environment.url_users;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  constructor(private http: HttpClient) { }

  login(mail: string, password: string) {
    const data = { mail, password };

    return new Promise(resolve => {
      this.http.post(`${url_users}/api/auth/login`, data).subscribe(resp => {

        if (resp['msg'] === 'Login ok') {
          this.token = resp['token'];
          this.saveToken(this.token);
          resolve(true);
        } else {
          this.token = null;
          Storage.clear();
          resolve(false);
        }
      });
    });
  }

  async saveToken(token: string) {
    this.token = token;
    Storage.set({
      key: 'token',
      value: JSON.stringify(this.token)
    });
  }

  signup(user: User) {
    return new Promise(resolve => {
      this.http.post(`${url_users}/api/user`, user).subscribe({
        next: resp => {
          console.log(resp);
          resolve(true);
        },
        error: error => {
          console.log(error);
          resolve(false);
        }
      });
    });
  }
}
