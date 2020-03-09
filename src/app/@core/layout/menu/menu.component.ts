import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: Array<any>;

  constructor() {
  }

  ngOnInit() {
    this.menus = [
      {
        title: 'appointment.title',
        routerLink: '/appointment/groups/'
      },
      {
        title: 'survey.title',
        routerLink: '/survey'
      }
    ];
  }

}
