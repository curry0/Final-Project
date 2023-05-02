import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { DatingService } from 'src/app/dating/dating.service';
import { Member } from 'src/app/shared/models/member';
import { Photo } from 'src/app/shared/models/photo';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
    @Input() member: Member | undefined;
    uploader: FileUploader | undefined;
    hasBaseDropzoneOver = false;
    baseUrl = environment.apiUrl;
    user?: User;

    constructor(private accountService: AccountService, private datingService: DatingService, private toastr: ToastrService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user => {
                if (user) this.user = user;
            }
        })
    }

    ngOnInit(): void {
        this.initializeUploader();
    }

    setMainPhoto(photo: Photo) {
        this.datingService.setMainPhoto(photo.id).subscribe({
            next: () => {
                if (this.user && this.member) {
                    this.user.photoUrl = photo.url;
                    this.accountService.setCurrentUser(this.user);
                    this.toastr.success('Main photo updated successfully.');
                    this.member.photoUrl = photo.url;
                    this.member.photos.forEach(x => {
                        if (x.isMain) x.isMain = false;
                        if (x.id === photo.id) x.isMain = true;
                    })
                }
            }
        })
    }

    deletePhoto(photoId: number) {
        this.datingService.deletePhoto(photoId).subscribe({
            next: () => {
                if (this.member) {
                    this.member.photos = this.member.photos.filter(x => x.id !== photoId);
                    this.toastr.success('Photo deleted successfully.');
                }
            }
        })
    }

    fileOverBase(e: any) {
        this.hasBaseDropzoneOver = e;
    }

    initializeUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'users/add-photo',
            authToken: 'Bearer ' + this.user?.token,
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: true,
            maxFileSize: 10 * 1024 * 1024,
        });

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        }

        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                const photo = JSON.parse(response);
                this.member?.photos.push(photo);
                this.toastr.success('Photo uploaded successfully. Please be patient until the admin approves it.');
                if (photo.isMain && this.user && this.member) {
                    this.user.photoUrl = photo.url;
                    this.member.photoUrl = photo.url;
                    this.accountService.setCurrentUser(this.user);
                }
            }
        }

    }

}
