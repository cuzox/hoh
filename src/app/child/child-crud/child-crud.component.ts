import { Component, OnInit, Input, ViewChild, ViewEncapsulation, Optional, AfterViewInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl } from '@angular/forms'
import 'rxjs/add/operator/switchMap';

import { SpinnerService } from 'angular-spinners';

import { Zone } from './../../_models/zone';
import { ZoneService } from './../../_services/zone.service';
import { Child } from '../../_models/child'
import { ChildService } from '../../_services/index'

import { User } from './../../_models/user';
import { UserService } from './../../_services/user.service';
import { Image } from './../../_models/index';
import { ImageService } from './../../_services/image.service';
import { DialogService } from './../../_services/dialog.service';

import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { appConfig } from './../../app.config';

import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'child-crud',
  templateUrl: './child-crud.component.html',
  styleUrls: ['./child-crud.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildCrudComponent implements OnInit {
  model: Child
  title: string
  childParam: any
  token: any

  zones: Zone[]

  staff: User[]
  
  genderTypes: SelectItem[] = [
    { value: 'male', label: "Boy" },
    { value: 'female', label: "Girl"}
  ];

  progressTypes: SelectItem[] = [
    { value: 'good', label: "Good" },
    { value: 'regular', label: "Reg"},
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

  @ViewChild('childPhoto') childPhoto;
  @ViewChild('preview') preview;

  constructor(
    private _cs: ChildService,
    private _route: ActivatedRoute,
    private _zs: ZoneService,
    private _us: UserService,
    private _ss: SpinnerService,
    private _is: ImageService,
    private _router: Router,
    private _ds: DialogService,
    @Optional() public bsModalRef: BsModalRef
  ) { }


  ngOnInit() {
    this.model = this.emptyChild()
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

  emptyChild(){
    let emptyModel: Child = {}
    emptyModel.school = {}
    emptyModel.misc = {}
    emptyModel.household = {}
    emptyModel.household.mother = {}
    emptyModel.household.father = {}
    emptyModel.sponsor = {}

    return emptyModel
  }

  ngAfterViewInit() {
    console.log('model from after init', this.model)
    if (this.model.imageId) {
      this._is.getById(this.model.imageId).subscribe(src => {
        this.updateImageDisplay(src)
      })
    } else this.updateImageDisplay()
  }

  upload() {
    this._ss.show('realSpinner');
    console.log('This is the model', this.model)
    if (this.childPhoto.nativeElement.files.length > 0) {
      let image = this.childPhoto.nativeElement.files[0]
      let formData = new FormData();
      formData.append('childPhoto', image, image.name)
      this._is.create(formData).subscribe(res => {
        this.model.imageId = res._id
        childUpload.bind(this)()
        console.log('Image upload result', res)
      }, err =>{
        this._ss.hide('realSpinner');
        console.log('Error uploading image', err)
      })
    } else childUpload.bind(this)()

    function childUpload(){
      this._cs.create(this.model).subscribe( res => {
        this._ss.hide('realSpinner');
        this._ds.confirm('Child successfully added!', 'Would you like to add another one?').subscribe(succ => {
          if(succ){
            this.model = this.emptyChild()
          } else {
            this._router.navigate(['/admin/children'])
          }
        })
        console.log('Child upload result', res)
      }, err => {
        this._ss.hide('realSpinner');
        console.log('Error uploading child', err)
      })
    }

    function childUpdate() {
      this._cs.update(this.mode._id, this.model).subscribe(res => {
        this._ss.hide('realSpinner'); 

      }, err => {
        this._ss.hide('realSpinner');
        console.log('Error uploading child', err)
      })
    }
  }

  updateImageDisplay(existing = null) {
    if (this.preview.nativeElement.hasChildNodes()) this.preview.nativeElement.removeChild(this.preview.nativeElement.childNodes[0]);
    let image = document.createElement('img');
    if (this.childPhoto.nativeElement.files.length !== 0) {
      image.src = window.URL.createObjectURL(this.childPhoto.nativeElement.files[0]);
    } else {
      image.src = existing || this.noImage;
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
}
