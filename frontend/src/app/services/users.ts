import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/users';
  // private readonly apiUrl = 'http://18.219.13.137:3000/users';

  createUser(user: any) {
    return this.httpClient.post(this.apiUrl, user);
  }

  getAllUsers() {
    return this.httpClient.get(this.apiUrl);
  }
}
