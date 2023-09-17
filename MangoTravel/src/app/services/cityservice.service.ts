import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/find';
  private apiKey = 'e1ef7dfd000b54ba0b90252d0e824b4a'; // Replace with your API key

  constructor(private http: HttpClient) {}

  getCities(query: string): Observable<any> {
    const params = {
      q: query,
      type: 'like',
      sort: 'population',
      cnt: '10', // Number of suggestions to fetch
      appid: this.apiKey,
    };

    return this.http.get(this.apiUrl, { params });
  }
}
