import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const url_users = environment.url_users;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const data = { email, password };
    this.http.post(`${url_users}/api/user/login`, data).subscribe(resp => {
      console.log(resp);
    });
  }
}
