import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '@responsible/models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private endpoint = '/contact';

  constructor(private httpClient: HttpClient) { }

  /**
   * Save array of Contacts
   *
   * @param contacts: Array<Contact>
   * @returns Observable<Contact>
   */
  saveAll(contacts: Array<Contact>): Observable<Array<Contact>> {
    return this.httpClient.post<Array<Contact>>(`${this.endpoint}`, contacts);
  }
}
