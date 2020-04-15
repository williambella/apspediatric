import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: Array<any>;
  @Input() onSelectMenu: Function;

  constructor() {
  }

  ngOnInit() {
    this.menus = [
      {
        title: 'group.list.title',
        routerLink: '/management/groups/'
      },
      {
        title: 'survey.title',
        routerLink: '/survey'
      },
      {
        title: 'appointment.title',
        routerLink: '/management/appointment/'
      }
    ];
  }

  selectMenu(event: Event) {
    event.preventDefault();
    this.onSelectMenu();
  }



}
