import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent implements OnInit {
  articles=[]
  article;
  paragraph = `The sponsored children in Capulin had a New Year’s Eve party. They were transferred from their community on a bus to a camp, where they attended Bible study, played on playground equipment, ate lots of food, made different crafts and received gifts.
  
  The teens in this group also benefitted from a talk on appropriate behavior between the sexes.
  
  One of the treats in the DR at holiday time is to include fruit with their meals. When food bags were handed out at the New Year’s Eve party, each child took home sufficient food and fruit for their family.`;
  constructor() {
    this.article = {
      id:'capulin-update',
      title:'Capulin Update ',
      display:'https://st.depositphotos.com/1301532/4775/i/950/depositphotos_47750345-stock-photo-happy-kids-with-painted-hands.jpg',
      body:this.paragraph
    }
    this.articles = [this.article];
   }

  ngOnInit() {
  }

}
