// Angular imports
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

// Services imports
import { ApiService } from '@services/api.service';
import { AuthService} from '@services/auth.service';

// Auth imports
import { JwtHelperService } from "@auth0/angular-jwt";

// Constants imports
import { Constants } from '@configs/constants';
import { Appointment } from '@models/Appointment';
import { Timeslot } from '@models/Timeslot';
import { ParamsObj} from '@models/Http';

// Material imports
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  timeslots: Timeslot[]
  paramsList: ParamsObj[]
  appointment: Appointment
  currentDate: any
  selectedDate: any
  tableData: any
  userID: string
  name: string

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['date', 'timeslot', 'delete'];

  constructor(private api: ApiService, private auth: AuthService, private jwtSvc: JwtHelperService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.appointment = new Appointment()
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    this.selectedDate = this.currentDate
    this.getTimeSlots(this.currentDate)   
    this.setProfile(this.auth.getLoginToken()) 
    this.getAppointments()
  }

  /**
   * API call to get available timeslots
   * @param date 
   */
  getTimeSlots(date: string) {
    this.appointment.appDate = date
    this.paramsList = [{key: 'appdate', value: date}]
    this.api.get(Constants.TIMESLOTS_ENDPOINT, this.paramsList).subscribe(
      res => {
        this.timeslots = res;
      },
      err => console.log(err)
    )
  }

  /**
   * API call to get booked appointments
   * @param date 
   */
  getAppointments() {
    this.paramsList = [{key: 'userID', value: this.userID}]
    this.api.get(Constants.APPOINTMENTS_ENDPOINT, this.paramsList).subscribe(
      res => {
        this.tableData = res
      },
      err => console.log(err)
    )
  }

  /**
   * API call to book appointment
   * @param date 
   */
  bookAppointment() {
    this.api.post(Constants.APPOINTMENTS_ENDPOINT, this.appointment).subscribe(
      res => {
        if (res == 1) {
          this.openSnackBar('Booking appointment successfully made!', 'success')
          this.getTimeSlots(this.selectedDate)
          this.getAppointments()
        }
        else {
          this.openSnackBar('Booking already made on that day!', 'error')
        }
      },
      err => console.log(err)
    )
  }

  /**
   * API call to cancel appointment
   */
  cancelAppointment(appointment: any) {
    this.api.post(Constants.UNAVAILABLE_TIMESLOTS_ENDPOINT, appointment).subscribe(
      res => {
        console.log(res)
        if (res == 1) {
          this.openSnackBar('Appointment successfully cancelled!', 'success')
          this.getTimeSlots(this.selectedDate)
          this.getAppointments()
        }
        else {
          this.openSnackBar('Appointment unable to cancel! Please try again', 'error')
        }
      },
      err => console.log(err)
    )
  }

  setProfile(token) {
    this.name = this.jwtSvc.decodeToken(token).given_name + " " + this.jwtSvc.decodeToken(token).family_name
    this.userID = this.jwtSvc.decodeToken(token).sub
  }

  selectTimeslot(value:number) {
    this.appointment.userID = this.userID
    this.appointment.timeslotID = value
  }

  /**
   * Shows toasts
   * @param msg 
   * @param type 
   */
  openSnackBar(msg: string, type: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      panelClass: [type],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /**
   * Check for input change in datepicker
   * @param type 
   * @param event 
   */
  getDateFromPicker(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = (this.formatDate(event.value))
    return this.getTimeSlots(this.formatDate(event.value))
  }

  /**
   * Format Date in YYYY-MM-DD
   * @param date 
   */
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) 
        month = '0' + month
    if (day.length < 2) 
        day = '0' + day

    return [year, month, day].join('-')
  }

}
