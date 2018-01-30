import { Article } from './../../_models/article';
import { ArticleService } from './../../_services/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  articles: Article[] = []

  constructor(
    private _articleService: ArticleService
  ) { }

  ngOnInit() {
    this._articleService.getAll().subscribe(articles => {
      this.articles = articles
    })
  }

}
