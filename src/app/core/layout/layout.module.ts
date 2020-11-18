// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Layout imports
import { HeaderComponent } from '@layout/header/header.component';

// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
