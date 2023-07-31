import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime, interval, switchMap, tap } from 'rxjs';
import { DataService } from 'src/app/service/api/Data.service';
import { SharedDataService } from 'src/app/service/subject-test/SharedData.service';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-listUser',
  templateUrl: './listUser.component.html',
  styleUrls: ['./listUser.component.css'],
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class ListUserComponent implements OnInit  {
  users: any
  userCurrent: any
  user: any
  filteredUsers: any
  numberTest!: number;
  todo: any
  searchForm: FormGroup;
  queryInput: FormControl;
  posts: any

  receivedData: any;
  private subscription!: Subscription;
  
  constructor(private dataApi: DataService,
     private router: Router,
      private cdr: ChangeDetectorRef, 
      private http: HttpClient,
     private sharedDataService: SharedDataService,
     @Inject(ProfileComponent) private profileComponent: ProfileComponent
     ) {
    this.subscription = this.sharedDataService.getData().subscribe((data) => {
      console.log(data);
      
      this.receivedData = data;
    });

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.userCurrent = JSON.parse(currentUser)
    }

    this.queryInput = new FormControl('');
    this.searchForm = new FormGroup({
      searchTerm: this.queryInput
    });

  }

  ngOnInit() {
    // this.getUser()
    this.profileComponent.src
  }

  onSubmit() {
    const searchTermValue = this.searchForm?.get('searchTerm')?.value; // Sử dụng safe navigation operator (?.)
    console.log('Search term value:', searchTermValue);
    // Các xử lý khác
  }

  // HandleSearch() {
  //   const searchTermValue = this.searchForm?.get('searchTerm')?.value; // Sử dụng safe navigation operator (?.)
  //   console.log(searchTermValue);
  //   console.log("grwg");
  // }


  onSearchChange() {
    // const searchTermValue = this.searchForm?.get('searchTerm')?.value;
    this.queryInput.valueChanges.pipe(debounceTime(500)).subscribe((query) => {
      // this.apiService.filterData(query).subscribe((data) => {
      this.dataApi.getTest().subscribe({
        next: (response) => {
          console.log('lấy post successful', response);
          this.users = response

          this.filteredUsers = this.users.filter((post: {
            name: string; postId: number;
          }) =>post.name.includes(query))
          this.cdr.detectChanges()
        },
        error: (error) => {
          console.error('delete user error', error);
        }
      });

    });
  }

  getUser() {
    this.dataApi.getData().subscribe({
      next: (response) => {
        console.log('lấy user successful', response);
        this.users = response
        this.filteredUsers = this.users.filter((user: { id: any; }) => user.id !== this.userCurrent.id);
      },
      error: (error) => {
        console.error('delete user error', error);
      }
    });
  }

  handeCreateChat(idFrient: number) {
    const requestData = {
      userId: this.userCurrent.id,
      friendId: idFrient
    };
    console.log(requestData);
    this.dataApi.createChat(requestData).subscribe(
      (response) => {
        console.log('API response:', response);
        window.location.href = 'home';
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  handleInfoFriend(idFrient: number) {
    this.router.navigate(['user/profile', idFrient]);
    window.location.href = `user/profile/${idFrient}`;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  
}
