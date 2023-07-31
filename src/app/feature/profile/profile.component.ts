import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, delay, interval, take } from 'rxjs';
import { DataService } from 'src/app/service/api/Data.service';
import { SharedDataService } from 'src/app/service/subject-test/SharedData.service';
import { InputComponent } from 'src/app/share/input/input/input.component';
import { UploadImagesComponent } from 'src/app/share/upload-images/upload-images.component';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any
  todo: any
  title = 'Angular 13 Image Upload with Preview';
  src: any | undefined;
  @Output() toggle = new EventEmitter<any>();
  visible: boolean = false;
  isServer = false
  @ViewChild(InputComponent, { static: true }) toggleComp!: InputComponent;

  @ViewChild(UploadImagesComponent, { static: true }) images!: UploadImagesComponent;

  constructor(private dataServiceApi: DataService,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    private _formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: string,

  ) {
    this.isServer = isPlatformServer(platformId)
    console.log(this.isServer);
    
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUserData();
    });
    this.getTesst()
    console.log("onInit", this.toggleComp);
    console.log(this.images.onPreviewsChange());

    var subject = new Subject();

    // subject.subscribe(observerA);

    // observable.subscribe(subject);
   
  }

  uploadImages() {
    this.src = this.images.previews[0]
    console.log(this.src);
  }

  ngAfterViewInit() {
    console.log(this.toggleComp);
    this.uploadImages()
    console.log(this.images.previews);

  }

  userId!: string;


  getUserData() {
    console.log(this.userId);
    this.dataServiceApi.getUserById(this.userId).subscribe(data => {
      console.log(data);
    });
  }

  getTesst() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
      this.todo = data;
      console.log("test", this.todo);
    });
  }

  onClickChildButton() {
    this.toggleComp.sayHello();
  }

  onToggle() {
    this.visible = !this.visible;
    // this.toggle.emit(this.visible);
    console.log("from side-menu", this.visible);
  }

  HandleClick() {
    // console.log(this.images.previews[0]);
    console.log(this.src);
  }

  onPreviewsChange(previews: string[]) {
    this.src = this.images.previews[0]
    console.log(this.images.previews[0]);
    // this.cdr.detectChanges()
  }

  sendDataToComponentB() {
    var myObservable = interval(1000).pipe(
      take(5)
    )

    const dataToSend = 'Hello from Component A';

    myObservable.subscribe({
      next: (value) => {
        this.sharedDataService.sendData(value)
        console.log(`Giá trị được phát ra: ${value}`);
      },
      error: (error) => {
        console.error('Đã xảy ra lỗi:', error);
      },
      complete: () => {
        console.log('Observable hoàn thành.');
      }
    });


    // this.sharedDataService.sendData(myObservable.subscribe({
    //   next: (value) => {
    //     console.log(`Giá trị được phát ra: ${value}`);
    //   },
    //   error: (error) => {
    //     console.error('Đã xảy ra lỗi:', error);
    //   },
    //   complete: () => {
    //     console.log('Observable hoàn thành.');
    //   }
    // }));

  }


}
