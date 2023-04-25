import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';
import { MessageService } from '../../messages/message.service';
import { Message } from 'src/app/shared/models/message';
import { PresenceService } from 'src/app/core/services/presence.service';
import { AccountService } from 'src/app/account/account.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
    @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
    member: Member = {} as Member;
    galleryOptions: NgxGalleryOptions[] = [];
    galleryImages: NgxGalleryImage[] = [];
    activeTab?: TabDirective;
    messages: Message[] = []
    user?: User;

    constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private messageService: MessageService,
        public presenceService: PresenceService, private router: Router, private datingService: DatingService, private toastr: ToastrService) {
        this.accountService.currentUser$.subscribe({
            next: user => {
                if (user) this.user = user;
            }
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

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

    ngOnDestroy(): void {
        this.messageService.stopHubConnection();
        // remove query params
        this.router.navigate([], {
            queryParams: {
                tab: null
            },
            queryParamsHandling: 'merge',
            replaceUrl: true
        })
    }


    loadMessages() {
        if (this.member) {
            this.messageService.getMessageThread(this.member.email).subscribe({
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
        if (this.activeTab.heading === 'Messages' && this.user) {
            this.messageService.createHubConnection(this.user, this.member.email);
        } else {
            this.messageService.stopHubConnection();
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

    addLike(member: Member) {
        this.datingService.addLike(member.email).subscribe({
            next: () => this.toastr.success('You have liked ' + member.displayName)
        })
    }

}
