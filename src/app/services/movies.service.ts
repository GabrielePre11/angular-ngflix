import { Injectable } from '@angular/core';
import { environment } from '@/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/types/response.type';
import { MovieDetailType } from '../models/types/movie-detail.type';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private httpClient: HttpClient) {}

  // GET: Hero Banner
  getHeroBanner(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`
    );
  }

  // GET: Recommended Movies
  getRecommendedMovies(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }

  // GET: rending Now
  getTrendingMovies(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`
    );
  }

  // GET: Top Movies
  getTopMovies(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`
    );
  }

  // GET: Movie Detail Page
  getMovie(id: number): Observable<MovieDetailType> {
    return this.httpClient.get<MovieDetailType>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  // GET: Similar Movie
  getSimilarMovies(id: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(
      `${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`
    );
  }
}
