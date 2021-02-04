import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isExpanded = false;

  constructor() {
  }

  ngOnInit() {
  }

  
  navInfo = [
    {
      name: "Inicio",
      icon:"home",
      url: "home"
    },
    {
      name: "Github",
      icon:"star",
      url: "github"
    }
  ];

}
