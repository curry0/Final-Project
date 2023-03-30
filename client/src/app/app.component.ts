import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GymApp';
  users: any;

  constructor(private http: HttpClient) {}



  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: response => this.users = response,
      error: err => console.log(err),
      complete: () => console.log('completed')
    })
  }

}
