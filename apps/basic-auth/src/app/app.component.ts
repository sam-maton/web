import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, ApiResponse, User } from './services/api.service';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'basic-auth';
  apiData: ApiResponse | null = null;
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.error = null;

    this.apiService.getData().subscribe({
      next: (data) => {
        this.apiData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch data from API';
        this.loading = false;
        console.error('API Error:', err);
      },
    });
  }

  fetchUsers() {
    this.loading = true;
    this.error = null;

    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch users from database';
        this.loading = false;
        console.error('Database Error:', err);
      },
    });
  }
}
