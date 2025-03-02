import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CounterMapper } from '../mappers/country.mapper';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    const q = query.toLowerCase().trim();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${q}`).pipe(
      map(CounterMapper.mapRestCountriesArrayToCountryArray),
      catchError((error) => {
        return throwError(() => new Error(`No exist results for ${query}`));
      })
    );
  }

  searchByCountry(query: string) {
    const q = query.toLowerCase().trim();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${q}`).pipe(
      map(CounterMapper.mapRestCountriesArrayToCountryArray),
      catchError((error) => {
        return throwError(() => new Error(`No exist results for ${query}`));
      })
    );
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    const q = code.toLowerCase().trim();
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${q}`).pipe(
      map(CounterMapper.mapRestCountriesArrayToCountryArray),
      map((countries) => countries.at(0)),
      catchError((error) => {
        return throwError(() => new Error(`No exist results for ${code}`));
      })
    );
  }
}
