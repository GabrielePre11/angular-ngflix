import { environment } from '../../app/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesResponse } from '../models/types/response.type';
import { SeriesDetailType } from '../models/types/series-detail.type';
import { SeriesFiltersType } from '../models/types/series-filters.type';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private httpClient: HttpClient) {}

  // GET: All Series (with pagination & filters)
  getAllSeries(
    page: number,
    filters: Partial<SeriesFiltersType>
  ): Observable<SeriesResponse> {
    let httpParams = new HttpParams();

    if (filters) {
      // @@ key: first_air_date_year(or 'sort_by' or 'with_original_language' etc.)
      // @@ value: eventTarget.value: '2025' || null (it's the option selected by the user)

      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    }

    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&page=${page}`,
      {
        params: httpParams,
      }
    );
  }

  // GET: Trending Series
  getTrendingSeries(): Observable<SeriesResponse> {
    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/trending/tv/week?api_key=${this.apiKey}`
    );
  }

  // GET: Genre Series
  getGenreSeries(currentGenreId: number): Observable<SeriesResponse> {
    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${currentGenreId}`
    );
  }

  // GET: Top Series
  getTopSeries(): Observable<SeriesResponse> {
    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}`
    );
  }

  // GET: Series Detail
  getSeries(id: number): Observable<SeriesDetailType> {
    return this.httpClient.get<SeriesDetailType>(
      `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }

  // GET: Similar Series
  getSimilarSeries(id: number): Observable<SeriesResponse> {
    return this.httpClient.get<SeriesResponse>(
      `${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`
    );
  }
}
