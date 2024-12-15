import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageDto } from '@group-chat/shared-data/lib/group-chat-control/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatFrontendService {
  private readonly apiUrl = environment.APIKeys.BACKEND_API;

  constructor(private http: HttpClient) {}

  public addMessage(message: MessageDto): Observable<MessageDto> {
    return this.http.post<MessageDto>(
      `${this.apiUrl}/chat/addMessage`,
      message,
      {
        withCredentials: true,
      }
    );
  }

  public getGroupMessages(
    groupId: number
  ): Observable<{ senderUsername: string; messages: MessageDto[] }> {
    return this.http.get<{ senderUsername: string; messages: MessageDto[] }>(
      `${this.apiUrl}/chat/getGroupMessages/${groupId}`,
      {
        withCredentials: true,
      }
    );
  }

  public setOnlineUser(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/chat/setOnlineUser`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
