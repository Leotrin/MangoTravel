import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiClientService } from './http-client-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpApiClientService) {}
  getUser(device_id): Observable<any> {
    return this.httpClient.post<any>('getUser', device_id, true);
  }
  createUser(payLoad: any): Observable<any> {
    return this.httpClient.post<any>('createUser', payLoad, true);
  }
}
