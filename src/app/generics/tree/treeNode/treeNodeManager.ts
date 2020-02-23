import { Injectable } from '@angular/core';

@Injectable()
export class TreeNodeManager {
    selectedNode;
    nodeToDisplay;
    filteredText: string;
    hasDropped: boolean;
    hasSelectedNode: boolean;

    constructor() {
        this.selectedNode = '';
    }

    getSelectedNode(): boolean {
        return this.selectedNode;
    }

    getFilteredText() {
        return this.filteredText;
    }

    getHasDropped() {
        return this.hasDropped;
    }

    getHasSelectedNode() {
        return this.hasSelectedNode;
    }

    getNewNode() {
        return {
            code: 'New Group',
            subNodes: []
        };
    }

    setHasDropped(hasDropped) {
        this.hasDropped = hasDropped;
    }

    setHasSelectedNode(hasSelectedNode: boolean) {
        this.hasSelectedNode = hasSelectedNode;
    }

    setSelectedNode(node) {
        this.selectedNode = node;
    }

    setFilteredText(text) {
        this.filteredText = text;
    }
}
