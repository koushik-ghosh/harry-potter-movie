import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Movie } from './store/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = '/movies';
  constructor(private http: HttpClient) { }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`movies/${id}`);
  }
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/movies');
  }
}
