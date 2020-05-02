import { Component, OnInit, Input } from '@angular/core';
import { LogoService } from '@core/services/logo.service';
import { Logo } from '@core/models/Logo';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: Array<any>;
  @Input() onSelectMenu: Function;
  logo: Logo;

  constructor(private logoService: LogoService) { }

  ngOnInit() {
    this.logoService.findLogo().pipe(take(1))
      .subscribe(logo => this.logo = logo);

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
      },
      {
        title: 'patients.title',
        routerLink: '/patient/'
      },
      {
        title: 'procedure.title',
        routerLink: '/procedure/'
      },
      {
        title: 'treatment.title',
        routerLink: '/treatment/'
      },
      {
        title: 'scale.title',
        routerLink: '/scale/'
      }
    ];
  }

  selectMenu(event: Event) {
    event.preventDefault();
    this.onSelectMenu();
  }



}
