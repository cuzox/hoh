import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/components/dropdown/dropdown'
import { TooltipModule } from 'primeng/components/tooltip/tooltip'
import { InputTextModule } from 'primeng/components/inputtext/inputtext'
import { ButtonModule } from 'primeng/components/button/button'
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton'
import { CalendarModule } from 'primeng/components/calendar/calendar'
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea'
import { SpinnerModule } from 'primeng/components/spinner/spinner'
import { EditorModule } from 'primeng/components/editor/editor'
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { GrowlModule } from 'primeng/components/growl/growl';


@NgModule({
  imports: [
    DropdownModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    InputTextareaModule,
    SpinnerModule,
    EditorModule,
    InputSwitchModule,
    GrowlModule
  ],
  exports:[
    DropdownModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    InputTextareaModule,
    SpinnerModule,
    EditorModule,
    InputSwitchModule,
    GrowlModule
  ]
})
export class PrimeModule { }
