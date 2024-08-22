import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,MatPaginatorModule,
     MatCardModule,CommonModule,
     HttpClientModule,FontAwesomeModule],
  templateUrl: './home.component.html',
  template: `<fa-icon [icon]="faUser"></fa-icon>`,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faUser = fas['faUser'];
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
