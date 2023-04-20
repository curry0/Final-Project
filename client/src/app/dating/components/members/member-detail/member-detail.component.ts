import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';
import { MessageService } from '../../messages/message.service';
import { Message } from 'src/app/shared/models/message';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
    @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
    member : Member = {} as Member;
    galleryOptions: NgxGalleryOptions[] = [];
    galleryImages: NgxGalleryImage[] = [];
    activeTab?: TabDirective;
    messages: Message[] = []

    constructor(private datingService: DatingService, private activatedRoute: ActivatedRoute, private messageService: MessageService) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe({
            next: data => this.member = data['member']
        })
        this.activatedRoute.queryParams.subscribe({
            next: params => params['tab'] && this.selectTab(params['tab'])
        })

        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview: false
            }
        ];
        this.galleryImages = this.getImages();


    }

    loadMessages() {
        if (this.member) {
            this.messageService.getMessageThread(this.member.userName).subscribe({
                next: messages => this.messages = messages
            })
        }
    }

    selectTab(heading: string) {
        if (this.memberTabs) {
            this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
        }
    }

    onTabActivated(data: TabDirective) {
        this.activeTab = data;
        if (this.activeTab.heading === 'Messages') {
            this.loadMessages();
        }
    }

    private getImages() {
        if (!this.member) return [];
        const imageUrls = [];
        for (const photo of this.member.photos) {
            imageUrls.push({
                small: photo?.url,
                medium: photo?.url,
                big: photo?.url
            })
        }
        return imageUrls;
    }

}
