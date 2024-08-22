import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule,HttpClientModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})



export class UserDetailComponent {
  user:User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar:''
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe(data => {
      this.user = data.data;
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
