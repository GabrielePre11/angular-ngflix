import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.generated';
import { SearchResultType } from '../models/types/search-result.type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private httpClient: HttpClient) {}

  searchMoviesAndSeries(userQuery: string): Observable<SearchResultType[]> {
    return (
      this.httpClient
        .get<{ results: SearchResultType[] }>(
          `${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${userQuery}`
        )
        // It's necessary to filter the results to only include movies and series, because "/search/multi"
        // also returns results like people, companies, etc. whom don't have "genre_ids" for example.
        .pipe(
          map((data) =>
            data.results.filter(
              (item) => item.media_type === 'movie' || item.media_type === 'tv'
            )
          )
        )
    );
  }
}
