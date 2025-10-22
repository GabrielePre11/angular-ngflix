import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/types/movies-response.type';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private httpClient: HttpClient) {}

  // Recommended Movies API
  getRecommendedMovies(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=it-IT&page=1&region=IT`
    );
  }
}
