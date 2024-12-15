import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupDto } from '@group-chat/shared-data/lib/group-chat-control/models/dtos/group.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class GroupFrontendService {
  private readonly apiUrl = environment.APIKeys.BACKEND_API;

  constructor(private http: HttpClient) {
    console.log(this.apiUrl);
  }

  public getUserGroups(): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>(`${this.apiUrl}/groups/getUserGroups`, {
      withCredentials: true,
    });
  }

  public createGroup(groupDto: GroupDto): Observable<GroupDto> {
    return this.http.put<GroupDto>(`${this.apiUrl}/groups/addGroup`, groupDto, {
      withCredentials: true,
    });
  }

  public leaveGroup(groupId: number): Observable<number> {
    return this.http.put<number>(
      `${this.apiUrl}/groups/leaveGroup`,
      { groupId: groupId },
      {
        withCredentials: true,
      }
    );
  }
}
