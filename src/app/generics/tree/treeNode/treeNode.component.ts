import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TreeNodeManager } from './treeNodeManager';
import { TreeExplorerDeleteConfiguration } from '../treeExplorer/treeExplorerDeleteConfiguration';

@Component({
  selector: 'tree-node',
  templateUrl: './treeNode.component.html',
  styleUrls: ['./treeNode.component.scss']
})
export class TreeNodeComponent implements OnInit {
  @Input() displayMode = 'u';
  @Input() children;
  @Input() treeManager: TreeNodeManager = new TreeNodeManager();
  @Input() allowAddSubnodes: boolean = true;
  @Input() delete: TreeExplorerDeleteConfiguration;
  @Input() hasChildNodes: boolean = false;
  @Input() customCSS;
  @Output() selectedNode = new EventEmitter();
  @Output() askedChildDeletion = new EventEmitter();

  draggable = false;
  expanded: Boolean;
  constructor() { }

  ngOnInit() {
    if (!this.delete) {
      this.delete = { allowDelete: true };
    }

    if (this.allowAddSubnodes) {
      this.draggable = true;
    }
  }

  getNodeClass(child) {
    const selectedClass = this.nodeIsSelected(child) ? 'selected' : '';
    const pullLeftClass = (this.addIsAllowed() || this.deleteIsAllowed()) ? 'pull-left' : '';
    return `${selectedClass} ${pullLeftClass}`;
  }

  getCustomCSS(child) {
    return this.customCSS ? this.customCSS(child) : '';
  }

  getNodeDisplay(child) {
    const codeDisplay = child.codeDisplay;
    const display = codeDisplay ? codeDisplay : child.code;
    return display;
  }

  private nodeIsSelected(child) {
    return this.treeManager && this.treeManager.nodeToDisplay && this.treeManager.nodeToDisplay === child;
  }

  addIsAllowed(): boolean {
    return this.updateIsAllowed() && this.allowAddSubnodes;
  }

  deleteIsAllowed() {
    return this.updateIsAllowed() && this.delete.allowDelete;
  }

  updateIsAllowed(): boolean {
    return this.displayMode !== 'r';
  }

  handleAction(action, child, event) {
    if (action === 'add') {
      this.addNewNode(child);
    } else {
      if (this.delete && this.delete.confirmDelete) {
        new Promise((resolve, reject) => {
          this.delete.confirmDelete({ node: child, confirm: { 'resolve': resolve, 'reject': reject } });
        })
          .then(() => this.deleteNode(child))
          .catch(() => { });

      } else {
        this.deleteNode(child);
      }
    }
  }

  selectNode(node) {
    this.treeManager.nodeToDisplay = node;
    this.selectedNode.emit(node);
  }

  addNewNode(node) {
    const newNode = this.treeManager.getNewNode();
    node.subNodes = [...node.subNodes, newNode];
    node.expanded = true;
    this.treeManager.nodeToDisplay = newNode;
  }

  hasChevronDown(child) {
    return child.subNodes && child.subNodes.length !== 0 && child.expanded;
  }

  hasChevronRight(child) {
    return child.subNodes && child.subNodes.length !== 0 && !child.expanded;
  }

  hasNodeRightOffset() {
    return this.allowAddSubnodes || this.hasChildNodes;
  }

  empty(child) {
    return (child.subNodes && child.subNodes.length === 0) || !child.subNodes;
  }

  onDragStart(event, child) {
    if (!this.treeManager.getHasSelectedNode() && this.draggable) {
      this.treeManager.setSelectedNode(child);
      this.treeManager.setHasSelectedNode(true);
    }
  }

  onDragEnd(event, child) {
    if (this.treeManager.getHasDropped() && this.draggable) {
      this.treeManager.setHasDropped(false);
      this.children.splice(this.children.indexOf(child), 1);
    }
  }

  onDrop(event, node) {
    if (this.treeManager.getSelectedNode() !== node && this.draggable) {
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

