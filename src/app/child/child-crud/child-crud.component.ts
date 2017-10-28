import { SelectItem } from 'primeng/primeng';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl } from '@angular/forms'
import 'rxjs/add/operator/switchMap';

import { Zone } from './../../_models/zone';
import { ZoneService } from './../../_services/zone.service';
import { Child } from '../../_models/child'
import { AlertService, ChildService } from '../../_services/index'
import { User } from './../../_models/user';
import { UserService } from './../../_services/user.service';

import { appConfig } from './../../app.config';
@Component({
  selector: 'child-crud',
  templateUrl: './child-crud.component.html',
  styleUrls: ['./child-crud.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildCrudComponent implements OnInit {
  model: Child
  loading = false
  title: string
  childParam: any
  theChild: any
  token: any

  zones: Zone[]

  staff: User[]

  genderTypes: SelectItem[] = [
    { value: 'male', label: "Boy" },
    { value: 'female', label: "Girl"}
  ];

  progressTypes: SelectItem[] = [
    { value: 'good', label: "Good" },
    { value: 'regular', label: "Regular"},
    { value: 'bad', label: "Bad"}
  ];

  es = {
    firstDayOfWeek: 1,
    dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    dayNamesMin: [ "D","L","M","X","J","V","S" ],
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    today: 'Hoy',
    clear: 'Borrar'
  }

  noImage = "/assets/images/no-image.png"

  fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]

  @Input() child: Child
  @ViewChild('childPhoto') childPhoto;
  @ViewChild('preview') preview;

  constructor(
    private _cs: ChildService,
    private _route: ActivatedRoute,
    private _zs: ZoneService,
    private _us: UserService
  ) { }


  ngOnInit() {
    // Init model
    this.model = {}
    this.model.school = {}
    this.model.misc = {}
    this.model.household = {}
    this.model.household.mother = {}
    this.model.household.father = {}
    this.model.sponsor = {}
    
    this.theChild = this.child || this.theChild
    this.childParam = this._route.paramMap.switchMap((params: ParamMap) =>
      this._cs.getById(params.get('id'))
    );
    this.token = JSON.parse(localStorage.getItem('currentUser')).token

    this._zs.getAll().subscribe(zones => {
      this.zones = zones
      zones.unshift({label:'Select Community',value:''})
    })

    this._us.getAll().subscribe(users => {
      this.staff = users.filter(user => {
        return appConfig.accessTypes.admin & user.role
      })

      this.staff.forEach((one: any) => {
        one.value = one._id
        if(one.firstName && one.lastName) one.label = `${one.firstName} ${one.lastName}`
      })

      this.staff.unshift(<any>{ label: 'Select Staff', value: '' })
    })
  }

  ngAfterViewInit() {
    this.updateImageDisplay()
  }

  create() {
    this.loading = true
    this._cs.create(this.model).subscribe(success, error)

    function success(success) {
      this.alertService.success('Child creation successful', true)
    }

    function error(error) {
      this.alertService.error(error)
      this.loading = false
    }
  }

  upload() {
    console.log(this.childPhoto.nativeElement.files)

  }

  updateImageDisplay() {
    if (this.preview.nativeElement.hasChildNodes()) this.preview.nativeElement.removeChild(this.preview.nativeElement.childNodes[0]);
    let image = document.createElement('img');
    if (this.childPhoto.nativeElement.files.length !== 0) {
      image.src = window.URL.createObjectURL(this.childPhoto.nativeElement.files[0]);
    } else {
      image.src = this.noImage;
    }
    this.preview.nativeElement.appendChild(image);
  }

  returnFileSize(number) {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + 'MB';
    }
  }

  validFileType(file) {
    this.fileTypes.forEach(type => {
      if (file.type === type) return true
    })
    return false
  }

  login(){
    console.log('This is model', this.model)
  }
}
