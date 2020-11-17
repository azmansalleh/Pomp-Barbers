// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services imports
import { ApiService } from '@services/api.service';

// Constants imports
import { Constants } from '@configs/constants';
import { Timeslot } from '@models/Timeslot';
import { ParamsObj} from '@models/Http';

// Material imports
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  timeslots: Timeslot[];
  private paramsList: ParamsObj[];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  /**
   * API call to get available timeslots
   * @param date 
   */
  getTimeSlots(date: string) {
    this.paramsList = [{key: 'appdate', value: date}]
    this.api.get(Constants.TIMESLOTS_ENDPOINT, this.paramsList).subscribe(
      res => {
        this.timeslots = res;
        console.log(this.timeslots)
      },
      err => console.log(err)
    )
  }

  /**
   * Check for input change in datepicker
   * @param type 
   * @param event 
   */
  getDateFromPicker(type: string, event: MatDatepickerInputEvent<Date>) {
    this.getTimeSlots(this.formatDate(event.value))
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
