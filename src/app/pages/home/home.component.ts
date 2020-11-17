// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services imports
import { ApiService } from '@services/api.service';

// Constants imports
import { Constants } from '@configs/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.get(Constants.TIMESLOTS_ENDPOINT).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
