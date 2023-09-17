import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiClientService } from './http-client-service.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpApiClientService) {}
  chatAI(message): Observable<any> {
    return this.httpClient.post<any>(`chatAI`, { message: message }, false);
  }
}
