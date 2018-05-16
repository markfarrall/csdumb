import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  assignments: any[];
  favourites: any[];
  recent: any[];

  constructor(private app: AppService, private router: Router, private toaster: ToasterService) { }

  ngOnInit() {
    this.app.getFavourites()
      .then(response => {
        this.favourites = response;
      })
      .catch(error => {
        delete this.favourites;
        this.toaster.showToast(error);
      });

    this.app.getAssignments()
      .then(response => {
        this.assignments = response;
      })
      .catch(error => {
        delete this.assignments;
        this.toaster.showToast(error);
      });

    this.app.getRecentlyAccessed()
      .then(response => {
        this.recent = response;
      })
      .catch(error => {
        delete this.recent;
        this.toaster.showToast(error);
      });
  }

  openLink(node: any) {
    const url = this.app.getNodeLink(node);
    this.router.navigate(url);
  }

}
