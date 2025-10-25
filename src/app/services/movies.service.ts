import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/types/response.type';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private httpClient: HttpClient) {}

  // Hero Banner
  getHeroBanner(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`
    );
  }

  // Recommended Movies
  getRecommendedMovies(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }

  // Trending Now
  getTrendingMovies(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`
    );
  }
}
