import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrimeModule } from './prime/prime.module'
import { MaterialModule } from './material/material.module'
import {EditorModule} from 'primeng/primeng'

@NgModule({
  imports: [
    PrimeModule,
    MaterialModule,
    EditorModule
  ],
  exports: [
    PrimeModule,
    MaterialModule,
    EditorModule
  ],
})
export class UIModule { }
