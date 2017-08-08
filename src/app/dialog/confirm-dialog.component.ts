import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit  {

    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {

    }

    ngOnInit() {
    }
  
}