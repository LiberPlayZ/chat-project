import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MessageDto } from '@group-chat/shared-data/lib/group-chat-control/models/dtos/index';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ChatFrontendService } from 'apps/group-chat/src/app/api-endpoint/chat-frontend.service';
import { SocketIoService } from 'apps/group-chat/src/app/socket-io-endpoint/socket.service';
export interface ChatStateStore {
  messages: MessageDto[];
  senderUserName: string;
  loading: boolean
}

@Injectable()
export class ChatComponentStore extends ComponentStore<ChatStateStore> {
  constructor(
    private chatService: ChatFrontendService,
    private socketService: SocketIoService
  ) {
    super({
      messages: [],
      senderUserName: '',
      loading: false
    });
  }
  // selectors for all attributes .

  private readonly messages$ = this.select((state) => state.messages);
  private readonly senderUsername$ = this.select((state) => state.senderUserName);
  private readonly loading$ = this.select((state) => state.loading);

  public vm$ = this.select({
    messages: this.messages$,
    senderUsername: this.senderUsername$,
    loading: this.loading$
  });


  // updaters for all attributes .

  readonly setMessages = this.updater((state, messages: MessageDto[]) => ({
    ...state,
    messages: messages || [],
  }));

  readonly setLoading = this.updater((state,loading:boolean) => ({
    ...state,
    loading: loading,
  }));

  readonly addMessage = this.updater((state, newMessage: MessageDto) => ({
    ...state,
    messages: [...state.messages, newMessage],
  }));

  // effects

  loadMessages = this.effect((groupId$: Observable<number>) =>

    groupId$.pipe(
      tap(() => this.setLoading(true)),
      switchMap((groupId) =>

        this.chatService.getGroupMessages(groupId).pipe(
          tap({
            next: (data: { senderUsername: string; messages: MessageDto[] }) =>
              this.patchState({
                messages: data.messages,
                senderUserName: data.senderUsername,
                loading: false
              }),
            error: () => this.patchState({ messages: [] }),
          })
        )
      )
    )
  );

  updateMessage = this.effect((message$: Observable<MessageDto>) => {
    return message$.pipe(
      switchMap((message) => {
        return this.chatService.addMessage(message).pipe(
          tap((updateMessage) => {
            this.addMessage(updateMessage);
            this.socketService.sendMessage(updateMessage);
          })
        );
      })
    );
  });

  onTyping = this.effect((groupId: Observable<number>) =>
    groupId.pipe(
      withLatestFrom(this.senderUsername$),
      switchMap(([groupId, senderUsername]) => {


        this.socketService.onTypingEvent(senderUsername, groupId);
        return [];
      })
    )
  );
}
