import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

import { HomeComponent } from './home/home.component';
import { SearchPipe } from './search.pipe';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
	HomeComponent,
	SearchPipe,
	UserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
	BrowserAnimationsModule, // required animations module
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	ToastrModule.forRoot({
		timeOut: 3000,
		positionClass: 'toast-bottom-right',
		preventDuplicates: true,
	  }), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }