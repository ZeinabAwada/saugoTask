import { Component, OnInit } from '@angular/core';
import * as c from 'xkcd-api';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proX';
  // global variables here
  images = [];
  start = true;
  // constructor
  constructor() { }
  // Fetching the table buttons upon page load
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('images'))) {
      this.images = JSON.parse(localStorage.getItem('images'));
    }
    this.Prefetch();
  }
  // functions below
    // set the comic picture to one selected by user
  public set (src) {
    const pic = document.getElementById('comic') as HTMLImageElement;
    pic.src = src;
  }
    // select the next random comic picture which already prefetched
  public Next() {
    let Jresponse;
    Jresponse = JSON.parse(localStorage.getItem('prefetch'));
    const image = { title : Jresponse.title, date: new Date().toLocaleString() , img : Jresponse.img };
    this.images.push(image);
    localStorage.setItem('images', JSON.stringify(this.images));
    const pic = document.getElementById('comic') as HTMLImageElement;
    pic.src = Jresponse.img;
    this.Prefetch();
  }
    // prefetch the next comic picture and save it into a json called prefetch
  public Prefetch() {
    c.random(function(error, response) {
      if (error) {
        console.error(error);
        alert('Please check your connection and try again');
      } else {
        console.log (response);
        localStorage.setItem('prefetch', JSON.stringify(response));
      }
    });

  }
}
