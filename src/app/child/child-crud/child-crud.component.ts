import { Component, OnInit, Input, ViewChild} from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl } from '@angular/forms'
import { AlertService, ChildService } from '../../_services/index'
import { Child } from '../../_models/child'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'child-crud',
  templateUrl: './child-crud.component.html',
  styleUrls: ['./child-crud.component.scss'],
})
export class ChildCrudComponent implements OnInit {
  model: Child
  loading = false
  title: string
  childParam: any
  theChild: any;
  token: any

  fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]

  @Input() child: Child
  @ViewChild('childPhoto') childPhoto;
  @ViewChild('preview') preview;

  constructor(
    private alertService: AlertService,
    private cs: ChildService,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit() {
    this.theChild = this.child || this.theChild
    this.childParam = this.route.paramMap.switchMap((params: ParamMap) => 
      this.cs.getById(params.get('id'))
    );
    this.token = JSON.parse(localStorage.getItem('currentUser')).token
  }
  
  create() {
      this.loading = true
      this.cs.create(this.model).subscribe( success, error )

      function success(success){
        this.alertService.success('Child creation successful', true)
      }

      function error(error){
        this.alertService.error(error)
        this.loading = false      
      }
  }

  upload(){
    console.log(this.childPhoto.nativeElement.files)

  }

  updateImageDisplay(){
    console.log(this.childPhoto.nativeElement.files)
    if (this.preview.nativeElement.hasChildNodes()) this.preview.nativeElement.removeChild(this.preview.nativeElement.childNodes[0]);
    let image = document.createElement('img');
    image.src = window.URL.createObjectURL(this.childPhoto.nativeElement.files[0]);
    this.preview.nativeElement.appendChild(image);
  }

  returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number > 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number > 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }

  validFileType(file) {
    this.fileTypes.forEach(type => {
      if (file.type === type) return true
    })
    return false
  }
}
