import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private platformId: Object;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }

  users: any = [];

  create_account(userData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/create_account', userData);
  }

  email_verification(email: string, email_verification_token: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('email_verification_token', email_verification_token);

    return this.http.get<any>('http://127.0.0.1:8000/api/email_verification', { params });
  }

  resend_email_verification(email: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/resend_email_verification', { email });
  }

  login(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', data);
  }

  storeToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
    }
  }

  deleteAccount(){
    return this.http.delete<any>('http://127.0.0.1:8000/api/delete_account');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/user');
  }

  updateName(name: string, id: string){
    return this.http.post<any>(`http://127.0.0.1:8000/api/update_name/${id}`, {name: name});
  }

  updatePassword(data: any){
    return this.http.post<any>(`http://127.0.0.1:8000/api/update_password`, data);
  }

  forgetPassword(data: any){
    return this.http.post<any>(`http://127.0.0.1:8000/api/forget_password`, data)
  }

  resetPassword(password: string, email: string, token: string){
    const body = {
      newPassword: password,
      email: email,
      token: token,
    };
    return this.http.post<any>(`http://127.0.0.1:8000/api/reset_password`, body)
  }

  submitFeedback(email: string, message_body: string, rating: number){
    const body = {
      email: email,
      message_body: message_body,
      rating: rating,
    };
    return this.http.post<any>(`http://127.0.0.1:8000/api/submit_feedback`, body);
  }

  showFeedbacks(){
    return this.http.get<any>(`http://127.0.0.1:8000/api/get_feedbacks`);
  }

  sendEmail(email: string, email_body:string){
    const body = {
      email: email,
      email_body: email_body
    }
    return this.http.post<any>(`http://127.0.0.1:8000/api/send_email`, body);
  }
}
