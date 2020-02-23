import { TreeNodeConfiguration } from '../treeNode/treeNodeConfiguration';
import { TreeNodeDisplayConfiguration } from './treeNodeDisplayConfiguration';
import { TreeExplorerDeleteConfiguration } from './treeExplorerDeleteConfiguration';
import { TreeExplorerAddConfiguration } from './treeExplorerAddConfiguration';

export class TreeExplorerConfiguration {
    nodes: TreeNodeConfiguration[];
    add?: TreeExplorerAddConfiguration;
    delete?: TreeExplorerDeleteConfiguration;
    hasChildNodes?: boolean;
    customCSS?;
    display: TreeNodeDisplayConfiguration;
}
