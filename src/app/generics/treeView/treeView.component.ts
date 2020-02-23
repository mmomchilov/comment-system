import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreeManager } from './treeManager';

@Component({
  selector: 'tree-view',
  templateUrl: './treeView.component.html',
  styleUrls: ['./treeView.component.scss']
})
export class TreeViewComponent {
  @Input() children;
  @Output() askedChildDeletion = new EventEmitter();
  expanded: Boolean;
  constructor(private treeManager: TreeManager) { }

  handleAction(action, child) {
    if (action === 'add') {
      this.addNewNode(child);
    } else {
      this.deleteNode(child);
    }
  }

  addNewNode(node) {
    node.subNodes = [...node.subNodes, this.treeManager.getNewNode()];
    node.expanded = true;
  }

  hasChevronDown(child) {
    return child.subNodes.length !== 0 && child.expanded;
  }

  hasChevronRight(child) {
    return child.subNodes.length !== 0 && !child.expanded;
  }


  onDragStart(event, child) {
    if (!this.treeManager.getHasSelectedNode()) {
      this.treeManager.setSelectedNode(child);
      this.treeManager.setHasSelectedNode(true);
    }
  }

  onDragEnd(event, child) {
    if (this.treeManager.getHasDropped()) {
      this.treeManager.setHasDropped(false);
      this.children.splice(this.children.indexOf(child), 1);
    }
  }

  onDrop(event, node) {
    if (this.treeManager.getSelectedNode() !== node) {
      this.treeManager.setHasDropped(true);
      node.subNodes = [...node.subNodes, this.treeManager.getSelectedNode()];
    }
    this.treeManager.setHasSelectedNode(false);
  }

  deleteNode(node) {
    this.children.splice(this.children.indexOf(node), 1);
  }

  getFilteredText() {
    this.treeManager.getFilteredText();
  }

  toggle(child) {
    child.expanded = !child.expanded;
  }

}

