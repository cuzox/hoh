import { Observable } from 'rxjs/Rx'
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material'
import { Injectable } from '@angular/core'

// For admin-dialog
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component'

// For child-crud
import { ChildCrudComponent } from '../child/child-crud/child-crud.component'
import { Router, ActivatedRoute } from '@angular/router'
import { AlertService, ChildService } from '../_services/index'


@Injectable()
export class DialogService {
    
    constructor(
        private dialog: MdDialog,
        private alertService: AlertService,
        private cs: ChildService,
        private router: Router
    ) {}
    
    private dialogRef: MdDialogRef<ConfirmDialogComponent>
    private config = new MdDialogConfig()

    public confirm(title: string, message: string = "", data: string[] = []): Observable<boolean> {

        
        this.config.data = data

        this.dialogRef = this.dialog.open(ConfirmDialogComponent, this.config)
        this.dialogRef.componentInstance.title = title
        this.dialogRef.componentInstance.message = message

        this.dialogRef.componentInstance.reference.admin = true

        return this.dialogRef.afterClosed()
    }

    public newZone(title: string): Observable<string>{

        this.dialogRef = this.dialog.open(ConfirmDialogComponent)
        this.dialogRef.componentInstance.title = title

        this.dialogRef.componentInstance.reference.zone = true

        return this.dialogRef.afterClosed()

    }
}
