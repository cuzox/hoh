import { BlogCrudComponent } from './../blog-crud/blog-crud.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogService } from './../../_services/dialog.service';
import { ArticleImageService } from './../../_services/image.service';
import { Article } from './../../_models/article';
import { ArticleService } from './../../_services/article.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { AlertService } from 'app/_services';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogListComponent implements OnInit {
  articles: Article[] = []
  statusFilter: SelectItem[]
  selectedStatusFilter: string
  articlesAdditional: any = {}

  constructor(
    private _article: ArticleService,
    private _articleImage: ArticleImageService,
    private _alert: AlertService,
    private _dialog: DialogService,
    private _modal: BsModalService
  ) {
    this.statusFilter = [
      { value: "all", label: "All" },
      { value: "published", label: "Published" },
      { value: "unpublished", label: "Unpublished" }
    ]

    this.selectedStatusFilter = "all"
  }

  ngOnInit() {
    this._article.getAll().map(articles=>{
      console.log("ARTICLES -->", articles)
      return articles.map(article =>{
        /** 
         * Create status array to conform with primeng's input switch format
         * Also acquire correct article image src
         */
        let temp = {
          status: "published" ? true : false,
          src: article.imageId ? `/static/images/articles/${article.imageId}` : "/assets/images/no-image.svg"
        }
        this.articlesAdditional[article._id] = temp 
        /** Strip images and empty paragraphs */
        article.body = article.body.replace(/<img[^>]*>/gi,"").replace(/<p><br><\/p>/gi,"")
        return article
      })
    }).subscribe(articles => {
      this.articles = articles
    })
  }

  articleStatusChange(article){
    let status = this.articlesAdditional[article._id].status ? "published" : "unpublished"
    this._article.update(article._id, {status: status}).subscribe(()=>{
      this._alert[status == "published" ? "success" : "warning"](`Article ${status}!`)
    })
  }

  removeArticle(_id: string){
    this._dialog.confirm("Are you sure you want to delete this article?").subscribe(res =>{
      if(res) this._article.delete(_id).subscribe(()=>{
        this.ngOnInit()
        this._alert.success("Article deleted!")
      })
    })
  }

  goToArticle(article){
    this._modal.show(BlogCrudComponent, { animated: false, class: 'modal-lg' })
  }
}
