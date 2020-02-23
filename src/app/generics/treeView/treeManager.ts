import { Injectable } from '@angular/core';

@Injectable()
export class TreeManager {
    selectedNode;
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
            text: 'New Group',
            config: {
                title: 'New Group',
                isOpenedHeader: false,
                actions: { add: true, delete: true },
                columnSize: 4,
                minContentHeight: 'content-minimum-xmedium',
                content: {
                    fields: []
                }
            },
          database: 'message-conf-mapping',
          collectionId: 'message-conf-mapping',
            collection: {},
            expanded: false,
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
