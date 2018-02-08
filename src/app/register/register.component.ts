import { Component, ViewEncapsulation } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, Validators } from '@angular/forms'
import { AlertService, UserService } from '../_services/index'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class RegisterComponent {
    model: any = {}
    loading = false

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
    ])

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) { }

    register() {
        this.loading = true
        this.userService.create(this.model).subscribe(
            data => {
                this.alertService.success('Registration successful')
                this.router.navigate(['/login'])
            },
            error => {
                this.alertService.error(error.message)
                this.loading = false
            }
        )
    }
}