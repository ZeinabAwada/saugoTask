import { Component, OnInit } from '@angular/core';
import {trigger , style , animate , transition, keyframes} from '@angular/animations';
import * as c from 'xkcd-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('changeState', [
    transition('state1 <=> state2', animate('1000ms', keyframes([
      style({transform: 'rotateY(60deg)', offset: 0}),
      style({transform: 'rotateY(-60deg)',  offset: 0.5}),
      style({transform: 'rotateY(0deg)', offset: 1.0})
    ]))),
  ])]
})
export class AppComponent implements OnInit {
  title = 'proX';
  // global variables here
  images = [];
  currentState = 'state1';
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
    this.currentState = (this.currentState === 'state1' ? 'state2' : 'state1');
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
