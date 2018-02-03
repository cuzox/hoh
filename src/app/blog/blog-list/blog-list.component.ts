import { ArticleImageService } from './../../_services/image.service';
import { Article } from './../../_models/article';
import { ArticleService } from './../../_services/article.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogListComponent implements OnInit {
  articles: Article[] = []

  constructor(
    private _article: ArticleService,
    private _articleImage: ArticleImageService
  ) { }

  ngOnInit() {
    this._article.getAll().map(articles=>{
      articles.forEach(article =>{
        /** Strip images and empty paragraphs */
        article.body = article.body.replace(/<img[^>]*>/gi,"").replace(/<p><br><\/p>/gi,"")
      })
      return articles
    }).subscribe(articles => {
      this.articles = articles
    })
  }

}
