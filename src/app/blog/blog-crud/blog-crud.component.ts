import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { SpinnerService } from 'angular-spinners'

@Component({
  selector: 'app-blog-crud',
  templateUrl: './blog-crud.component.html',
  styleUrls: ['./blog-crud.component.scss']
})
export class BlogCrudComponent implements OnInit, AfterViewInit {
  previewSrc = 'assets/images/no-image.svg'
  fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]

  body: string

  @ViewChild('photo') photo
  @ViewChild('editor') editor

  constructor(
    private _sanitizer: DomSanitizer,
    private _ss: SpinnerService,
  ) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    // this.editor.quill.getModule("toolbar").addHandler("image", this.imageHandler);
  }

  updateImageDisplay() {
    this.previewSrc = <string>this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.photo.nativeElement.files[0]))
  }

  save() {
    console.log(this.body)
  }

  imageHandler(){
    
  }
}
