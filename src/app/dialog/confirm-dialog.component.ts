import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { Component, Inject, OnInit } from '@angular/core'


@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit  {

    title: string
    message: string
    reference: any = {}

    newZoneName: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>, @Inject(MD_DIALOG_DATA) private data: any) {
    }

    ngOnInit() {

    }

    confirmed(){
      if( this.reference.admin ){
        this.dialogRef.close(true)
      }else if( this.reference.zone ){
        this.dialogRef.close(this.newZoneName)
      }
    }

}