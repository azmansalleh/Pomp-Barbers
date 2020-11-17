// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services imports

// Constants imports
//import { Constants } from '@configs/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  displayedColumns: string[] = ['CaseTitle', 'CaseNumber', 'CustomerName', 'ReceivedOn'];
  caseListing: any[];
  isLoading: boolean;
  emptyData: boolean;

  ngOnInit(): void {
    console.log('Test')
  }

  

}
