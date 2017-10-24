import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/components/dropdown/dropdown'
import { TooltipModule } from 'primeng/components/tooltip/tooltip'
import { InputTextModule } from 'primeng/components/inputtext/inputtext'
import { ButtonModule } from 'primeng/components/button/button'
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton'
import { CalendarModule } from 'primeng/components/calendar/calendar'
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea'
import { SpinnerModule } from 'primeng/components/spinner/spinner'

@NgModule({
  imports: [
    DropdownModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    InputTextareaModule,
    SpinnerModule
  ],
  exports:[
    DropdownModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    InputTextareaModule,
    SpinnerModule
  ]
})
export class PrimeModule { }
