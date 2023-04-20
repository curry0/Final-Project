import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeaders } from 'src/app/shared/functions/paginationHelper';
import { Message } from 'src/app/shared/models/message';
import { MessageParams } from 'src/app/shared/models/messageParams';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getMessages(messageParams: MessageParams) {
        let params = getPaginationHeaders(messageParams.pageNumber, messageParams.pageSize);
        params = params.append('Container', messageParams.container);
        return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http);
    }

    getMessageThread(username: string) {
        return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
    }

    sendMessage(username: string, content: string) {
        return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername: username, content});
    }

    deleteMessage(id: number) {
        return this.http.delete(this.baseUrl + 'messages/' + id);
    }
}

