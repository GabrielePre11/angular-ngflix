import { environment } from '@/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesResponse } from '../models/types/response.type';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private httpClient: HttpClient) {}

  getTrendingSeries(): Observable<SeriesResponse> {
    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/trending/tv/week?api_key=${this.apiKey}`
    );
  }

  getGenreSeries(currentGenreId: number): Observable<SeriesResponse> {
    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${currentGenreId}`
    );
  }

  getTopSeries(): Observable<SeriesResponse> {
    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}`
    );
  }
}
