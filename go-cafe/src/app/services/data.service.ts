import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private platformId: Object;
  // http://127.0.0.1:8000/
  // https://full-stack-go-cafe-application-production.up.railway.app
  private apiUrl: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }

  users: any = [];

  create_account(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create_account`, userData);
  }

  email_verification(email: string, email_verification_token: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('email_verification_token', email_verification_token);

    return this.http.get<any>(`${this.apiUrl}/email_verification`, { params });
  }

  resend_email_verification(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resend_email_verification`, { email });
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
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

  deleteAccount(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete_account`);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  updateName(name: string, id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update_name/${id}`, { name });
  }

  updatePassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update_password`, data);
  }

  forgetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forget_password`, data);
  }

  resetPassword(password: string, email: string, token: string): Observable<any> {
    const body = { newPassword: password, email, token };
    return this.http.post<any>(`${this.apiUrl}/reset_password`, body);
  }

  submitFeedback(email: string, message_body: string, rating: number): Observable<any> {
    const body = { email, message_body, rating };
    return this.http.post<any>(`${this.apiUrl}/submit_feedback`, body);
  }

  showFeedbacks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_feedbacks`);
  }

  sendEmail(email: string, email_body: string): Observable<any> {
    const body = { email, email_body };
    return this.http.post<any>(`${this.apiUrl}/send_email`, body);
  }
}
