import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  userUrl = 'http://localhost:3000/productList/';

  // for get api of product data
  getProduct() {
    return this.http.get<any>(this.userUrl);
  }

  // for set api path of add product data
  postProduct(data: any) {
    return this.http.post<any>(this.userUrl, data);
  }

  // for put api of product data
  putProduct(data: any, id: number) {
    return this.http.put<any>(this.userUrl + id, data);
  }

  // for put api of product data
  deleteProduct(id: number) {
    return this.http.delete<any>(this.userUrl + id);
  }


}
