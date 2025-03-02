import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-country.interface';

export class CounterMapper {
  static mapRestCountryToCountry(country: RESTCountry): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.translations['spa'].common ?? 'No Spanish Name',
      capital: country.capital.join(', '),
      population: country.population,
      region: country.region,
      subregion: country.subregion,
    };
  }

  static mapRestCountriesArrayToCountryArray(
    countries: RESTCountry[]
  ): Country[] {
    return countries.map(CounterMapper.mapRestCountryToCountry);
  }
}
