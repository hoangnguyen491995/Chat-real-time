import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

// Phương thức gọi API để đăng ký
 register(userData: any): Observable<any> {
  console.log(userData);
  
  const url = `${this.apiUrl}/auth/register`; 
  return this.http.post<any>(url, userData);
}

// Phương thức gọi API để đăng nhập
login(credentials: any): Observable<any> {
  const url = `${this.apiUrl}/auth/login`; 
  return this.http.post<any>(url, credentials);
}

// Phương thức gọi API để lấy user
getData(): Observable<any> {
  const url = `${this.apiUrl}/admin/list`;
  return this.http.get<any>(url);
}
// Phương thức gọi API để lấy user
getListHistory(id: string): Observable<any> {
  const url = `${this.apiUrl}/chats/${id}`;
  return this.http.get<any>(url);
}
// get list message 
getListMessage(id: string): Observable<any> {
  const url = `${this.apiUrl}/chats/message/${id}`;
  return this.http.get<any>(url);
}

// get user by id
getUserById(id: string): Observable<any> {
  const url = `${this.apiUrl}/user/${id}`;
  return this.http.get<any>(url);
}

addData(data: any): Observable<any> {
  const url = `${this.apiUrl}/admin/add`; 
  return this.http.post<any>(url, data);
}

// create chat 
createChat(data: any): Observable<any> {
  const url = `${this.apiUrl}/chats`; 
  return this.http.post<any>(url, data);
}


deleteData(id: number): Observable<any> {
  const url = `${this.apiUrl}/admin/${id}`; 
  return this.http.delete<any>(url);
}


updateData(data: any): Observable<any> {
  const url = `${this.apiUrl}/admin/update`;
  return this.http.put<any>(url, data);
}

getDataNoti(): Observable<any> {
  const url = `${this.apiUrl}/admin/birthday`; 
  return this.http.get<any>(url);
}


getTest(): Observable<any> {
  const url = `https://jsonplaceholder.typicode.com/comments`; 
  return this.http.get<any>(url);
}


}
