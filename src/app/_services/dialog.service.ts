import { Observable } from 'rxjs/Rx'
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material'
import { Injectable } from '@angular/core'

// For admin-dialog
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component'

// For child-crud
import { ChildCrudComponent } from '../child/child-crud/child-crud.component'
import { Router, ActivatedRoute } from '@angular/router'
import { AlertService } from '../_services/alert.service'
import { ChildService } from '../_services/child.service'


@Injectable()
export class DialogService {
    
    constructor(
        private dialog: MatDialog,
        private alertService: AlertService,
        private cs: ChildService,
        private router: Router
    ) {}
    
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
    private config = new MatDialogConfig()

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
