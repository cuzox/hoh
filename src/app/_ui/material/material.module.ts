import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material'
import { MatButtonModule } from '@angular/material'
import { MatMenuModule } from '@angular/material'
import { MatTabsModule } from '@angular/material'
import { MatToolbarModule } from '@angular/material'
import { MatDialogModule } from '@angular/material'
import { MatDatepickerModule } from '@angular/material'
import { MatInputModule } from '@angular/material'

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule
  ],
  exports:[
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class MaterialModule { }
