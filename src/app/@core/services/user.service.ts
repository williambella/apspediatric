import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Login } from '@core/models/login';
import { User } from '@core/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint = '/auth';

  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  /**
   * Login
   *
   * @param login: Login
   * @returns Observable<User>
   */
  login(login: Login): Observable<User> {
    return this.httpClient.post<User>(this.endpoint, login);
  }

  /**
   * set User to Storage
   *
   * @param user: User
   * @returns void
   */
  setUSer(user: User) {
    this.storageService.set('user', user);
  }

  /**
   * get User from Storage
   *
   * @returns User
   */
  getUser(): User {
    return this.storageService.get('user') as User;
  }

  /**
   * Redirect to Login
   *
   */
  gotoLogin(): Promise<boolean> {
    return this.router.navigate(['/', 'auth', 'login']);
  }
}
