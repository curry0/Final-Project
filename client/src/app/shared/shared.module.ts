import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
    declarations: [
        PagingHeaderComponent,
        PagerComponent,
        OrderTotalsComponent,
        TextInputComponent,
        StepperComponent,
        BasketSummaryComponent,
    ],
    imports: [
        CommonModule,
        PaginationModule.forRoot(),
        CarouselModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        CdkStepperModule,
        RouterModule,
        TabsModule.forRoot(),
        NgxGalleryModule,
        FileUploadModule,
        BsDatepickerModule.forRoot(),
        ButtonsModule.forRoot(),
        TimeagoModule.forRoot(),
    ],
    exports: [
        PaginationModule,
        PagingHeaderComponent,
        PagerComponent,
        CarouselModule,
        OrderTotalsComponent,
        ReactiveFormsModule,
        FormsModule,
        BsDropdownModule,
        TextInputComponent,
        StepperComponent,
        CdkStepperModule,
        BasketSummaryComponent,
        TabsModule,
        NgxGalleryModule,
        FileUploadModule,
        BsDatepickerModule,
        ButtonsModule,
        TimeagoModule,
    ]
})
export class SharedModule { }
