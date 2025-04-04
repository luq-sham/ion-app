import { Inject, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  apiurl = "http://127.0.0.1:8000";
  constructor(
    private http: HttpClient,
  ) { }

  getBooks() {
    const url = this.apiurl + '/api/get_books_details';
    return this.http.get(url);
  }
  postAddBook(data:any) {
    const url = this.apiurl + '/api/post_add_book';
    return this.http.post(url, data);
  }
}
