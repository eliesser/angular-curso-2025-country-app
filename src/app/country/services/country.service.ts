import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CounterMapper } from '../mappers/country.mapper';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Country, Region } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const q = query.toLowerCase().trim();

    if (this.queryCacheByCapital.has(q))
      return of(this.queryCacheByCapital.get(q)!);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${q}`).pipe(
      map(CounterMapper.mapRestCountriesArrayToCountryArray),
      tap((countries) => this.queryCacheByCapital.set(q, countries)),
      catchError((error) => {
        return throwError(() => new Error(`No exist results for ${query}`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const q = query.toLowerCase().trim();

    if (this.queryCacheByCountry.has(q))
      return of(this.queryCacheByCountry.get(q)!);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${q}`).pipe(
      map(CounterMapper.mapRestCountriesArrayToCountryArray),
      tap((countries) => this.queryCacheByCountry.set(q, countries)),
      catchError((error) => {
        return throwError(() => new Error(`No exist results for ${query}`));
      })
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryCacheByRegion.has(region))
      return of(this.queryCacheByRegion.get(region)!);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(CounterMapper.mapRestCountriesArrayToCountryArray),
      tap((countries) => this.queryCacheByRegion.set(region, countries)),
      catchError((error) => {
        return throwError(() => new Error(`No exist results for ${region}`));
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
