import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient
  ) { }

  public index(
    bookingId: string,
    bookingPrice: string,
    wherePrice: any): Observable<any> {
    const params = new HttpParams()
    .set('bookingId', bookingId)
    .set('bookingPrice', bookingPrice)
    .set('wherePrice', wherePrice);
    return this.http.get<any>('api/bookings', { params })
    .pipe(
      map((resp: any) => resp.response)
    );
  }

  public store(data: any): Observable<any> {
    return this.http.post<any>('api/bookings/', data)
      .pipe(
        map((resp: any) => resp.response)
      );
  }

}
