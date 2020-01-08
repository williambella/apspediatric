import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/material/material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule, LocalStorageService } from 'angular-web-storage';
import { LanguagesService } from '@core/services/languages.service';
import { StorageService } from '@core/services/storage.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    LocalStorageService,
    LanguagesService,
    StorageService
  ]
})
export class SharedModule { }
