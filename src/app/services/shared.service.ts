import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private apiUrl = environment.apiUrl;
  private api_key = environment.api_key;

  constructor(private http: HttpClient) { }

  searchMovies(title: string): Observable<any> {
    const url = `${this.apiUrl}?apikey=${this.api_key}&s=${title}`;
    return this.http.get(url);
  }

  getMovieDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}?apikey=${this.api_key}&i=${id}`;
    return this.http.get(url);
  }
}
