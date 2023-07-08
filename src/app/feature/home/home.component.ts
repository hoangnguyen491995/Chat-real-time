import { DatePipe, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, combineLatest, defer, delay, forkJoin, from, fromEvent, interval, map, mapTo, merge, of, take, throwError, timer } from 'rxjs';
import { PopoverService } from 'src/app/service/popover/popover.service';
import { DataService } from 'src/app/service/api/Data.service';


import { AppState, appSlice, selectValue } from 'src/redux/app.slice';
import { DataService1 } from 'src/app/service/data/Data.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  currentDate: Date;
  user: any
  socket: any;
  usersNoti: any[] = [];
  number = this.usersNoti.length;
  currentUser: any;
  message: string = '';
  listSendMessage: any
  users: any[] | undefined;
  chatId!: number
  Friend!: string
  numberTest! : number ; 
  listSendMessageTest = [
    { userId: 1, content: "", position: "" },
  ]

  constructor( private cdr: ChangeDetectorRef , private dataServiceApi: DataService, private dataService: DataService, public popoverService: PopoverService, private store: Store<{ app: AppState }>) {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }

    this.currentDate = new Date();

    this.socket = io("http://localhost:3000", {
      transports: ["websocket"]
    })

    this.socket.on("connect", () => {
      console.log("Connect socket server successfully");
    })
    this.socket.on("disconnect", () => {
      console.log("Disconnect socket server successfully");
    })
    this.socket.on("connect_error", (error: any) => {
      console.log("Having an error when connect socket server with err: " + error.getData);
    })
  }
  title = "Home component"
  ngOnInit() {
    this.loadData()
    this.receiveMessage()
    this.getListHistory()

    const observable = interval(1000); // Tạo một Observable phát ra giá trị sau mỗi 1000ms (1 giây)

    const subscription = observable.subscribe((value) => {
      this.numberTest = value
      console.log(value); // Xử lý giá trị phát ra
      this.cdr.markForCheck();
    });
  }

  /// xử lý real time
  getMessageClass(position: string): string {
    return 'message--' + position;
  }

  getListHistory() {
    // Make HTTP request to login API
    this.dataServiceApi.getListHistory(this.user.id).subscribe({
      next: (response: any[]) => {
        console.log('lấy history successful', response);
        this.users = response
        this.cdr.markForCheck();
      },
      error: () => {
        // Handle the error response here
        console.error('delete user error');
      }
    });
  
  }

  receiveMessage() {
    this.socket.on("message", (message1: any) => {
      if (message1.userId == this.user.id) {
        return
      }
      const customMessage = { ...message1, position: 'left' }
      this.listSendMessage.push(customMessage);
    })
  }

  sendMessage() {
    console.log("send message: " + this.message);
    const data = {
      userId: this.user.id,
      content: this.message,
      chatId: this.chatId,
    }
    this.socket.emit("message", data)
    const customMessage = { ...data, position: 'right' }
    this.listSendMessage.push(customMessage);
    this.message = ""
  }

  loadData(): void {
    const data = this.dataService.getData();
    console.log(data);
  }

  onMessageClick(chatId: number, Friend: string) {
    console.log(chatId);
    this.chatId = chatId
    this.popoverService.setPopoverVisibility(true);
    this.getListMessage(chatId)
    this.Friend = Friend
  }

  onMessageClickClose() {
    this.popoverService.setPopoverVisibility(false);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      console.log(event.keyCode);

      event.preventDefault();
      // Gọi phương thức xử lý logic khi nhấn Enter trong form ở đây
    }
  }

  getListMessage(id: any) {
    // Make HTTP request to login API
    this.dataServiceApi.getListMessage(id).subscribe({
      next: (response: any[]) => {
        console.log('get message successful', response);
        const customResponse = response.map((item) => {
          return {
            ...item,
            position: item.userId === this.user.id ? 'right' : 'left'
          }

        })
        this.listSendMessage = [...customResponse]
        console.log(this.listSendMessage);

      },
      error: () => {
        // Handle the error response here
        console.error('delete user error');
      }
    });
  }
  Hand() {

  }
}

