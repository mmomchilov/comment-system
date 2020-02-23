import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gen-panel-view',
  templateUrl: './panelView.component.html',
  styleUrls: ['./panelView.component.scss']
})
export class PanelViewComponent implements OnInit {

  @Input() leftPanelSize = 3;
  rightPanelSize = 9;
  expanded: boolean = true;

  constructor() {

  }

  ngOnInit() {
    this.rightPanelSize = 12 - this.leftPanelSize;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
