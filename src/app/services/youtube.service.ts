import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { YoutubeResponse } from '../models/youtube.interface';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  
  private nextPageToken = '';


  constructor(private http: HttpClient) { }



  getVideos(): Observable<YoutubeResponse> {
    const params = new HttpParams().set('part', 'snippet').set('maxResults', '10').set('playlistId', environment.uploads_playlistId).set('key', environment.apiKey).set('pageToken', this.nextPageToken);
    return this.http.get<YoutubeResponse>(`${environment.base_url}/playlistItems`, { params }).pipe(
      map(resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp;
      }),
      // map(resp => resp.items.map(item => item.snippet))
    )
  }
}
