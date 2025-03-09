import { Contact, ContactForCreate, ContactForUpdate, ContactParameters, MetaData } from './../models/contact.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/contacts`;
  public metaData!: MetaData;

  constructor(private http: HttpClient) { }

  getContacts(parameters: ContactParameters): Observable<Contact[]>{
    let params = new HttpParams();
    if(parameters.pageNumber)
      params = params.set("PageNumber", parameters.pageNumber);
    if(parameters.pageSize)
      params = params.set("PageSize", parameters.pageSize);
    if(parameters.searchTerm)
      params = params.set("SearchTerm", parameters.searchTerm);

    return this.http.get<Contact[]>(this.apiUrl, { 
      params: params,
      observe: 'response',
      transferCache: {includeHeaders: ['X-Pagination']}
    }).pipe(
      tap(response => {
        console.log(response);
        const paginationHeader = response.headers.get('X-Pagination');
        console.log(paginationHeader);
        if (paginationHeader) {
          this.metaData = JSON.parse(paginationHeader);
        }
      }),
      map(response => response.body || [])
    );
  }

  getContact(id: string): Observable<Contact>{
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  createContact(contact: ContactForCreate): Observable<Contact>{
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id:string, contact:ContactForUpdate): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
