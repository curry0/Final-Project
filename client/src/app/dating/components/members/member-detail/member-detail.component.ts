import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
    member?: Member;
    galleryOptions: NgxGalleryOptions[] = [];
    galleryImages: NgxGalleryImage[] = [];

    constructor(private datingService: DatingService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadMember();

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


    }

    loadMember() {
        const username = this.activatedRoute.snapshot.paramMap.get('username');
        if (!username) return;
        this.datingService.getMember(username).subscribe({
            next: member => {
                this.member = member;
                this.galleryImages = this.getImages();
            },
        })
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
