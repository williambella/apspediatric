import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TreatmentResolver } from '@appointment/resolvers/treatment.resolver';
import { ScaleListComponent } from './component/scale-list/scale-list.component';
import { ScaleRoutingModule } from './scale-routing';
import { ScaleComponent } from './component/scale.component';
import { ScaleFormComponent } from './component/scale-form/scale-form.component';
import { ScaleResolver } from '@appointment/resolvers/scale.resolver';

@NgModule({
  imports: [
    CommonModule,
    ScaleRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ScaleComponent, ScaleFormComponent, ScaleListComponent],
  providers: [
    ScaleResolver
  ]
})
export class ScaleModule { }