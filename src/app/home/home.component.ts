import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,MatPaginatorModule, MatCardModule,CommonModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
@Input() users:User[] = [];
  totalUsers = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(page = 1) {
    this.userService.getUsers(page).subscribe(data => {
      this.users = data.data;
      this.totalUsers = data.total;
    });
  }

  onPageChange(event: any) {
    this.loadUsers(event.pageIndex + 1);
  }

  viewUser(userId: number) {
    this.router.navigate([`/users/${userId}`]);
  }
}
