// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PortalModule} from '@angular/cdk/portal';

// Component Imports
import { HomeComponent } from '@pages/home/home.component';
import { PagesComponent } from '@pages/pages.component';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';

// Module imports
import { LayoutModule } from '@layout/layout.module';
import { PagesRoutingModule } from '@pages/pages-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    PagesRoutingModule,
    PortalModule
  ]
})
export class PagesModule { }
