import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { User } from '../Interfaces/interfaces';

const url = environment.url_users;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  private Get<T>(query: string) {
    query = url + query;
    return this.http.get<T>(query);
  }

  loginUser(mail: string, password: string) {
    return this.Get<User>(`api/user/login?email=${mail}&password=${password}`);
  }
}