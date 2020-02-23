import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TreeNodeManager } from '../treeNode/treeNodeManager';
import { TreeExplorerDeleteConfiguration } from './treeExplorerDeleteConfiguration';


@Component({
  selector: 'gen-tree-explorer',
  templateUrl: './treeExplorer.component.html',
  styleUrls: ['./treeExplorer.component.scss']
})
export class TreeExplorerComponent implements OnInit {
  @Input() nodes;
  @Input() nodeToDisplay;
  @Input() display;
  @Input() add = { enableAddButton: false, allowAddSubnodes: true, newNode: undefined };
  @Input() delete: TreeExplorerDeleteConfiguration = { allowDelete: true };
  @Input() hasChildNodes: boolean = false;
  @Input() customCSS;
  @Output() selectedNode = new EventEmitter();

  treeManager: TreeNodeManager;

  constructor() {
    this.treeManager = new TreeNodeManager();
  }

  ngOnInit() {
    if (this.nodeToDisplay) {
      // Select according input
      this.treeManager.nodeToDisplay = this.findNodeToDisplay(this.nodeToDisplay);
    } else {
      // Default selection (if no input for node to be selected)
      this.treeManager.nodeToDisplay = this.nodes.length > 0 ? this.nodes[0] : null;
    }

    this.handleSelectedNode(this.treeManager.nodeToDisplay);
  }

  private findNodeToDisplay(nodeDescription) {
    let resultNode;
    const uniqueCode = nodeDescription.code;
    if (uniqueCode) {
      resultNode = this.findNodeByCode(this.nodes, uniqueCode);
    } else {
     // const pathLst: string[] = this.nodeToDisplay.pathLst; just test!!!!!!!
      const pathLst: string[] = [];
      if (pathLst.length > 0) {
        let nodeToDisplay = this.nodes.find(el => el.code === pathLst[0]);
        let subNodes;
        for (let i = 1; i < pathLst.length; i++) {
          subNodes = nodeToDisplay.subNodes;
          nodeToDisplay.expanded = true;
          nodeToDisplay = subNodes.find(el => el.code === pathLst[i]);
        }
        resultNode = nodeToDisplay;
      }
    }
    return resultNode;
  }

  private findNodeByCode(nodes, code) {
    let dataGroupDetails;
    for (const root of nodes) {
      if (root.code === code) {
        dataGroupDetails = root;
        break;
      } else {
        const subNodes = root.subNodes || [];
        dataGroupDetails = this.findNodeByCode(subNodes, code);
      }
    }
    return dataGroupDetails;
  }

  addNewNode() {
    const newNode = this.getNewNode();
    this.nodes.push(newNode);
    this.treeManager.nodeToDisplay = newNode;
  }

  private getNewNode() {
    let newNode = this.treeManager.getNewNode();
    const newNodeConfiguration = this.add.newNode;
    if (newNodeConfiguration) {
      newNode = newNodeConfiguration(newNode, this.nodes);
    }
    return newNode;
  }

  enableAddingNewRoot() {
    return this.display.displayMode !== 'r' && this.add && this.add.enableAddButton;
  }

  handleSelectedNode(event) {
    this.selectedNode.emit(event);
  }

  update(event) {

  }
}
