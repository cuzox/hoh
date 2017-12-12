import { Component, OnInit, ViewChild} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { SpinnerService } from 'angular-spinners'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  text: string
  previewSrc = 'assets/images/no-image.svg'
  fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]

  @ViewChild('photo') photo
  @ViewChild('textarea') textarea
  constructor(
    private _sanitizer: DomSanitizer,
    private _ss: SpinnerService,
  ) { }

  ngOnInit() {
  }
  updateImageDisplay() {
    this.previewSrc = <string>this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.photo.nativeElement.files[0]))
  }
  save() {
    let body = this.textarea.innerHTML
  }
}
