// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PortalModule} from '@angular/cdk/portal';

// Component Imports
import { AdminComponent } from '@pages/admin/admin.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { PagesComponent } from '@pages/pages.component';


// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Module imports
import { LayoutModule } from '@layout/layout.module';
import { PagesRoutingModule } from '@pages/pages-routing.module';

// Constants imports
import { Constants } from '@configs/constants';

// AWS
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth:{
      mandatorySignIn:true,
      region: Constants .REGION,
      userPoolId: Constants.USER_POOL_ID,
      userPoolWebClientId: Constants.USER_POOL_WEB_CLIENT_ID,
      authenticationFlowType: Constants.AUTHENTICATION_FLOW_TYPE
    }
});

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSnackBarModule,
    LayoutModule,
    PagesRoutingModule,
    PortalModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
