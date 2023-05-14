import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { ShopService } from '../../shop.service';
import { Brand } from 'src/app/shared/models/brand';
import { Type } from 'src/app/shared/models/type';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

    productsForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        pictureUrl: [null, Validators.required],
        productBrandId: ['', Validators.required],
        productTypeId: ['', Validators.required],
    })
    brands: Brand[] = [];
    types: Type[] = [];

    constructor(private fb: FormBuilder, private shopService: ShopService, private router: Router, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.getBrands();
        this.getTypes();
    }

    onPictureSelected(event: any) {
        const file = event?.target?.files[0];
        if (file) {
            this.productsForm.patchValue({
                pictureUrl: file,
            });
        }
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('name', this.productsForm.get('name')?.value ?? '');
        formData.append('description', this.productsForm.get('description')?.value ?? '');
        formData.append('price', this.productsForm.get('price')?.value ?? '');
        formData.append('pictureUrl', this.productsForm.get('pictureUrl')?.value ?? '');
        formData.append('productBrandId', this.productsForm.get('productBrandId')?.value ?? '');
        formData.append('productTypeId', this.productsForm.get('productTypeId')?.value ?? '');

        this.shopService.createProduct(formData).subscribe({
            next: (res) => {
                this.toastr.success('Product listed successfully');
                this.router.navigateByUrl('/shop');
            },
            error: error => console.log(error)
        })
    }

    getBrands() {
        this.shopService.getBrands().subscribe({
            next: response => this.brands = response,
            error: error => console.log(error)
        })
    }

    getTypes() {
        this.shopService.getTypes().subscribe({
            next: response => this.types = response,
            error: error => console.log(error)
        })
    }
}
