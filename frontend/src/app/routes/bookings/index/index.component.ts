import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/bookings.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  form: FormGroup
  bookingId: any = '';
  bookingPrice: any = '';
  wherePrice: any = '';

  items: any;
  columnsToDisplay = ['bookingId', 'client', 'creationDate', 'address', 'price'];

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService
  ) {
    this.initForm();
    this.index();
   }

  ngOnInit(): void {
  }

  initForm(){
    this.form = this.formBuilder.group({
      bookingId: '',
      bookingPrice: '',
      wherePrice: ''
    });

  }

  index(){
    this.bookingService.index(
      this.bookingId,
      this.bookingPrice,
      this.wherePrice
    )
    .subscribe(
      (response: any) => {
        this.items = response;
      }
    )
  }

  cleanFilters(){
    this.bookingId = '';
    this.bookingPrice = '';
    this.wherePrice = '';

    this.form.get('bookingId').patchValue('');
    this.form.get('bookingPrice').patchValue('');
    this.form.get('wherePrice').patchValue('');

    this.index();
  }

  submit(){
    console.log('Se envió');
    this.bookingId = this.form.get('bookingId').value;
    this.bookingPrice = this.form.get('bookingPrice').value;
    this.wherePrice = this.form.get('wherePrice').value;
    this.index();
  }

}
