import { appConfig } from './../../app.config';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { SpinnerService } from 'angular-spinners'
import { Base64ToBlobService as GetBlob } from 'app/_services';
import { DialogService } from './../../_services/dialog.service';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { ArticleService } from './../../_services/article.service';
import { ArticleImageService } from './../../_services/image.service';
import { Router } from '@angular/router';
import 'rxjs/add/observable/forkJoin'

@Component({
  selector: 'app-blog-crud',
  templateUrl: './blog-crud.component.html',
  styleUrls: ['./blog-crud.component.scss']
})
export class BlogCrudComponent implements OnInit, AfterViewInit {
  previewSrc = 'assets/images/no-image.svg'

  title: string
  body: string
  status: string

  @ViewChild('photo') photo
  @ViewChild('editor') editor

  constructor(
    private _sanitizer: DomSanitizer,
    private _ss: SpinnerService,
    private _article: ArticleService,
    private _dialog: DialogService,
    private _articleImg: ArticleImageService,
    private _router: Router
  ) { }

  ngOnInit() {

  }
  
  ngAfterViewInit(){

  }

  updateImageDisplay() {
    this.previewSrc = <string>this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.photo.nativeElement.files[0]))
  }

  save(draft: boolean = false) {
    this._ss.show('realSpinner')
    this.processImages().subscribe(images =>{
      let article = {
        title: this.title, 
        body: this.body,
        contents: this.editor.quill.getContents(),
        status: status
      }
      this._article.create(article).subscribe(article =>{
        this._dialog.confirm("Create another blog?").subscribe(anotherOne =>{
          if(anotherOne){
            this.editor.quill.setContents([])
          } else {
            this._router.navigate(['/admin/blogs'])
          }
        })
        this._ss.hideAll()
      })
    })
  }

  
  processImages(){
    let contents = this.editor.quill.getContents()
    let contentsChanged = false
    let subject = new Subject<any>()
    let observables = []
    contents.ops.map(op =>{
      if(!op.insert || !op.insert.image) return op
      let splitted = op.insert.image.split(',')
      let imgBase64 = splitted[1]
      let contentType = splitted[0].match(/(image\/[a-z]*);/)[1]
      let imgBlob = GetBlob.b64toBlob(imgBase64, contentType, null)
      let imgFile = new File([imgBlob], 'irrelevant.' + contentType.split('/')[1], {type: contentType})
  
      let form = new FormData()
      form.append("articlePhoto", imgFile)

      observables.push(
        this._articleImg.create(form).map(res => {
          op.insert.image = `${appConfig.apiUrl}/images/articles/${res._id}`
          contentsChanged = true
          return res
        })
      )
    })
    return Observable.forkJoin(observables).map( images =>{
      if(contentsChanged) this.editor.quill.setContents(contents)
      return images
    })
  }
}
