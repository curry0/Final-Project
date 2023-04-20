import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/message';
import { Pagination } from 'src/app/shared/models/pagination';
import { MessageService } from './message.service';
import { MessageParams } from 'src/app/shared/models/messageParams';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
    messages?: Message[];
    pagination?: Pagination;
    messageParams = new MessageParams();
    loading = false;

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        this.loadMessages();
    }

    loadMessages() {
        this.loading = true;
        this.messageService.getMessages(this.messageParams).subscribe({
            next: response => {
                this.messages = response.result;
                this.pagination = response.pagination;
                this.loading = false;
            }
        })
    }

    deleteMessage(id: number) {
        this.messageService.deleteMessage(id).subscribe({
            next: () => this.messages?.splice(this.messages.findIndex(x => x.id === id), 1)
        })
    }

    pageChanged(event: any) {
        if (this.messageParams.pageNumber !== event.page) {
            this.messageParams.pageNumber = event.page;
            this.loadMessages();
        }
    }

}


