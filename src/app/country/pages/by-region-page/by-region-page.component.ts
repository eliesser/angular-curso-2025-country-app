import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, NgClass],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      return this.countryService.searchByRegion(request.region);
    },
  });
}
