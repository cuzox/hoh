import { appConfig } from './../../app.config';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { Base64ToBlobService as GetBlob } from 'app/_services';
import { DialogService } from './../../_services/dialog.service';
import { Subject, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from './../../_models/article';
import { ArticleService } from './../../_services/article.service';
import { ArticleImageService } from './../../_services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-crud',
  templateUrl: './blog-crud.component.html',
  styleUrls: ['./blog-crud.component.scss']
})
export class BlogCrudComponent implements OnInit, AfterViewInit {

  previewSrc: string = '';
  noImage: string = 'assets/images/no-image.svg'

  model: Article = new Article()

  @ViewChild('articlePhoto') articlePhoto
  @ViewChild('editor') editor

  constructor(
    private _sanitizer: DomSanitizer,
    private _article: ArticleService,
    private _dialog: DialogService,
    private _articleImg: ArticleImageService,
    private _router: Router
  ) { }

  ngOnInit() {

  }
  
  ngAfterViewInit(){
    setTimeout(() => {
      if (this.model.imageId) {
        // this._ss.show('realSpinner');
        this._articleImg.getById(this.model.imageId).subscribe(src => {
          this.updateImageDisplay(src)
          // this._ss.hide('realSpinner');
        })
      } else {
        this.updateImageDisplay()
        // this._ss.hide('realSpinner');
      }
    }, 200);
  }

  updateImageDisplay(existing = null) {
    if (this.articlePhoto.nativeElement.files.length !== 0) {
      this.previewSrc = <string>this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.articlePhoto.nativeElement.files[0]));
    } else {
      this.previewSrc = existing || this.previewSrc || this.noImage;
    }
  }

  save(draft: boolean = false) {
    // this._ss.show('realSpinner')
    this.processImages().subscribe(() =>{
      let image: File = this.articlePhoto.nativeElement.files[0]
      this.model.contents = this.editor.quill.getContents()
      this.model.status = draft ? "draft" : "published"

      this._article.create(this.model, image).subscribe(article =>{
        this._dialog.confirm("Would you like to create another article?").subscribe(anotherOne =>{
          if(anotherOne) this.emptyArticle()
          else this._router.navigate(['/admin/blogs'])
        })
        // this._ss.hideAll()
      })
    })
  }

  emptyArticle(){
    this.model = new Article
    this.articlePhoto.nativeElement.values = ""
    this.previewSrc = this.noImage;   
    this.editor.quill.setContents([])
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
        this._articleImg.create(form).pipe(map(res => {
          op.insert.image = `${appConfig.apiUrl}/images/articles/${res._id}`
          contentsChanged = true
          return res
        }))
      )
    })
    return !observables.length ? of({}) : forkJoin(observables).pipe(map( images =>{
      if(contentsChanged) this.editor.quill.setContents(contents)
      return images
    }))
  }
}
