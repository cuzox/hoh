import { NgModule } from '@angular/core'
import { PrimeModule } from './prime/prime.module'
import { MaterialModule } from './material/material.module'

@NgModule({
  imports: [
    PrimeModule,
    MaterialModule
  ],
  exports: [
    PrimeModule,
    MaterialModule
  ],
})
export class UIModule { }
