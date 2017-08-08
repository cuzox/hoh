import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string, data: string[] = []): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmDialogComponent>;
        let config = new MdDialogConfig();

        config.data = data;

        dialogRef = this.dialog.open(ConfirmDialogComponent, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}