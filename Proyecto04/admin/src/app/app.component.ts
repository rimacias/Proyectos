import { Component, OnInit } from '@angular/core';
declare function init(): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./dashboard.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    init();
  }
  title = 'Admin';
}
