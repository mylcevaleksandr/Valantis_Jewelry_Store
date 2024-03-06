import {Component, OnInit} from '@angular/core';
import {ChangeSearchService} from "../../shared/services/change-search.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private searchChange: ChangeSearchService,) {
  }

  ngOnInit(): void {
    this.searchChange.setFalse();
  }
}
