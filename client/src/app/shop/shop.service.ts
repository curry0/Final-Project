import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
import { PaginatedResult } from '../shared/models/pagination';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    baseUrl = 'http://localhost:5000/api/'
    paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>;

    constructor(private http: HttpClient) { }

    getProducts(shopParams: ShopParams, page?:number, itemsPerPage?: number) {
        let params = new HttpParams();

        if (shopParams.brandId > 0) params = params.append('brandId', shopParams.brandId);
        if (shopParams.typeId > 0) params = params.append('typeId', shopParams.typeId);
        if (shopParams.pageNumber) params = params.append('pageNumber', shopParams.pageNumber)
        if (shopParams.pageSize) params = params.append('pageSize', shopParams.pageSize)
        params = params.append('sort', shopParams.sort);

        return this.http.get<Product[]>(this.baseUrl + 'products', { observe: 'response', params }).pipe(
            map(response => {
                if (response.body) this.paginatedResult.result = response.body
                const pagination = response.headers.get('Pagination');
                if (pagination) {
                    this.paginatedResult.pagination = JSON.parse(pagination);
                }
                return this.paginatedResult;
            })
        )
    }

    getBrands() {
        return this.http.get<Brand[]>(this.baseUrl + 'products/brands')
    }

    getTypes() {
        return this.http.get<Type[]>(this.baseUrl + 'products/types')
    }
}
