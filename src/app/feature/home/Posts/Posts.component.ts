import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { query } from 'express';
import { concat, debounceTime, exhaustMap, interval, map, mapTo, startWith, switchMap, take, tap, timer } from 'rxjs';
import { DataService } from 'src/app/service/api/Data.service';





export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-Posts',
  templateUrl: './Posts.component.html',
  styleUrls: ['./Posts.component.css']
})
export class PostsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  searchForm: FormGroup;
  queryInput: FormControl;
  posts: any;
  users: any;
  filteredUsers: any;

  currentQuery!: string;
  constructor(private cdr: ChangeDetectorRef, private dataApi: DataService) {
    this.queryInput = new FormControl('');
    this.searchForm = new FormGroup({
      searchTerm: this.queryInput
    });
  }

  ngOnInit() {
    this.onSearchChange()
    concat(
      timer(1000).pipe(mapTo('first timer'), tap()), // emit "first timer" sau 1 giây
      timer(5000).pipe(mapTo('second timer'), tap()), // emit "second timer" sau 5 giây
      timer(2000).pipe(mapTo('last timer'), tap())
    )
      .pipe(
        exhaustMap((c) =>
          interval(1000).pipe(
            map((v) => `${c}: ${v}`),
            take(4)
          )
        ) // interval(1000) này sẽ mất 4 giây để complete
      )
      .subscribe(console.log);

  }

  onSearchChange() {
    this.queryInput.valueChanges.pipe(
      debounceTime(500),
      startWith(""),
      tap((query) => {
        console.log('Query value:', query);
        this.currentQuery = query
      }),
      switchMap((query) =>
        this.dataApi.getTest()
      )
    ).subscribe({
      next: (response) => {
        this.posts = response.filter((post: {
          email: string; postId: number;
        }) => post.email.includes(this.currentQuery))
        console.log('lấy post successful', this.posts);
      },
      error: (error) => {
        console.error('delete user error', error);
      }
    });

  }
}
