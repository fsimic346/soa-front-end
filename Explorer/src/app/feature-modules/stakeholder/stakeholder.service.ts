import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Person } from './model/person.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StakeholderService {
  constructor(private http: HttpClient) {}

  getPeople(): Observable<PagedResults<Person>> {
    return this.http.get<PagedResults<Person>>(environment.apiHost + 'people');
  }
  getByUserId(userId: number): Observable<Person> {
    return this.http.get<Person>(
      environment.apiHost + 'people/person/' + userId
    );
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(
      environment.apiHost + 'people/update/',
      person
    );
  }
}